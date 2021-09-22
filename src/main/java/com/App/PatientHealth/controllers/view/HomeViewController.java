package com.App.PatientHealth.controllers.view;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomeViewController {
    
    @GetMapping({"/","/home"})
    public String home() {
        //if logged in - redirect to usertype home controller
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String role = auth.getAuthorities().stream().findFirst().get().getAuthority();
		System.out.println(role);
		switch (role) {
		case "ROLE_PATIENT": return "redirect:/patient/home";
		case "ROLE_DOCTOR":  return "redirect:/doctor/home";
		case "ROLE_ADMIN": return "redirect:/admin/home";
		}
        //else show regulat home page
        return "home/home";
    }
}
