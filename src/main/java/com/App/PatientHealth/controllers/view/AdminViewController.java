package com.App.PatientHealth.controllers.view;

import com.App.PatientHealth.requestObjects.AdminRegForm;
import com.App.PatientHealth.requestObjects.DoctorRegForm;
import com.App.PatientHealth.requestObjects.PatientRegForm;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("admin")
@Controller
public class AdminViewController {

    @GetMapping("/home")
    public String adminHome() {
        return "admin/admin-home";
    }

    @GetMapping("/register-users")
    public String registerUsers() {
        return "admin/admin-register-users";
    }

    @GetMapping("/search-users")
    public String searchUsers() {
        return "admin/admin-search-users";
    }

    @GetMapping("/doctor/manage-patients")
    public String manageDoctors() {
        return "admin/admin-doctor-add-patients";
    }

}
