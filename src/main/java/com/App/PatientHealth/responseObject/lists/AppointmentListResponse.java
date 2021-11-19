package com.App.PatientHealth.responseObject.lists;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.domain.calendar.Appointment;
import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.AppointmentJson;

public class AppointmentListResponse extends JsonResponse {
    List<AppointmentJson> appointments;

    public AppointmentListResponse() {}
    public AppointmentListResponse(List<Appointment> appointments) {
        this.appointments = toJson(appointments);
    }

    private List<AppointmentJson> toJson(List<Appointment> appointments) {
        List<AppointmentJson> res = new ArrayList<AppointmentJson>();

        appointments.forEach( a -> {
            res.add(new AppointmentJson(a));
        });
        return res;
    }

    //** Getters and Setters */
    public List<AppointmentJson> getAppointments() {
        return this.appointments;
    }

    public void setAppointments(List<AppointmentJson> appointments) {
        this.appointments = appointments;
    }

}
