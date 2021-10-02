package com.App.PatientHealth;

import com.App.PatientHealth.controllers.rest.PatientRest;
import com.App.PatientHealth.domain.Patient;
import com.App.PatientHealth.repository.PatientPagingRepository;
import com.App.PatientHealth.requestObjects.PatientRegForm;
import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.services.UserDetailsServiceImpl;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.hamcrest.CoreMatchers.is;
import java.util.ArrayList;
import java.util.List;

import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class PatientRestTest {
    @Mock
    UserDetailsServiceImpl userServices;

    @Mock
    PatientPagingRepository pRepo;

    
    PatientRegForm form = new PatientRegForm();

    @InjectMocks
    PatientRest restController;

    Patient p = new Patient("name", "username", "password", "email@email.com", "10/11/1995");

    @BeforeEach
    void setup() {
        given(userServices
        .getPatientPaging())
        .willReturn(pRepo);

        given(pRepo
        .findByUsername("username"))
        .willReturn(p);
        
        given(userServices.getPatientPaging().findByUsername("username")).willReturn(p);
    }
    @Test
    void testMocks() {
        Patient pTest = userServices.getPatientPaging().findByUsername("username");
        assertThat(pTest.getUsername(), is("username"));
    }

    @Test
    void createPatient() {
        
        form.setEmail("email@email.com");
        form.setName("Patient Name");
        form.setPassword("PatientPassword");
        form.setUsername("username");

        JsonResponse res = restController.createPatient(form);
        assertThat(res.getSuccess(), is(false));
    }
}
