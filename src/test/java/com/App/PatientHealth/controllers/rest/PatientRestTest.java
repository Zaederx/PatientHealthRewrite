package com.App.PatientHealth.controllers.rest;

import com.App.PatientHealth.controllers.rest.PatientRest;
import com.App.PatientHealth.domain.Patient;
import com.App.PatientHealth.domain.User;
import com.App.PatientHealth.repository.PatientPagingRepository;
import com.App.PatientHealth.repository.UserPagingRepository;
import com.App.PatientHealth.requestObjects.PatientRegForm;
import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.lists.PatientListResponse;
import com.App.PatientHealth.services.UserDetailsServiceImpl;

import org.junit.jupiter.api.Test;
import org.hamcrest.Matchers;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.equalTo;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.PathVariable;

@ExtendWith(MockitoExtension.class)
public class PatientRestTest {
    @Mock
    UserDetailsServiceImpl userServices;

    @Mock
    PatientPagingRepository pRepo;

    @Mock
    UserPagingRepository uRepo;

    @InjectMocks
    PatientRest restController;

    

    User u = new User("name", "username", "password", "email@email.com","USER");


    // @BeforeEach
    // void setup() {
        
    // }

    @Test
    void testMocksAreWorking() {
        Patient patient = new Patient("name", "username", "password", "email@email.com", "10/11/1995");
        Optional<Patient> patientOpt = Optional.of(patient);

        given(userServices
        .getPatientPaging())
        .willReturn(pRepo);

        given(pRepo
        .findByUsername("username"))
        .willReturn(patientOpt);

        Optional<Patient> pTest = userServices.getPatientPaging().findByUsername("username");
        assertThat(pTest.isPresent(),is(true));
        assertThat(pTest.get().getUsername(), is("username"));
        assertThat(pTest.get(), is(patient));
    }

    @Test
    void createPatientIsNotSuccessfulGivenExistingUsername() {
        //given
        String takenUsername = "username";
        String email = "email@email.com";
        String name = "Patient Name";
        String password = "PatientPassword";

        PatientRegForm form = new PatientRegForm();
        form.setUsername(takenUsername);
        form.setEmail(email);
        form.setName(name);
        form.setPassword(password);

        given(userServices.getUserPaging())
        .willReturn(uRepo);
        given(uRepo.findByUsername(takenUsername))
        .willReturn(u);
        given(userServices.getPatientPaging()).willReturn(pRepo);

        JsonResponse res = restController.createPatient(form);

        verify(userServices.getUserPaging(), Mockito.times(1)).findByUsername(takenUsername);
        verify(userServices.getPatientPaging(), Mockito.times(0)).save(any(Patient.class));
        assertThat(res.getSuccess(), is(false));
    }

    @Test
    void createPatientIsSuccessfulWithCorrectFormInput() {
        //given
        String freeUsername = "anotherUsername";
        String email = "email@email.com";
        String name = "Patient Name";
        String password = "PatientPassword";

        PatientRegForm form = new PatientRegForm();
        form.setUsername(freeUsername);
        form.setEmail(email);
        form.setName(name);
        form.setPassword(password);
        

        given(userServices.getUserPaging())
        .willReturn(uRepo);
        given(uRepo.findByUsername(freeUsername))
        .willReturn(null);
        given(userServices.getPatientPaging()).willReturn(pRepo);

        JsonResponse res = restController.createPatient(form);

        //check that this method has been called once within restController
        verify(userServices.getUserPaging(), Mockito.times(1)).findByUsername(freeUsername);
        verify(userServices.getPatientPaging(), Mockito.times(1)).save(any(Patient.class));
        //chech that the response return with success = true
        assertThat(res.getSuccess(), is(true));
        assertThat(res.getMessage(), is("Successfully registered patient."));
    }

    @Test
    void getPatientByNameShouldReturnPatients() {

        /* Given */
        String patientName = "name2";
        //set page number and return up to 10 elements
        Pageable pageable = PageRequest.of(0, 10, Sort.by("name").ascending());

        //test patients
        Patient p1 = new Patient("name", "username", "password", "email@email.com", "10/11/1995");
        Patient p2 = new Patient("name2", "username2", "password", "email@email.com", "10/11/1995");
        Patient p3 = new Patient("name3", "username3", "password", "email@email.com", "10/11/1995");
        Patient p4 = new Patient("name4", "username4", "password", "email@email.com", "10/11/1995");

        //create temp patients for mocking
        Patient[] patients = {p1,p2,p3,p4};
        List<Patient> patientList = Arrays.asList(patients);
        Page<Patient> patientPage = new PageImpl<Patient>(patientList, pageable, 4);

        given(userServices.getPatientPaging()).willReturn(pRepo);
        given(pRepo.findAllByNameContainingIgnoreCase(patientName, pageable)).willReturn(patientPage);

        /* When */
        PatientListResponse res = restController.getPatientByName(patientName, "1");

        /* Then */
        verify(userServices.getPatientPaging(), Mockito.times(1)).findAllByNameContainingIgnoreCase(patientName,pageable);
        assertThat(res.getSuccess(), is(true));
        assertThat(res.getTotalPages(), is(1));
        assertThat(res.getMessage(), is(""));
        assertThat(res.getPatientJsons().size(), is(patientList.size()));
    }


    @Test
    void getPatientByIdShouldNotReturnPatients() {

        /* Given */
        String invalidId = "1";
        int invalidIdInt = Integer.parseInt(invalidId);
        Patient p1 = new Patient("name", "username", "password", "email@email.com", "10/11/1995");
        p1.setId(invalidIdInt);
        
        //create EMPTY optional patient for mocking
        Optional<Patient> patientOpt = Optional.empty();

        given(userServices.getPatientPaging()).willReturn(pRepo);
        given(pRepo.findById(invalidIdInt)).willReturn(patientOpt);

        /* When */
        PatientListResponse res = restController.getPatientById(invalidId);

        /* Then */
        verify(userServices.getPatientPaging(), Mockito.times(1)).findById(invalidIdInt);
        assertThat(res.getSuccess(), is(false));
        assertThat(res.getMessage(), is("No details available"));
        assertThat(res.getPatientJsons().size(), is(0));
    }

    @Test
    void getPatientByIdShouldReturnPatients() {

        /* Given */
        String validIdStr = "1";
        int validIdInt = Integer.parseInt(validIdStr);
        Patient p1 = new Patient("name", "username", "password", "email@email.com", "10/11/1995");
        p1.setId(validIdInt);

        //create optional patient for mocking
        Optional<Patient> patientOpt = Optional.of(p1);

        given(userServices.getPatientPaging()).willReturn(pRepo);
        given(pRepo.findById(validIdInt)).willReturn(patientOpt);

        /* When */
        PatientListResponse res = restController.getPatientById(validIdStr);

        /* Then */
        verify(userServices.getPatientPaging(), Mockito.times(1)).findById(validIdInt);
        assertThat(res.getSuccess(), is(true));
        assertThat(res.getMessage(), is(""));
        assertThat(res.getPatientJsons().size(), is(1));
    }

    @Test
    void findPatientByUsernameReturnsPatient() {
        /* Given */
        String validUsername = "username";
        Patient patient = new Patient("name", "username", "password", "email@email.com", "10/11/1995");;
        Optional<Patient> patientOpt = Optional.of(patient);

        given(userServices.getPatientPaging()).willReturn(pRepo);
        given(pRepo.findByUsername(validUsername)).willReturn(patientOpt);

        /* When */
        JsonResponse res = restController.findPatientByUsername(validUsername);
        
        /* Then */
        verify(userServices.getPatientPaging(), Mockito.times(1)).findByUsername(validUsername);
        assertThat(res.getSuccess(), is(true));
        assertThat(res.getMessage(), is("")); 
    }


    @Test
    void findPatientByUsernameReturnResponseWithErrorMessage() {
        /* Given */
        String invalidUsername = "username";
        Optional<Patient> patientOpt = Optional.empty();

        given(userServices.getPatientPaging()).willReturn(pRepo);
        given(pRepo.findByUsername(invalidUsername)).willReturn(patientOpt);

        /* When */
        JsonResponse res = restController.findPatientByUsername(invalidUsername);

        /* Then */
        assertThat(res.getSuccess(), is(false));
        assertThat(res.getMessage(), is("No patient found for username:" + invalidUsername)); 
    }


}
