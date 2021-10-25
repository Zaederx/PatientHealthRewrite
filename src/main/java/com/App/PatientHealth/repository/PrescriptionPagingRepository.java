package com.App.PatientHealth.repository;

import java.util.List;

import com.App.PatientHealth.domain.Prescription;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface PrescriptionPagingRepository extends PagingAndSortingRepository<Prescription, Integer> {
    
}
