package com.App.PatientHealth.repository;


import java.util.List;

import com.App.PatientHealth.domain.Admin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AdminPagingRepository extends PagingAndSortingRepository<Admin, Integer> {

    List<Admin> findByName(String name);
    Page<Admin> findAllByUsername(String username, Pageable pageable);
    Page<Admin> findAllByName(String name, Pageable pageable);
}