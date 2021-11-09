package com.App.PatientHealth.repository;

import java.util.List;

import com.App.PatientHealth.domain.calendar.Appointment;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface AppointmentPagingRepository extends PagingAndSortingRepository<Appointment,Integer>{
    List<Appointment> findByWeekNumber(int weekNumber);
    List<Appointment> findByDoctorIdAndWeekNumber(int id, int weekNumber);
}
