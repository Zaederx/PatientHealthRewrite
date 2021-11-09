package com.App.PatientHealth.domain.calendar;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoField;
import java.util.List;
import java.util.stream.Collectors;

public class Week {
    Integer weekNumber;
    String mondayDateStr;
    Day monday;
    Day tuesday;
    Day wednesday;
    Day thursday;
    Day friday;
    Day saturday;
    Day sunday;

    public Week(int weekNumber, List<Appointment> appointments) {
        this.weekNumber = weekNumber;
        
        //get specific week by week number
        LocalDate week = LocalDate.now().with(ChronoField.ALIGNED_WEEK_OF_YEAR, weekNumber);
        
        //set date string
        this.mondayDateStr = week.toString();

        //Week Day dates
        LocalDate mondayDate = week.with(DayOfWeek.MONDAY);
        LocalDate tuesdayDate = mondayDate.plusDays(1);
        LocalDate wednesdayDate = mondayDate.plusDays(2);
        LocalDate thursdayDate = mondayDate.plusDays(3);
        LocalDate fridayDate = mondayDate.plusDays(4);
        LocalDate saturdayDate = mondayDate.plusDays(5);
        LocalDate sundayDate = mondayDate.plusDays(6);

        //set Days
        monday = new Day(mondayDate.getDayOfMonth(), DayOfWeek.MONDAY.getValue());
        tuesday = new Day(tuesdayDate.getDayOfMonth(), DayOfWeek.TUESDAY.getValue());
        wednesday = new Day(wednesdayDate.getDayOfMonth(), DayOfWeek.WEDNESDAY.getValue());
        thursday = new Day(thursdayDate.getDayOfMonth(),DayOfWeek.THURSDAY.getValue());
        friday = new Day(fridayDate.getDayOfMonth(), DayOfWeek.FRIDAY.getValue());
        saturday = new Day(saturdayDate.getDayOfMonth(), DayOfWeek.SATURDAY.getValue());
        sunday = new Day(sundayDate.getDayOfMonth(), DayOfWeek.SUNDAY.getValue());

        //set appointments to their respective Days
        appointmentsToDays(appointments);
    }

    //find date from weeknumber and dayNum


    //sort appointments into their respective days
    public void appointmentsToDays(List<Appointment> appointments) {
        List<Appointment> mondayList = appointments.stream().filter(a -> a.getDateTime().getDayOfWeek().getValue() == this.monday.getDayOfWeek()).collect(Collectors.toList());
        this.monday.setAppointments(mondayList);

        List<Appointment> tuesdayList = appointments.stream().filter(a -> a.getDateTime().getDayOfWeek().getValue() == this.tuesday.getDayOfWeek()).collect(Collectors.toList());
        this.tuesday.setAppointments(tuesdayList);

        List<Appointment> wednesdayList = appointments.stream().filter(a -> a.getDateTime().getDayOfWeek().getValue() == this.wednesday.getDayOfWeek()).collect(Collectors.toList());
        this.wednesday.setAppointments(wednesdayList);

        List<Appointment> thursdayList = appointments.stream().filter(a -> a.getDateTime().getDayOfWeek().getValue() == this.thursday.getDayOfWeek()).collect(Collectors.toList());
        this.thursday.setAppointments(thursdayList);

        List<Appointment> fridayList = appointments.stream().filter(a -> a.getDateTime().getDayOfWeek().getValue() == this.friday.getDayOfWeek()).collect(Collectors.toList());
        this.friday.setAppointments(fridayList);

        List<Appointment> saturdayList = appointments.stream().filter(a -> a.getDateTime().getDayOfWeek().getValue() == this.saturday.getDayOfWeek()).collect(Collectors.toList());
        this.saturday.setAppointments(saturdayList);

        List<Appointment> sundayList = appointments.stream().filter(a -> a.getDateTime().getDayOfWeek().getValue() == this.sunday.getDayOfWeek()).collect(Collectors.toList());
        this.sunday.setAppointments(sundayList);
    }


    public String getMondayDateStr() {
        return this.mondayDateStr;
    }

    public void setMondayDateStr(String mondayDateStr) {
        this.mondayDateStr = mondayDateStr;
    }



    public Day getMonday() {
        return this.monday;
    }

    public void setMonday(Day monday) {
        this.monday = monday;
    }

    public Day getTuesday() {
        return this.tuesday;
    }

    public void setTuesday(Day tuesday) {
        this.tuesday = tuesday;
    }

    public Day getWednesday() {
        return this.wednesday;
    }

    public void setWednesday(Day wednesday) {
        this.wednesday = wednesday;
    }

    public Day getThursday() {
        return this.thursday;
    }

    public void setThursday(Day thursday) {
        this.thursday = thursday;
    }

    public Day getFriday() {
        return this.friday;
    }

    public void setFriday(Day friday) {
        this.friday = friday;
    }

    public Day getSaturday() {
        return this.saturday;
    }

    public void setSaturday(Day saturday) {
        this.saturday = saturday;
    }

    public Day getSunday() {
        return this.sunday;
    }

    public void setSunday(Day sunday) {
        this.sunday = sunday;
    }

    public Integer getWeekNumber() {
        return weekNumber;
    }

    public void setWeekNumber(Integer weekNumber) {
        this.weekNumber = weekNumber;
    }

}
