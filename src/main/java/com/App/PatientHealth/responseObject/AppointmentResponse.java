package com.App.PatientHealth.responseObject;

import com.App.PatientHealth.domain.calendar.Appointment;
import com.App.PatientHealth.responseObject.domain.AppointmentJson;


public class AppointmentResponse extends JsonResponse {
    AppointmentJson appointment;


    public AppointmentResponse() {}

    public AppointmentResponse(Appointment appointment) {
        this.appointment = new AppointmentJson(appointment);
    }
    public AppointmentResponse(AppointmentJson appointmentJson) {
        this.appointment = appointmentJson;
    }

    public AppointmentJson getAppointment() {
        return this.appointment;
    }

    public void setAppointment(AppointmentJson appointmentJson) {
        this.appointment = appointmentJson;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = new AppointmentJson(appointment);
    }

}
