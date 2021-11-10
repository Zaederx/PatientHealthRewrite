package com.App.PatientHealth.responseObject.domain;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.domain.Message;
import com.App.PatientHealth.domain.User;

public class MessageJson {

    int id;

    String title;

    String body;

    MessageUser sender;

    List<MessageUser> recipients;

    public MessageJson(Message m) {
        this.id = m.getId();
        this.title = m.getTitle();
        this.body = m.getBody();
        this.sender = new MessageUser(m.getSender());
        this.recipients = toMessageUsers(m.getRecipients());
    }

    public List<MessageUser> toMessageUsers(List<User> users) {
        List<MessageUser> r = new ArrayList<MessageUser>();
        users.forEach( u -> {
           r.add(new MessageUser(u));
        });
        return r;
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

    public MessageUser getSender() {
        return this.sender;
    }

    public void setSender(MessageUser sender) {
        this.sender = sender;
    }

    public List<MessageUser> getRecipients() {
        return this.recipients;
    }

    public void setRecipients(List<MessageUser> recipients) {
        this.recipients = recipients;
    }

}
