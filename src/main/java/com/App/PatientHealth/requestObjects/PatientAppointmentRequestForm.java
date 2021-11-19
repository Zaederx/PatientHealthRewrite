package com.App.PatientHealth.requestObjects;


import com.fasterxml.jackson.annotation.JsonProperty;


/**
 * Form object for receiving Appointment Request information.
 * @author Zachary Ishmael
 *
 */
public class PatientAppointmentRequestForm {
	
	private String appointmentType;//see AppointmentType.java Enum
	
	private String appointmentInfo;
	
   
	private Boolean morningSession;//true = morning, false equals 
	


	public PatientAppointmentRequestForm() {
		
	}

	/**
	 * @return the appointmentType
	 */
	public String getAppointmentType() {
		return appointmentType;
	}



	/**
	 * @param appointmentType the appointmentType to set
	 */
	public void setAppointmentType(String appointmentType) {
		this.appointmentType = appointmentType;
	}



	/**
	 * @return the session
	 */
	public Boolean getMorningSession() {
		return morningSession;
	}

	/**
	 * @param session the session to set
	 */
	public void setMorningSession(Boolean session) {
		this.morningSession = session;
	}

	/**
	 * @return the description
	 */
	public String getAppointmentInfo() {
		return appointmentInfo;
	}

	/**
	 * @param description the description to set
	 */
	public void setAppointmentInfo(String description) {
		this.appointmentInfo = description;
	}
	
	
}

