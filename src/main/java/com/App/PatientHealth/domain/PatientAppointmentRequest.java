package com.App.PatientHealth.domain;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.App.PatientHealth.requestObjects.PatientAppointmentRequestForm;



/**
 * Class used to create AppointmentRequest.
 * @author Zachary Ishmael
 *
 */
@Entity
public class PatientAppointmentRequest {

	enum Session {
		morning (true),
		afternoon(false);
		
		boolean s;
		Session (boolean s) {
			this.s = s;
		}
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	

    @Column
	private String appointmentType;

	/*What help the person needs in regard to the appointment.
	 * i.e. reasons they booked the appointment.
	 */
	@Column
	private String appointmentInfo;

	
	/* The patient who has made the request.
	 */
	@ManyToOne(cascade = CascadeType.ALL)
	private Patient patient;
	
	
	/* To hold 3 requested sessions to correspond with the dates.
	 * Sessions can be morning or afternoon.
	 * True = morning, False = afternoon.
	 */
	@Column
	private Boolean morningSession;
	

	@Column
	private Boolean answered = false;

	/* Times the surgery is available
	 */
	@Transient
	private String[] surgeryTimes = {"9:00","9:30","10:00","10:30", "11:00","11:30", "12:00", "12:30",
			"13:00","13:30", "14:00", "14:30", "15:00","15:30", "16:00", "16:30",
			"17:00", "17:30", "18:00"};
	

    public PatientAppointmentRequest() {}

	public PatientAppointmentRequest(Patient patient, String appointmentInfo, String appointmentType, Boolean session) {
		this.patient = patient;
		this.appointmentInfo = appointmentInfo;
		this.appointmentType = appointmentType;
		this.morningSession = session;
	}

	public PatientAppointmentRequest(PatientAppointmentRequestForm response) {
		this.appointmentInfo = response.getAppointmentInfo();
		this.appointmentType = response.getAppointmentType();
		this.morningSession = response.getMorningSession();
	}

	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}



	public Boolean isMorningSession() {
		return this.morningSession;
	}

	public Boolean getMorningSession() {
		return this.morningSession;
	}

	public void setMorningSession(Boolean morningSession) {
		this.morningSession = morningSession;
	}
	

	public Boolean isAnswered() {
		return this.answered;
	}


	/**
	 * @return the patient
	 */
	public Patient getPatient() {
		return patient;
	}

	/**
	 * @param patient the patient to set
	 */
	public void setPatient(Patient patient) {
		this.patient = patient;
	}



	/**
	 * @return the session
	 */
	public Boolean getSession() {
		return morningSession;
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
	 * @param session the session to set
	 */
	public void setSession(Boolean session) {
		this.morningSession = session;
	}

	/**
	 * @return the surgeryTimes
	 */
	public String[] getSurgeryTimes() {
		return surgeryTimes;
	}

	/**
	 * @param surgeryTimes the surgeryTimes to set
	 */
	public void setSurgeryTimes(String[] surgeryTimes) {
		this.surgeryTimes = surgeryTimes;
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

	/**
	 * @return answer - whether the requests has been answered or not
	 */
	public Boolean getAnswered() {
		return answered;
	}

	/**
	 * @param answered - whether the request has been answered or not
	 */
	public void setAnswered(Boolean answered) {
		this.answered = answered;
	}
	
}
