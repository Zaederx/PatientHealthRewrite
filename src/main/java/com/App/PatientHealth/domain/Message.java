package com.App.PatientHealth.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    @Column
    String title;
    @Column
    String body;
    @ManyToOne
    User sender;
    @ManyToMany
    List<User> recipients;

    public Message() {}
    public Message(int id, String title, String body, User user, List<User> recipients) {
        this.id = id;this.title = title;
        this.body = body;
        this.sender = user;
        this.recipients = recipients;
    }


    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return this.body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public User getSender() {
        return this.sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public List<User> getRecipients() {
        return this.recipients;
    }

    public void setRecipients(List<User> recipients) {
        this.recipients = recipients;
    }


    
}
