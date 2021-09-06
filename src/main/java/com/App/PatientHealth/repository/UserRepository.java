package com.App.PatientHealth.repository;

import com.App.PatientHealth.domain.User;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User,Integer>{
    User findByUsername(String username);
}
