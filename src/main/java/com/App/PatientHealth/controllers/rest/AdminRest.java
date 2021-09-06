package com.App.PatientHealth.controllers.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.App.PatientHealth.domain.Admin;
import com.App.PatientHealth.javaJson.list.AdminResponse;
import com.App.PatientHealth.javaJson.single.AdminJson;
import com.App.PatientHealth.services.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequestMapping("rest/admin")
public class AdminRest {
    @Autowired
    UserDetailsServiceImpl userService;

    @GetMapping("/all")
    public AdminResponse getAdmin() {
        AdminResponse res = new AdminResponse();
        Iterable<Admin> admin = userService.getARepo().findAll();

        List<AdminJson> aJson = new ArrayList<AdminJson>();
        admin.forEach( a -> 
            aJson.add(new AdminJson(a))
        );
        res.setAdminJson(aJson);
        return res;
    }

    @GetMapping("{adminId}")
    public AdminResponse getAdminById(@RequestParam Integer adminId) {
        //create response object
        AdminResponse res = new AdminResponse();

        Optional<Admin> adminOpt = userService.getARepo().findById(adminId);


        List<AdminJson> aJsons = new ArrayList<AdminJson>();
        if (adminOpt.isPresent()) {
            aJsons.add(new AdminJson(adminOpt.get()));
        }
        res.setAdminJson(aJsons);
        return res;
    }
}
