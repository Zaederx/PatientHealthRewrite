package com.App.PatientHealth.controllers.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.App.PatientHealth.domain.Doctor;
import com.App.PatientHealth.javaJson.list.DoctorResponse;
import com.App.PatientHealth.javaJson.single.DoctorJson;
import com.App.PatientHealth.javaJson.single.PatientJson;
import com.App.PatientHealth.services.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * 
 */
@RequestMapping("rest/doctor")
@Controller
public class DoctorRest {
    @Autowired
    UserDetailsServiceImpl userService;

    @GetMapping("/doctor-jsons")
    public List<DoctorJson> getDoctJsons() {
        Iterable<Doctor> doctors = userService.getDocRepo().findAll();
        List<DoctorJson> dJson = new ArrayList<DoctorJson>();
        doctors.forEach( d -> dJson.add(new DoctorJson(d)));
        return dJson;
    }

    @GetMapping("{doctorId}")
    public DoctorResponse getDoctorById(@RequestParam Integer doctorId) {
        //create resonse object
        DoctorResponse res = new DoctorResponse();

        //find doctor by id
        Optional<Doctor> doctorOpt = userService.getDocRepo().findById(doctorId);

        //add doctor to response
        List<DoctorJson> docJsons = new ArrayList<DoctorJson>();
        if(doctorOpt.isPresent()) {
            docJsons.add(new DoctorJson(doctorOpt.get()));
            res.setDoctorJson(docJsons);
        }
        return res;
    }

    @GetMapping("{doctorId}/patients")
    public List<PatientJson> getPatientJsons(@RequestParam Integer doctorId) {
        //retrieve doctor
        Optional<Doctor> doctorOpt = userService.getDocRepo().findById(doctorId);
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
    
}
