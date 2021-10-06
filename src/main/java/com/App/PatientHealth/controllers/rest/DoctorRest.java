package com.App.PatientHealth.controllers.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.App.PatientHealth.domain.Doctor;
import com.App.PatientHealth.domain.Patient;
import com.App.PatientHealth.domain.User;
import com.App.PatientHealth.requestObjects.DoctorRegForm;
import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.DoctorJson;
import com.App.PatientHealth.responseObject.domain.PatientJson;
import com.App.PatientHealth.responseObject.lists.DoctorListResponse;
import com.App.PatientHealth.responseObject.lists.PatientListResponse;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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


    @GetMapping("/{doctorId}")
    public DoctorListResponse getDoctorById(@PathVariable String doctorId) {
        //create response object
        DoctorListResponse res = new DoctorListResponse();

        //find doctor by id
        int id = Integer.parseInt(doctorId);
        Optional<Doctor> doctorOpt = userServices.getDoctorPaging().findById(id);

        //add doctor to response
        List<DoctorJson> docJsons = new ArrayList<DoctorJson>();
        if(doctorOpt.isPresent()) {
            docJsons.add(new DoctorJson(doctorOpt.get()));
            res.setDoctorJsons(docJsons);
            res.setSuccess(true);
        }
        else {
            res.setSuccess(false);
            res.setMessage("No details available");
        }
        return res;
    }

    //read doctor's patient info
    @GetMapping("/get-patients/{doctorId}")
    public JsonResponse getDoctorsPatients(@PathVariable String doctorId) {
        //retrieve doctor
        Optional<Doctor> doctorOpt = userServices.getDoctorPaging().findById(Integer.parseInt(doctorId));
        Doctor doctor;
        PatientListResponse res = new PatientListResponse();
        List<PatientJson> pJson = new ArrayList<PatientJson>();
        //if present return doctor
        if(doctorOpt.isPresent()) {
            doctor = doctorOpt.get();
            //add patients
            doctor.getPatients().forEach( p -> 
                pJson.add(new PatientJson(p))
            );
            res.setPatientJsons(pJson);
            res.setSuccess(true);
        }
        else {
            res.setSuccess(false);
        }
        
        return res;
    }


    //get doctors - pagination method - by firstname
    @GetMapping("/get-doctor/name/{name}/{pageNum}")
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
   
    
    @PostMapping("/add-patient")
    public JsonResponse addPatientToDoctor(@RequestBody Map<String,String> request) {
        String doctorId = request.get("docId");
        String patientId = request.get("pId");
        //create new repsonse object
        JsonResponse res = new JsonResponse();

        //find doctorId
        Optional<Doctor> d = userServices.getDoctorPaging().findById(Integer.parseInt(doctorId));

        //find patient
        Optional<Patient> p = userServices.getPatientPaging().findById(Integer.parseInt(patientId));
        if (!p.isPresent()) {
            res.setMessage("No Patient found with id:" + patientId);
            res.setSuccess(true);
            return res;
        }
        //add patient to doctor list
        if (d.isPresent()) {
            d.get().getPatients().add(p.get());
            p.get().setDoctor(d.get());
            //save changes
            try {
                userServices.getDoctorPaging().save(d.get());
                userServices.getPatientPaging().save(p.get());
                res.setSuccess(true);
            }
            catch (Exception e) {
                res.setMessage("Patient may already be asssigned a Doctor.");
                res.setSuccess(false);
            }
            
        }
        else {
            res.setMessage("No Patient found with id:" + patientId);
            res.setSuccess(true);
            return res;
        }

        //return response
        return res;
    }

    

    @DeleteMapping("/remove-patient")
    public JsonResponse removePatientFromDoctor(@RequestBody Map<String, String> request) {
        String docId = request.get("docId");
        String pId = request.get("pId");
        logger.debug("pId:"+ pId+" docId:"+docId);
        JsonResponse res = new JsonResponse();
        Optional<Doctor> doctorOpt = userServices.getDoctorPaging().findById(Integer.parseInt(docId));

        int pidInt = Integer.parseInt(pId);
        if(doctorOpt.isPresent()) {
            //remove patient from doctors list
            logger.debug("patients before patient removal:"+ doctorOpt.get().getPatients() +"size:"+doctorOpt.get().getPatients().size());
            List<Patient> patients = doctorOpt.get().getPatients().stream().filter(p -> (p.getId() != pidInt)).collect(Collectors.toList());
            logger.debug("patients not removed from doctor:"+ patients +"size:"+patients.size());
            doctorOpt.get().setPatients(patients);
            try {
                //save changes
                userServices.getDoctorPaging().save(doctorOpt.get());
                res.setSuccess(true);
                res.setMessage("Removing patient successful.");
            }
            catch (Exception e) {
                res.setMessage("Removing patient unsuccessful.");
                logger.trace("Removing patient unsuccessful:",e.getMessage());
            }
            
        }
        else {
            res.setSuccess(false);
            res.setMessage("No doctor available with id:"+docId);
        }
        return res;
    }

}
