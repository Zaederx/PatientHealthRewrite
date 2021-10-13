package com.App.PatientHealth.controllers.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.App.PatientHealth.domain.Patient;
import com.App.PatientHealth.domain.User;
import com.App.PatientHealth.requestObjects.PatientRegForm;
import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.PatientJson;
import com.App.PatientHealth.responseObject.lists.PatientListResponse;
import com.App.PatientHealth.services.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("rest/patient")
@RestController
public class PatientRest {

    @Autowired
    UserDetailsServiceImpl userServices;
    

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE)
    public JsonResponse createPatient(@RequestBody PatientRegForm form) {
        //create response object
        JsonResponse res = new JsonResponse();
        //check if user with that username already exists
        //NOTE: validation is handled before this point of form submission. 
        //This is just additional double check for username
        User u = userServices
        .getUserPaging()
        .findByUsername(
            form.getUsername());

        //save user if no user exists with that username
        if (u == null) {
            Patient patient = new Patient(form);
            try {
                userServices.getPatientPaging().save(patient);
                res.setMessage("Successfully registered patient.");
                res.setSuccess(true);
            }
            catch (Error e) {
                res.setMessage("Error registering patient.");
                res.setSuccess(false);
            }
        }
        else {
            res.setMessage("User already exists with this username.");
            res.setSuccess(false);
        }
        //return response to client
        return res;
    }


    @GetMapping(value = "/get-patient/name/{name}/{pageNum}")
    public PatientListResponse getPatientByName(@PathVariable String name, @PathVariable String pageNum) {
        PatientListResponse res = new PatientListResponse();
        //initialise list of patientsJson
        List<PatientJson> pJson = new ArrayList<PatientJson>();

        //set page number and return up to 10 elements
        Pageable pageable = PageRequest.of(Integer.parseInt(pageNum)-1, 10, Sort.by("name").ascending());

        //Get iterable patients
        Page<Patient> patients = userServices.getPatientPaging().findAllByNameContainingIgnoreCase(name, pageable);

        if (patients.hasContent()) {
            //add JSON of each patient to pJson
            patients.getContent().forEach( p -> 
                pJson.add(new PatientJson(p))
            );
            res.setPatientJsons(pJson);
            res.setSuccess(true);
            res.setTotalPages(patients.getTotalPages());
        }
        
        //return json to front end 
        return res;
    }


    @GetMapping("/{patientId}")
    public PatientListResponse getPatientById(@PathVariable String patientId) {
        //create response object
        PatientListResponse res = new PatientListResponse();
        //find by id
        int id = Integer.parseInt(patientId);
        Optional<Patient> patientOpt = userServices.getPatientPaging().findById(id);
        
        //set patient json response list
        if (patientOpt.isPresent()) {
            Patient p = patientOpt.get();
            res.getPatientJsons().add(new PatientJson(p));
            res.setSuccess(true);
        }
        else {
            res.setSuccess(false);
            res.setMessage("No details available");
        }
        
        return res;
    }

    //read user by username
    @GetMapping("get-patient/username/{username}")
    public JsonResponse findPatientByUsername(@RequestParam String username) {
        //get patient from user services
        Optional<Patient> patientOpt = userServices.getPatientPaging().findByUsername(username);
        PatientListResponse res = new PatientListResponse();

        //set response object
        if (patientOpt.isPresent()) {
            res.getPatientJsons().add(new PatientJson(patientOpt.get()));
            res.setSuccess(true);
        } 
        else {
            res.setSuccess(false);
            res.setMessage("No patient found for username:" + username);
        }
        
        return res;
   }
}
