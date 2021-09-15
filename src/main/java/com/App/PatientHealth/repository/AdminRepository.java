package com.App.PatientHealth.repository;

import java.util.List;

import com.App.PatientHealth.domain.Admin;

import org.springframework.data.repository.CrudRepository;

public interface AdminRepository extends CrudRepository<Admin,Integer>{
    List<Admin> findByName(String name);
}
