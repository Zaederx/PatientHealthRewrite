package com.App.PatientHealth.responseObject.domain;

import com.App.PatientHealth.domain.User;

public class MessageUser {
    int id;
    String name;
    String username;

    
    public MessageUser(User u) {
        this.id = u.getId();
        this.name = u.getName();
        this.username = u.getUsername();
    }


    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
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

}
