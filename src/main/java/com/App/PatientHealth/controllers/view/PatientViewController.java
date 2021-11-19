package com.App.PatientHealth.controllers.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/patient")
public class PatientViewController {

    @GetMapping("/home")
    public String patientHome() {
        return "patient/patient-home";
    }

    @GetMapping("/view-prescriptions")
    public String viewPrescriptions() {
        return "patient/patient-prescriptions";
    }

    @GetMapping("/view-appointments")
    public String viewAppointments() {
        return "patient/patient-appointments";
    }

    @GetMapping("/view-medical-notes")
    public String viewMedicalNotes() {
        return "patient/patient-medical-notes";
    }

}
