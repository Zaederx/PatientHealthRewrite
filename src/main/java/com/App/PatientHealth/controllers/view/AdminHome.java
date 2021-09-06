package com.App.PatientHealth.controllers.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/admin")
@Controller
public class AdminHome {

    @GetMapping("/home")
    public String adminHome() {
        return "admin/home";
    }
}
