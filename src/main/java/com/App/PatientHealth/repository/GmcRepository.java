package com.App.PatientHealth.repository;

import com.App.PatientHealth.domain.Gmc;

import org.springframework.data.repository.CrudRepository;

public interface GmcRepository extends CrudRepository<Gmc,Integer>{
    Gmc findByGmcNum(Double gmcNum);
}
