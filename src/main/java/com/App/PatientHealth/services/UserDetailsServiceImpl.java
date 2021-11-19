package com.App.PatientHealth.services;

import java.util.ArrayList;

import com.App.PatientHealth.domain.PatientAppointmentRequest;
import com.App.PatientHealth.domain.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.App.PatientHealth.repository.AdminPagingRepository;
import com.App.PatientHealth.repository.AppointmentPagingRepository;
import com.App.PatientHealth.repository.AppointmentRequestPagingRepository;
import com.App.PatientHealth.repository.DoctorPagingRepository;
import com.App.PatientHealth.repository.GmcRepository;
import com.App.PatientHealth.repository.MedicalNotePagingRepository;
import com.App.PatientHealth.repository.PatientAppointmentRequestRepository;
import com.App.PatientHealth.repository.PatientPagingRepository;
import com.App.PatientHealth.repository.PrescriptionPagingRepository;
import com.App.PatientHealth.repository.UserPagingRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

	@Autowired
	UserPagingRepository userPaging;

	@Autowired
	AdminPagingRepository adminPaging;

	@Autowired
	DoctorPagingRepository doctorPaging;

	@Autowired
	PatientPagingRepository patientPaging;

	@Autowired
	GmcRepository gRepo;

	@Autowired
	PrescriptionPagingRepository prescriptionRepo;

	@Autowired
	MedicalNotePagingRepository medicalNoteRepo;

	@Autowired
	AppointmentRequestPagingRepository doctorAppointmentRequestRepo;

	@Autowired
	AppointmentPagingRepository appointmentRepo;

	@Autowired
	PatientAppointmentRequestRepository patientAppointmentRequestRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("\n***************** LoadByUsername Called**************");
		System.out.println(username);
		// String password = null;
		User u =  null;
		u = userPaging.findByUsername(username);
		
		boolean enabled = true;
		boolean accountNonExpired = true;
		boolean credentialsNonExpired = true;
		boolean accountNotLocked  = true;
		
		ArrayList<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		String role = u.getRole();
		System.out.println("******** ROLE ******: "+ role);
		System.out.println(role+" created and granted authority.");
		
		authorities.add(new SimpleGrantedAuthority("ROLE_"+role));
		
		System.out.println("********* Username *********: " +u.getUsername());
		
		/*Authentication Manager will then try to make sure 
		 * that details submitted match these details that are being returned*/
		return new org.springframework.security.core.userdetails.User(
				u.getUsername(),
				u.getPassword(),
				enabled, 
				accountNonExpired,
				credentialsNonExpired, 
				accountNotLocked,
				authorities
				);
    }

	public UserPagingRepository getUserPaging() {
		return userPaging;
	}

    public AdminPagingRepository getAdminPaging() {
		return adminPaging;
	}

	public DoctorPagingRepository getDoctorPaging() {
		return doctorPaging;
	}

	public PatientPagingRepository getPatientPaging() {
		return patientPaging;
	}

	public GmcRepository getGRepo() {
		return gRepo;
	}

	public PrescriptionPagingRepository getPrescriptionRepo() {
		return prescriptionRepo;
	}

	public MedicalNotePagingRepository getMedicalNoteRepo() {
		return medicalNoteRepo;
	}

	public AppointmentRequestPagingRepository getAppointmentRequestRepo() {
		return doctorAppointmentRequestRepo;
	}

	public AppointmentPagingRepository getAppointmentRepo() {
		return appointmentRepo;
	}

	public void setUserPaging(UserPagingRepository userPaging) {
		this.userPaging = userPaging;
	}
	public void setAdminPaging(AdminPagingRepository adminPaging) {
		this.adminPaging = adminPaging;
	}
	public void setDoctorPaging(DoctorPagingRepository doctorPaging) {
		this.doctorPaging = doctorPaging;
	}
	public void setPatientPaging(PatientPagingRepository patientPaging) {
		this.patientPaging = patientPaging;
	}
	public void setGRepo(GmcRepository gRepo) {
		this.gRepo = gRepo;
	}
	public void setPrescriptionRepo(PrescriptionPagingRepository prescriptionRepo) {
		this.prescriptionRepo = prescriptionRepo;
	}
	public void setMedicalNoteRepo(MedicalNotePagingRepository medicalNoteRepo) {
		this.medicalNoteRepo = medicalNoteRepo;
	}


	public AppointmentRequestPagingRepository getDoctorAppointmentRequestRepo() {
		return this.doctorAppointmentRequestRepo;
	}

	public void setDoctorAppointmentRequestRepo(AppointmentRequestPagingRepository doctorAppointmentRequestRepo) {
		this.doctorAppointmentRequestRepo = doctorAppointmentRequestRepo;
	}
	public void setAppointmentRepo(AppointmentPagingRepository appointmentRepo) {
		this.appointmentRepo = appointmentRepo;
	}

	public PatientAppointmentRequestRepository getPatientAppointmentRequestRepository() {
		return this.patientAppointmentRequestRepository;
	}

	public void setPatientAppointmentRequestRepository(PatientAppointmentRequestRepository patientAppointmentRequestRepository) {
		this.patientAppointmentRequestRepository = patientAppointmentRequestRepository;
	}


	
}
