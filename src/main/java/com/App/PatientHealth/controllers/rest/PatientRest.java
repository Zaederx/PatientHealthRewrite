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
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
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
    
    public PatientRest(UserDetailsServiceImpl userServices) {
        this.userServices = userServices;
    }

    public PatientListResponse getPatient() {
        PatientListResponse res = new PatientListResponse();
        //initialise list of patientsJson
        List<PatientJson> pJson = new ArrayList<PatientJson>();

        //Get iterable patients
        Iterable<Patient> patients = userServices.getPatientPaging().findAll();

        //add JSON of each patient to pJson
        patients.forEach( p -> 
           pJson.add(new PatientJson(p))
        );

        res.setPatientJson(pJson);
        //return json to front end 
        return res;
    }

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE)
    public JsonResponse createPatient(@RequestBody PatientRegForm form) {
        //create response object
        JsonResponse res = new JsonResponse();
        //check is user with that username already exists
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
        //return response to client
        return res;
    }



    @GetMapping("{patientId}")
    public PatientListResponse getPatientById(@RequestParam Integer patientId) {
        PatientListResponse res = new PatientListResponse();
        Optional<Patient> patientOpt = userServices.getPatientPaging().findById(patientId);
        if (patientOpt.isPresent()) {
            Patient p = patientOpt.get();
            res.getPatientJson().add(new PatientJson(p));
        }
        
        return res;
    }

     /***********Patient - By Firsname Lastname *************** */
    
    //get patient - by firstname
    @GetMapping("get-patient/name/{name}/{pageNum}")
    public JsonResponse findPatientByFirstname(@RequestParam String name,@RequestParam Integer pageNum) {
         //set page number and return up to 10 elements
         Pageable page = PageRequest.of(pageNum, 10);
         //get list of users from that page
         Page<Patient> uList = userServices.getPatientPaging().findAllByName(name, page);
         //set response object with users
         PatientListResponse res = new PatientListResponse();
         uList.forEach( u -> 
             res.getPatientJson().add(new PatientJson(u))
         );
         res.setTotalPages(uList.getTotalPages());
         return res;
    }
    /************************** */


    //read user by username
    @GetMapping("get-patient/username/{username}")
    public JsonResponse findPatientByUsername(@RequestParam String username) {
        Patient u = userServices.getPatientPaging().findByUsername(username);
        PatientListResponse res = new PatientListResponse();
        res.getPatientJson().add(new PatientJson(u));
        return res;
   }
}
