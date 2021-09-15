package com.App.PatientHealth.repository;

import java.util.List;

import com.App.PatientHealth.domain.Doctor;

import org.springframework.data.repository.CrudRepository;

public interface DoctorRepository extends CrudRepository<Doctor,Integer>{
    
    List<Doctor> findByName(String name);
    
}
