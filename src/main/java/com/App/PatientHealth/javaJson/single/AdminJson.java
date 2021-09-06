package com.App.PatientHealth.javaJson.single;

import com.App.PatientHealth.domain.Admin;

public class AdminJson {
    Integer id;
    String fname;
    String lname;

    public AdminJson() {}
    public AdminJson(Admin a) {
        this.id = a.getId();
        this.fname = a.getFname();
        this.lname = a.getLname();
    }


    public String getFname() {
        return this.fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return this.lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

}
