package com.App.PatientHealth.controllers.view;

import com.App.PatientHealth.requestObjects.UserLoginForm;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginViewController {

    @GetMapping("/login")
    public String login(Model model) {
        model.addAttribute("userLoginForm", new UserLoginForm());
        return "home/login";
    }
    
}
