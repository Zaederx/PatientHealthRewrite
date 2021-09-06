package com.App.PatientHealth.repository;

import java.util.List;

import com.App.PatientHealth.domain.Patient;

import org.springframework.data.repository.CrudRepository;

public interface PatientRespository extends CrudRepository<Patient,Integer>{
    List<Patient> findByFname(String fname);
    List<Patient> findByLname(String lname);
    
}
