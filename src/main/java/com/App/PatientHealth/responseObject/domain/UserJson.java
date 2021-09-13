package com.App.PatientHealth.responseObject.domain;

import com.App.PatientHealth.domain.User;

public class UserJson {
    Integer id;
    String name;
    String username;
    String email;

    public UserJson() {}
    public UserJson(User u) {
        this.id = u.getId();
        this.name = u.getName();
        this.username = u.getUsername();
        this.email = u.getEmail();
    }


    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    
}
