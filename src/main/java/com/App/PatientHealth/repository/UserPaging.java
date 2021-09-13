package com.App.PatientHealth.repository;



import com.App.PatientHealth.domain.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserPaging extends PagingAndSortingRepository<User, Integer> {
    //IMPORTANT Using @Query for more control over DB query's https://www.petrikainulainen.net/programming/spring-framework/spring-data-jpa-tutorial-introduction-to-query-methods/  
    Page<User> findAllByUsername(String username, Pageable pageable);
    Page<User> findAllByName(String name, Pageable pageable);
}

