package com.App.PatientHealth.repository;



import com.App.PatientHealth.domain.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPagingRepository extends PagingAndSortingRepository<User, Integer> {

    User findByUsername(String username);
    User findByEmail(String email);
    
    Page<User> findAllByUsername(String username, Pageable pageable);
    Page<User> findAllByName(String name, Pageable pageable);
    Page<User> findAllByNameContainingIgnoreCase(String name, Pageable page);
    Page<User> findAllByUsernameIgnoreCase(String username, Pageable page);
}

