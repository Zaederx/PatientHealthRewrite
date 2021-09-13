package com.App.PatientHealth.controllers.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PatientView {

    @GetMapping("/home")
    public String patientHome() {
        return "patient/patient-home";
    }

    @GetMapping("/view-prescriptions")
    public String viewPrescriptions() {
        //TODO - VIEW PRESCRIPTIONS
        return "doctor/home";
    }

}
