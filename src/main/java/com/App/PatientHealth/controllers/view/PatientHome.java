package com.App.PatientHealth.controllers.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PatientHome {

    @GetMapping("/home")
    public String patientHome() {
        return "patient/home";
    }
}
