package com.App.PatientHealth;

import javax.transaction.Transactional;

import com.App.PatientHealth.domain.Admin;
import com.App.PatientHealth.domain.Doctor;
import com.App.PatientHealth.domain.Patient;
import com.App.PatientHealth.services.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PatientHealthApplication implements CommandLineRunner{
	@Autowired
	UserDetailsServiceImpl userServices;

	public static void main(String[] args) {
		SpringApplication.run(PatientHealthApplication.class, args);
	}

	@Override
	@Transactional
	public void run (String ... strings) throws Exception {
		testUsers();
	}

	public void testUsers() {
		Admin a1 = new Admin("a1", "a1", "password", "email1@email.com");

		Admin a2 = new Admin("a2", "a2", "password", "email2@email.com");

		Admin a3 = new Admin("a3", "a3", "password", "email3@email.com");

		userServices.getAdminPaging().save(a1);
		userServices.getAdminPaging().save(a2);
		userServices.getAdminPaging().save(a3);

		Patient p1 = new Patient("P1's Name", "p1", "password", "emailp1@email.com", "10/11/1995");

		Patient p2 = new Patient("P2's Name", "p2", "password", "emailp2@email.com", "10/11/1995");

		Patient p3 = new Patient("P3's Name", "p3", "password", "emailp3@email.com", "10/11/1995");

		Patient p4 = new Patient("P4's Name", "p4", "password", "emailp4@email.com", "10/11/1995");

		Patient p5 = new Patient("P5's Name", "p5", "password", "emailp5@email.com", "10/11/1995");

		userServices.getPatientPaging().save(p1);
		userServices.getPatientPaging().save(p2);
		userServices.getPatientPaging().save(p3);
		userServices.getPatientPaging().save(p4);
		userServices.getPatientPaging().save(p5);


		Doctor d1 = new Doctor("d1", "d1", "password", "emaild1@email.com", "pediatrics");

		Doctor d2 = new Doctor("d2", "d2", "password", "emaild2@email.com", "dental medicine");

		Doctor d3 = new Doctor("d3", "d3", "password", "emaild3@email.com", "renal medicine");

		Doctor d4 = new Doctor("d4", "d4", "password", "emaild4@email.com", "radiology");

		Doctor d5 = new Doctor("d5", "d5", "password", "emaild5@email.com", "optometry");


		userServices.getDoctorPaging().save(d1);
		userServices.getDoctorPaging().save(d2);
		userServices.getDoctorPaging().save(d3);
		userServices.getDoctorPaging().save(d4);
		userServices.getDoctorPaging().save(d5);
		

	}


}
