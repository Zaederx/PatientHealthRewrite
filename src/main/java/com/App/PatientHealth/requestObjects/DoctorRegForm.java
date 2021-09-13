package com.App.PatientHealth.requestObjects;

public class DoctorRegForm extends UserRegForm {
    String specialisation;
    String gmcNum;
    public DoctorRegForm() {
        super();
    }

    public String getSpecialisation() {
        return specialisation;
    }

    public void setSpecialisation(String specialisation) {
        this.specialisation = specialisation;
    }

    public String getGmcNum() {
        return gmcNum;
    }

    public void setGmcNum(String gmcNum) {
        this.gmcNum = gmcNum;
    }
}
