package com.App.PatientHealth.controllers.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/doctor")
@Controller
public class DoctorViewController {

    @GetMapping("/home")
    public String doctorHome() {
        return "doctor/doctor-home";
    }

    @GetMapping("/view-patients")
    public String doctorViewPatients() {
        return "doctor/doctor-view-patient-details";
    }

    @GetMapping("/calendar")
    public String calendar() {
        return "doctor/doctor-calendar";
    }

    @GetMapping("/assistance")
    public String viewAssistance() {
        return "doctor/doctor-assistance";
    }

}
