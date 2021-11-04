package com.App.PatientHealth.responseObject.domain;

import com.App.PatientHealth.domain.calendar.Week;

/**
 * WeekJson
 */
public class WeekJson {

    DayJson monday;
    DayJson tuesday;
    DayJson wednesday;
    DayJson thursday;
    DayJson friday;
    DayJson saturday;
    DayJson sunday;

    public WeekJson() {}
    public WeekJson(Week week) {
        this.monday = new DayJson(week.getMonday());
        this.tuesday = new DayJson(week.getTuesday());
        this.wednesday = new DayJson(week.getWednesday());
        this.thursday = new DayJson(week.getThursday());
        this.friday = new DayJson(week.getFriday());
        this.saturday = new DayJson(week.getSaturday());
        this.sunday = new DayJson(week.getSunday());
    }


    public DayJson getMonday() {
        return this.monday;
    }

    public void setMonday(DayJson monday) {
        this.monday = monday;
    }

    public DayJson getTuesday() {
        return this.tuesday;
    }

    public void setTuesday(DayJson tuesday) {
        this.tuesday = tuesday;
    }

    public DayJson getWednesday() {
        return this.wednesday;
    }

    public void setWednesday(DayJson wednesday) {
        this.wednesday = wednesday;
    }

    public DayJson getThursday() {
        return this.thursday;
    }

    public void setThursday(DayJson thursday) {
        this.thursday = thursday;
    }

    public DayJson getFriday() {
        return this.friday;
    }

    public void setFriday(DayJson friday) {
        this.friday = friday;
    }

    public DayJson getSaturday() {
        return this.saturday;
    }

    public void setSaturday(DayJson saturday) {
        this.saturday = saturday;
    }

    public DayJson getSunday() {
        return this.sunday;
    }

    public void setSunday(DayJson sunday) {
        this.sunday = sunday;
    }

}