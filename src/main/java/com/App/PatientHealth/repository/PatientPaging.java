package com.App.PatientHealth.repository;


import com.App.PatientHealth.domain.Patient;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PatientPaging extends PagingAndSortingRepository<Patient, Integer> {
    
    Page<Patient> findAllByUsername(String username, Pageable pageable);
    Page<Patient> findAllByName(String name, Pageable pageable);
}
