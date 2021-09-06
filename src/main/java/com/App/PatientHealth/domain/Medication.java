package com.App.PatientHealth.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Medication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column
    String name;
    @OneToOne
    Label label;

    public Medication(){}
    public Medication(int id, String name, Label label) {
        this.id = id;
        this.name = name;
        this.label = label;
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

    public Label getLabel() {
        return this.label;
    }

    public void setLabel(Label label) {
        this.label = label;
    }

}
