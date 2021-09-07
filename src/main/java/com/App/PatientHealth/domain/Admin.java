package com.App.PatientHealth.domain;

import javax.persistence.Entity;

@Entity
public class Admin extends User {
    
    public Admin() {}

    /**
     * 
     * @param fname
     * @param lname
     * @param username
     * @param email
     */
    public Admin(String fname, String mnames,String lname, String username,String password, String email) {
        super(fname,mnames,lname,username,password,email,"ADMIN");
    }
}
