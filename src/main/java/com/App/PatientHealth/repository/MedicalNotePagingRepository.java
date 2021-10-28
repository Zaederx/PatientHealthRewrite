package com.App.PatientHealth.repository;

import com.App.PatientHealth.domain.MedicalNote;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface MedicalNotePagingRepository extends PagingAndSortingRepository<MedicalNote, Integer> {
    
}
