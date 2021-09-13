package com.App.PatientHealth.repository;


import com.App.PatientHealth.domain.Admin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AdminPaging extends PagingAndSortingRepository<Admin, Integer> {

    Page<Admin> findAllByUsername(String username, Pageable pageable);
    Page<Admin> findAllByName(String name, Pageable pageable);
}