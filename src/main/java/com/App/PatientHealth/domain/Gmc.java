package com.App.PatientHealth.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Gmc {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;
    @Column
    private Double gmcNum;

    @Column
    private Boolean used = false;

    public Gmc(){}
    public Gmc(Integer id, Double gmcNum) {
        this.id = id;
        this.gmcNum = gmcNum;
    }


    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getGmcNum() {
        return this.gmcNum;
    }

    public void setGmcNum(Double gmcNum) {
        this.gmcNum = gmcNum;
    }

    public Boolean getUsed() {
        return used;
    }

    public void setUsed(Boolean used) {
        this.used = used;
    }
}
