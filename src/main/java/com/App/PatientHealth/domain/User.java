package com.App.PatientHealth.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected int id;
    @Column
    String name;
    @Column(unique = true)
    protected String username;
    @Column
    protected String password;
    @Column(unique = true)
    protected String email;
    @Column
    protected String role;
    @OneToMany(cascade = CascadeType.ALL)
    List<Message> messagesSent;
    @ManyToMany(cascade = CascadeType.ALL)
    List<Message> messagesReceived;

    @Transient
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User(){}

    public User(String name, String username, String password, String email, String role) {
        this.name = name;
        this.username = username;
        this.password = encoder.encode(password);
        this.email = email;
        this.role = role;
        this.messagesSent = new ArrayList<Message>();
        this.messagesReceived = new ArrayList<Message>();
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = encoder.encode(password);
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public void setRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public List<Message> getMessagesSent() {
        return this.messagesSent;
    }

    public void setMessagesSent(List<Message> messagesSent) {
        this.messagesSent = messagesSent;
    }

    public List<Message> getMessagesReceived() {
        return this.messagesReceived;
    }

    public void setMessagesReceived(List<Message> messagesReceived) {
        this.messagesReceived = messagesReceived;
    }

    public BCryptPasswordEncoder getEncoder() {
        return this.encoder;
    }

    public void setEncoder(BCryptPasswordEncoder encoder) {
        this.encoder = encoder;
    }



    @Override
    public String toString() {
        String userString = "name:"+this.name + "\n" + 
                            "username:"+this.username+ "\n" + 
                            "role:"+this.role;
        return userString;
    }

}
