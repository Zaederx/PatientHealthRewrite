package com.App.PatientHealth.controllers.rest;

import java.time.LocalDateTime;
import java.time.temporal.WeekFields;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import com.App.PatientHealth.domain.Doctor;
import com.App.PatientHealth.domain.Patient;
import com.App.PatientHealth.domain.calendar.Appointment;
import com.App.PatientHealth.domain.calendar.Week;
import com.App.PatientHealth.requestObjects.AppointmentForm;
import com.App.PatientHealth.responseObject.AppointmentResponse;
import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.WeekResponse;
import com.App.PatientHealth.services.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/calendar")
public class CalendarRest {
    @Autowired
    UserDetailsServiceImpl userServices;

    //IMPORTANT - MAKE SURE THAT IT IS FROM ONE DOCTOR
    @GetMapping("/get-current-week/{docId}")
    public WeekResponse getThisWeeksAppointments(@PathVariable(name = "docId") String doctorId) {
        int docId = Integer.parseInt(doctorId);
        //get the current week's number (out of 52 weeks)
        WeekResponse res = new WeekResponse();
        LocalDateTime dateTime = LocalDateTime.now();
        WeekFields weekFields = WeekFields.of(Locale.getDefault()); 
        int weekNumber = dateTime.get(weekFields.weekOfWeekBasedYear());
       
        try {
            //find appointments for this week
            List<Appointment> appointments = userServices.getAppointmentRepo().findByDoctorIdAndWeekNumber(docId,weekNumber);
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


    @GetMapping("/get-week-appointments/{docId}/{weekNum}")
    public JsonResponse getDoctorsAppointments(@PathVariable String docId, @PathVariable String weekNum) {
        int id = Integer.parseInt(docId);
        int weekNumber = Integer.parseInt(weekNum);

        WeekResponse res = new WeekResponse();
        try {
            //find appointments for this week
            List<Appointment> appointments = userServices.getAppointmentRepo().findByDoctorIdAndWeekNumber(id,weekNumber);
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


    //SECTION ******** Patient Appointments CRUD *********

    @PostMapping("/create-appointment")
    public JsonResponse createAppointment(@RequestBody AppointmentForm form) {
        JsonResponse res = new JsonResponse();

        //create new appointment object from form
        Appointment appointment = new Appointment(form);

        try {
            Optional<Patient> patientOpt = userServices.getPatientPaging().findById(form.getPId());
            Optional<Doctor> doctorOpt = userServices.getDoctorPaging().findById(form.getDocId());

            if (patientOpt.isPresent() && doctorOpt.isPresent()) {
                appointment.setPatient(patientOpt.get());
                appointment.setDoctor(doctorOpt.get());
                //save appointment object
                userServices.getAppointmentRepo().save(appointment);
                res.setSuccess(true);
                res.setMessage("Appointment added successfully");
            }
            else {
                res.setSuccess(false);
                res.setMessage("Problem adding appointment to user. User not found by id provided.");
            }
            
        }
        catch (Exception e) {
            res.setSuccess(false);
            res.setMessage("Problem saving new appointment");
        }
        
        
        return res;
    }

    @GetMapping("/get-appointment/{appointmentId}")
    public AppointmentResponse getAppointmentById(@PathVariable String appointmentId) {
        AppointmentResponse res = new AppointmentResponse();
        int id = Integer.parseInt(appointmentId);

        // get appointment by id
        Optional<Appointment> appointmentOpt = userServices.getAppointmentRepo().findById(id);

        //prepare response
        if(appointmentOpt.isPresent()) {
            Appointment appointment = appointmentOpt.get();
            res.setAppointment(appointment);
            res.setSuccess(true);
        }
        else {
            res.setSuccess(false);
            res.setMessage("No appointment found");
        }

        return res;
    }


    /**
     * Edits the appointment details, but not doctor and patient
     * Create new appointment instead if doctor and patient are not the same.
     * @param form
     * @return
     */
    @PostMapping("/edit-appointment")
    public JsonResponse editAppointment(@RequestBody AppointmentForm form) {
        JsonResponse res = new JsonResponse();

        //find appointment
        Optional<Appointment> appointmentOpt = userServices.getAppointmentRepo().findById(form.getAId());

        //make changes if appointment is found
        if (appointmentOpt.isPresent()) {
            Appointment appointment = appointmentOpt.get();
            appointment.update(form);
            try {
                //save changes
                userServices.getAppointmentRepo().save(appointment);
                res.setSuccess(true);
                res.setMessage("Appointment added successfully");
                
            } catch (Exception e) {
                res.setSuccess(false);
                res.setMessage("Problem saving updates to appointment");
            }
        }
        else {
            res.setSuccess(false);
            res.setMessage("No existing appointment found");
        }

        

        
        return res;
    }

    @DeleteMapping("/delete-appointment/{appointmentId}")
    public JsonResponse deleteAppointment(@PathVariable String appointmentId) {
        JsonResponse res = new JsonResponse();
        int id = Integer.parseInt(appointmentId);
        Optional<Appointment> appointmentOpt = userServices.getAppointmentRepo().findById(id);

        if (appointmentOpt.isPresent()) {
            Appointment appointment = appointmentOpt.get();
            try {
                userServices.getAppointmentRepo().delete(appointment);
                res.setSuccess(true);
                res.setMessage("Appointment deleted successfully");
            } catch (Exception e) {
                res.setSuccess(false);
                res.setMessage("Problem deleting appointment");
            }
        }
        else {
            res.setSuccess(false);
            res.setMessage("No appointment found matching the id provided");
        }
        

        return res;
    }


}