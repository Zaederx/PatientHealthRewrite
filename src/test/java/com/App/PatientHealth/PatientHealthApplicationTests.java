package com.App.PatientHealth;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.test.web.servlet.setup.SharedHttpSessionConfigurer;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.aspectj.lang.annotation.Before;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.*;
// @ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
class PatientHealthApplicationTests {

	@Autowired
	private MockMvc mock;

	private String baseUrl = "https://localhost";

	@Autowired
	private WebApplicationContext context;

	


	public void setup() {
		mock = MockMvcBuilders
				.webAppContextSetup(context)
				.apply(springSecurity())
				.build();
	}

	@Test
	void contextLoads() {
	}

	@Test
	void expect_homePageLoads() throws Exception {
		mock.perform(get(baseUrl+"/")).andExpect(status().isOk());
	}

	@Test
	void expect_loginPageLoads() throws Exception {
		mock.perform(get(baseUrl+"/login")).andExpect(status().isOk());
	}

	@Test
	void expect_adminHomeRedirectsToLogin() throws Exception {
		mock.perform(get(baseUrl+"/admin/home")).andExpect(redirectedUrl(baseUrl+"/login"));
	}

	@Test
	void expect_patientHomeRedirectsToLogin() throws Exception {
		mock.perform(get(baseUrl+"/patient/home")).andExpect(redirectedUrl(baseUrl+"/login"));
	}

	@Test
	void expect_doctorHomeRedirectsToLogin() throws Exception {
		mock.perform(get(baseUrl+"/patient/home")).andExpect(redirectedUrl(baseUrl+"/login"));
	}

	@Test
	void expect_adminLogsInSuccessfully() throws Exception {
		mock.perform(post(baseUrl+"/authenticateUser").param("username", "a1").param("password", "password").with(csrf())).andExpect(redirectedUrl("/?loginSuccess"));
	}

	@Test
	void expect_patientLogsInSuccessfully() throws Exception {
		mock.perform(post(baseUrl+"/authenticateUser").param("username", "p1").param("password", "password").with(csrf())).andExpect(redirectedUrl("/?loginSuccess"));
	}

	@Test
	void expect_doctorLogsInSuccessfully() throws Exception {
		mock.perform(post(baseUrl+"/authenticateUser").param("username", "d1").param("password", "password").with(csrf())).andExpect(redirectedUrl("/?loginSuccess"));
	}

	//Admin Integration Tests
	@Test
	@WithMockUser(roles = "ADMIN")
	void expect_patientCreated() throws Exception {
		mock.perform(get(baseUrl+"/admin/register-users")).andExpect(status().isOk()).andExpect(view().name("admin/admin-register-users"));
		//register a patient
		mock.perform(post(baseUrl+"/rest/patient/create").contentType(MediaType.APPLICATION_JSON_VALUE).content("{\"name\":\"testingPatientCreated\", \"username\":\"pTestUsername\", \"email\":\"pTestEmail@email.com\", \"password\":\"password\"}").with(csrf())).andExpect(status().isOk());
	}
	
	// @Test
	// void expect_patientCreated() throws Exception {
	// 	//login in as admin
	// 	mock.perform(post(baseUrl+"/authenticateUser").param("username", "a1").param("password", "password").with(csrf())).andExpect(redirectedUrl("/?loginSuccess")).andDo( result ->
	// 	//got to register users page
	// 	mock.perform(get(baseUrl+"/admin/register-users")).andExpect(status().isOk()));
	// 	//register a patient
	// 	mock.perform(post(baseUrl+"/rest/patient/create").contentType(MediaType.APPLICATION_JSON_VALUE).content("{name:\"testingPatientCreated\", username:\"pTestUsername\", email: \"pTestEmail@email.com\" ,password:\"password\"}").with(csrf())).andExpect(status().isOk());
	// }

	//https://docs.spring.io/spring-security/site/docs/4.0.x/reference/htmlsingle/#running-as-a-user-in-spring-mvc-test-with-annotations
	// @Test
	// void adminHomeWhenAdminLoggedIn() throws Exception {
	// 	setup();
	// 	mock.perform(get(baseUrl+"/admin/home").with(user("a1").password("password").roles("ADMIN"))).andExpect(redirectedUrl(baseUrl+"/login"));
	// }

	// @Test
	// void patientHomeWhenPatientLoggedIn() throws Exception {
	// 	setup();
	// 	mock.perform(get(baseUrl+"/patient/home").with(user("p1").password("password").roles("PATIENT"))).andExpect(redirectedUrl(baseUrl+"/login"));
	// }



}
