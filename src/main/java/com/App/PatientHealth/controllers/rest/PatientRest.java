package com.App.PatientHealth.controllers.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.App.PatientHealth.domain.Patient;
import com.App.PatientHealth.javaJson.list.JsonResponse;
import com.App.PatientHealth.javaJson.list.PatientResponse;
import com.App.PatientHealth.javaJson.single.PatientJson;
import com.App.PatientHealth.services.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequestMapping("rest/patient")
@Controller
public class PatientRest {
    
    @Autowired
    UserDetailsServiceImpl userServices;

    public PatientResponse getPatient() {
        PatientResponse res = new PatientResponse();
        //initialise list of patientsJson
        List<PatientJson> pJson = new ArrayList<PatientJson>();

        //Get iterable patients
        Iterable<Patient> patients = userServices.getPRepo().findAll();

        //add JSON of each patient to pJson
        patients.forEach( p -> 
           pJson.add(new PatientJson(p))
        );

        res.setPatientJson(pJson);
        //return json to front end 
        return res;
    }

    @GetMapping("{patientId}")
    public PatientResponse getPatientById(@RequestParam Integer patientId) {
        PatientResponse res = new PatientResponse();
        Optional<Patient> patientOpt = userServices.getPRepo().findById(patientId);
        if (patientOpt.isPresent()) {
            Patient p = patientOpt.get();

            
            res.getPatientJson().add(new PatientJson(p));
        }
        
        return res;
    }
}
