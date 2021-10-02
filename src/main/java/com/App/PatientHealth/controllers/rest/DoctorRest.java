package com.App.PatientHealth.controllers.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.App.PatientHealth.domain.Doctor;
import com.App.PatientHealth.domain.User;
import com.App.PatientHealth.requestObjects.DoctorRegForm;
import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.DoctorJson;
import com.App.PatientHealth.responseObject.domain.PatientJson;
import com.App.PatientHealth.responseObject.lists.DoctorListResponse;
import com.App.PatientHealth.services.UserDetailsServiceImpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 
 */
@RequestMapping("rest/doctor")
@RestController
public class DoctorRest {
    @Autowired
    UserDetailsServiceImpl userServices;

    Logger logger = LoggerFactory.getLogger(DoctorRest.class);

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE)
    public JsonResponse createPatient(@RequestBody DoctorRegForm form) {
        //create response object
        JsonResponse res = new JsonResponse();
        //check is user with that username already exists
        User u = userServices.getUserPaging().findByUsername(form.getUsername());
        //save user if no user exists with that username
        if (u == null) {
            Doctor doctor = new Doctor(form);
            try {
                userServices.getDoctorPaging().save(doctor);
                res.setMessage("Successfully registered doctor.");
                res.setSuccess(true);
            }
            catch (Error e) {
                res.setMessage("Error registering doctor.");
                res.setSuccess(false);
            }
        }
        //return response to client
        return res;
    }


    @GetMapping("{doctorId}")
    public DoctorListResponse getDoctorById(@PathVariable String doctorId) {
        //create resonse object
        DoctorListResponse res = new DoctorListResponse();

        //find doctor by id
        Optional<Doctor> doctorOpt = userServices.getDoctorPaging().findById(Integer.parseInt(doctorId));

       

        //add doctor to response
        List<DoctorJson> docJsons = new ArrayList<DoctorJson>();
        if(doctorOpt.isPresent()) {
            docJsons.add(new DoctorJson(doctorOpt.get()));
            res.setDoctorJsons(docJsons);
        }
        return res;
    }

    //read doctor's patient info
    @GetMapping("get-patients/{doctorId}")
    public List<PatientJson> getDoctorsPatients(@PathVariable String doctorId) {
        //retrieve doctor
        Optional<Doctor> doctorOpt = userServices.getDoctorPaging().findById(Integer.parseInt(doctorId));
        Doctor doctor;
        List<PatientJson> pJson = new ArrayList<PatientJson>();
        //if present return doctor
        if(doctorOpt.isPresent()) {
            doctor = doctorOpt.get();
            //add patients
            doctor.getPatients().forEach( p -> 
                pJson.add(new PatientJson(p))
            );
        }
        return pJson;
    }


    //get doctors - pagination method - by firstname
    @GetMapping("get-doctor/name/{name}/{pageNum}")
    public JsonResponse findDoctorByFirstname(@PathVariable String name, @PathVariable String pageNum) {
        logger.trace("findDoctorByFirstname");
        logger.trace("pageNum:"+pageNum);
        logger.trace("name:"+name);
        //set page number and return up to 10 elements
        Pageable page = PageRequest.of(Integer.parseInt(pageNum)-1, 10, Sort.by("name").ascending());
        logger.trace("page.toString():"+page.toString());
        //get list of users from that page
        Page<Doctor> doctorPage = userServices.getDoctorPaging().findAllByNameContaining(name, page);
        //set response object with users
        DoctorListResponse res = new DoctorListResponse();
        logger.trace("Doctor List size:"+Integer.toString(doctorPage.getContent().size()));
        logger.trace("Page Content:"+doctorPage.getContent().toString());
        //IMPORTANT - METHOD DOES NOT RETURN ANY DOCTORS 
        try {
            doctorPage.getContent().forEach( u -> {
                logger.trace(u.toString());
                res.getDoctorJsons().add(new DoctorJson(u));
                res.setSuccess(true);
            });
         } catch (Exception e) {
             res.setSuccess(false);
         }
         
         res.setTotalPages(doctorPage.getTotalPages());
         return res;
    }
   
    
    /***************************/
    
}
