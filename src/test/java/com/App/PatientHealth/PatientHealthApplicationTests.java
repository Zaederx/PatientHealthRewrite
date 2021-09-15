package com.App.PatientHealth;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
	void homePageLoads() throws Exception {
		mock.perform(get(baseUrl+"/")).andExpect(status().isOk());
	}

	@Test
	void loginPageLoads() throws Exception {
		mock.perform(get(baseUrl+"/login")).andExpect(status().isOk());
	}

	@Test
	void adminHomeRedirectsToLogin() throws Exception {
		mock.perform(get(baseUrl+"/admin/home")).andExpect(redirectedUrl(baseUrl+"/login"));
	}

	@Test
	void patientHomeRedirectsToLogin() throws Exception {
		mock.perform(get(baseUrl+"/patient/home")).andExpect(redirectedUrl(baseUrl+"/login"));
	}

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
