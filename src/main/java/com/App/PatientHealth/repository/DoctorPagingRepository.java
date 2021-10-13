package com.App.PatientHealth.repository;


import java.util.List;

import com.App.PatientHealth.domain.Doctor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorPagingRepository extends PagingAndSortingRepository<Doctor, Integer> {

    Page<Doctor> findByName(String name, Pageable pageable);
    Page<Doctor> findAllByUsername(String username, Pageable pageable);
    Page<Doctor> findAllByName(String name, Pageable pageable);
    Page<Doctor> findAllByNameContainingIgnoreCase(String name, Pageable pageable);
    
    
}