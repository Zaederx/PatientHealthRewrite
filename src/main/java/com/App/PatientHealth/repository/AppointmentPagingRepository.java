package com.App.PatientHealth.repository;

import com.App.PatientHealth.domain.AppointmentRequest;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface AppointmentPagingRepository extends PagingAndSortingRepository<AppointmentRequest,Integer> {
    
}
