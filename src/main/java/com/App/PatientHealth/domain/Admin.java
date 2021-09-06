package com.App.PatientHealth.domain;

import javax.persistence.Entity;

@Entity
public class Admin extends User {
    
    public Admin() {}

    public Admin(String fname, String lname, String username,String email) {
        super(fname,lname,username,email,"ADMIN");
    }
}
