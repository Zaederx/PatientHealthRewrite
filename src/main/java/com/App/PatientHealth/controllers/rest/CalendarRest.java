package com.App.PatientHealth.controllers.rest;

import java.time.LocalDateTime;
import java.time.temporal.WeekFields;
import java.util.List;
import java.util.Locale;

import com.App.PatientHealth.domain.calendar.Appointment;
import com.App.PatientHealth.domain.calendar.Week;
import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.WeekResponse;
import com.App.PatientHealth.services.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/calendar")
public class CalendarRest {
    @Autowired
    UserDetailsServiceImpl userServices;

    @GetMapping("/get-current-week")
    public WeekResponse getThisWeeksAppointments() {
        //get the current week's number (out of 52 weeks)
        WeekResponse res = new WeekResponse();
        LocalDateTime dateTime = LocalDateTime.now();
        WeekFields weekFields = WeekFields.of(Locale.getDefault()); 
        int weekNumber = dateTime.get(weekFields.weekOfWeekBasedYear());
        
        try {
            //find appointments for this week
            List<Appointment> appointments = userServices.getAppointmentRepo().findByWeekNumber(weekNumber);
            Week week = new Week(weekNumber, appointments);
            res.setWeek(week);
            res.setSuccess(true);
        }
        catch (Exception e) {
            res.setSuccess(false);
            res.setMessage("No appointments found");
        }
        return res; 
    }
}