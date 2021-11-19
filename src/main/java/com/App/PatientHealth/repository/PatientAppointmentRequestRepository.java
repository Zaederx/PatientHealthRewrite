package com.App.PatientHealth.repository;

import com.App.PatientHealth.domain.PatientAppointmentRequest;

import org.springframework.data.repository.CrudRepository;

public interface PatientAppointmentRequestRepository extends CrudRepository<PatientAppointmentRequest, Integer> {
    
}
