package com.App.PatientHealth.repository;


import com.App.PatientHealth.domain.AppointmentRequest;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface AppointmentRequestPagingRepository extends PagingAndSortingRepository<AppointmentRequest,Integer> {

}
