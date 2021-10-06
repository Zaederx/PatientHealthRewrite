package com.App.PatientHealth.repository;


import java.util.List;

import com.App.PatientHealth.domain.Patient;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PatientPagingRepository extends PagingAndSortingRepository<Patient, Integer> {
    
    Patient findByUsername(String username);
    List<Patient> findByName(String name);
    Page<Patient> findAllByUsername(String username, Pageable pageable);
    Page<Patient> findAllByUsernameContainingIgnoreCase(String username, Pageable pageable);
    Page<Patient> findAllByName(String name, Pageable pageable);
    Page<Patient> findAllByNameContainingIgnoreCase(String name, Pageable pageable);
}
