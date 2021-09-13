package com.App.PatientHealth.repository;


import com.App.PatientHealth.domain.Doctor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface DoctorPaging extends PagingAndSortingRepository<Doctor, Integer> {

    Page<Doctor> findAllByUsername(String username, Pageable pageable);
    Page<Doctor> findAllByName(String name, Pageable pageable);
}