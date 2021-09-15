package com.App.PatientHealth.domain;

import javax.persistence.Entity;

import com.App.PatientHealth.requestObjects.AdminRegForm;

@Entity
public class Admin extends User {
    
    public Admin() {}



    public Admin(AdminRegForm a) {
        super(a.getName(),a.getUsername(),a.getPassword1(),a.getEmail(),"ADMIN");
    }
    // public Admin(AdminRegForm a) {
    //     super(a.getFirstname(),a.getMiddlename(),a.getLastname(),a.getUsername(),
    //     a.getPassword(),a.getEmail(),"ADMIN");
    // }


    public Admin(String name, String username,String password, String email) {
        super(name,username,password,email,"ADMIN");
    }
    /**
     * 
     * @param fname
     * @param lname
     * @param username
     * @param email
     */
    // public Admin(String fname, String mnames,String lname, String username,String password, String email) {
    //     super(fname,mnames,lname,username,password,email,"ADMIN");
    // }
}
