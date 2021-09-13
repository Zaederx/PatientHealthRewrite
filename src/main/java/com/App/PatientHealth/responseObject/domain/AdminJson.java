package com.App.PatientHealth.responseObject.domain;

import com.App.PatientHealth.domain.Admin;

public class AdminJson extends UserJson{

    public AdminJson() {}
    public AdminJson(Admin a) {
        super();
        this.id = a.getId();
        this.name = a.getName();
    }

}
