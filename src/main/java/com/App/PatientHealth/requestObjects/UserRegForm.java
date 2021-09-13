package com.App.PatientHealth.requestObjects;

public class UserRegForm {
    // String firstname;
    // String middlename;
    // String lastname;
    String name;
    String username;
    String email;
    String password1;
    String password2;

    public UserRegForm(){}


    public UserRegForm(String name, String username, String email, String password1, String password2) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password1 = password1;
        this.password2 = password2;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
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

    public String getPassword1() {
        return this.password1;
    }

    public void setPassword1(String password) {
        this.password1 = password;
    }
    
    public String getPassword2() {
        return password2;
    }

    public void setPassword2(String password2) {
        this.password2 = password2;
    }
}
