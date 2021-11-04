package com.App.PatientHealth.responseObject.domain;

import com.App.PatientHealth.domain.calendar.Day;
import com.App.PatientHealth.domain.calendar.Week;
import com.App.PatientHealth.responseObject.JsonResponse;

public class WeekResponse extends JsonResponse {
    WeekJson week;

    public WeekResponse() {}
    public WeekResponse(Week week) {
        this.week = new WeekJson(week);
    }

    public void setWeek(Week week) {
        this.week = new WeekJson(week);
    }

}


