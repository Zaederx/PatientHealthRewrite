package com.App.PatientHealth.responseObject.domain;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.domain.Message;
import com.App.PatientHealth.domain.User;

public class UserJson {
    Integer id;
    String name;
    String username;
    String email;
    String role;
    List<MessageJson> messagesSent;
    List<MessageJson> messagesRecieved;

    public UserJson() {}
    public UserJson(User u) {
        this.id = u.getId();
        this.name = u.getName();
        this.username = u.getUsername();
        this.email = u.getEmail();
        this.role = u.getRole();
        this.messagesSent = toMessageJsons(u.getMessagesSent());
        this.messagesRecieved = toMessageJsons(u.getMessagesReceived());
    }

    public List<MessageJson> toMessageJsons(List<Message> messages) {
        List<MessageJson> messagesJsons = new ArrayList<MessageJson>();
        if (messages != null && messages.size() > 0) {
            messages.forEach(m -> {
                messagesJsons.add(new MessageJson(m));
            });
        }
        return messagesJsons;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
    

    public List<MessageJson> getMessagesSent() {
        return this.messagesSent;
    }

    public void setMessagesSent(List<MessageJson> messagesSent) {
        this.messagesSent = messagesSent;
    }

    public List<MessageJson> getMessagesRecieved() {
        return this.messagesRecieved;
    }

    public void setMessagesRecieved(List<MessageJson> messagesRecieved) {
        this.messagesRecieved = messagesRecieved;
    }

    

}
