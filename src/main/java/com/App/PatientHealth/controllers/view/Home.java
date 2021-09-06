package com.App.PatientHealth.controllers.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class Home {
    
    @GetMapping({"/","/home"})
    public String home() {
        return "home";
    }
}
