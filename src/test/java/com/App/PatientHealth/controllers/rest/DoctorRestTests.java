package com.App.PatientHealth.controllers.rest;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.App.PatientHealth.domain.Doctor;
import com.App.PatientHealth.domain.Patient;
import com.App.PatientHealth.domain.User;
import com.App.PatientHealth.repository.DoctorPagingRepository;
import com.App.PatientHealth.repository.PatientPagingRepository;
import com.App.PatientHealth.repository.UserPagingRepository;
import com.App.PatientHealth.requestObjects.DoctorRegForm;
import com.App.PatientHealth.requestObjects.PrescriptionForm;
import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.lists.DoctorListResponse;
import com.App.PatientHealth.responseObject.lists.PatientListResponse;
import com.App.PatientHealth.services.UserDetailsServiceImpl;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.CoreMatchers.equalTo;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@ExtendWith(MockitoExtension.class)
public class DoctorRestTests {

    @Mock
    UserDetailsServiceImpl userServices;

    @Mock
    DoctorPagingRepository dRepo;

    @Mock
    PatientPagingRepository pRepo;

    @Mock
    UserPagingRepository uRepo;

    @InjectMocks
    DoctorRest restController;

    
    //create doctor
    @Test
    void createDoctorReturnsSuccessfulGivenValidDoctorForm() {
        //given
        String freeUsername = "username";
        String email = "email@email.com";
        String name = "Patient Name";
        String password = "PatientPassword";

        DoctorRegForm form = new DoctorRegForm();
        form.setUsername(freeUsername);
        form.setEmail(email);
        form.setName(name);
        form.setPassword(password);
        
        // User u = new User("name", "username", "password", "email@email.com","USER");
        
        given(userServices.getUserPaging())
        .willReturn(uRepo);
        given(uRepo.findByUsername(freeUsername))
        .willReturn(null);
        given(userServices.getDoctorPaging()).willReturn(dRepo);
        //when
        JsonResponse res = restController.createDoctor(form);
        
        //then
        verify(userServices.getUserPaging(), Mockito.times(1)).findByUsername(freeUsername);
        verify(userServices.getDoctorPaging(), Mockito.times(1)).save(any(Doctor.class));
        assertThat(res.getSuccess(), is(true));

    }

    @Test
    void createDoctorReturnsUnsuccessfulGivenInvalidDoctorForm() {
        //given
        String freeUsername = "username";
        String email = "email@email.com";
        String name = "Patient Name";
        String password = "PatientPassword";

        DoctorRegForm form = new DoctorRegForm();
        form.setUsername(freeUsername);
        form.setEmail(email);
        form.setName(name);
        form.setPassword(password);
        
        User user = new User("name", "username", "password", "email@email.com","USER");
        
        given(userServices.getUserPaging())
        .willReturn(uRepo);
        given(uRepo.findByUsername(freeUsername))
        .willReturn(user);
        given(userServices.getDoctorPaging()).willReturn(dRepo);
        //when
        JsonResponse res = restController.createDoctor(form);
        
        //then
        verify(userServices.getUserPaging(), Mockito.times(1)).findByUsername(freeUsername);
        verify(userServices.getDoctorPaging(), Mockito.times(0)).save(any(Doctor.class));
        assertThat(res.getSuccess(), is(false));
    }

    //doctorId
    @Test
    void getDoctorByIdReturnsSuccessfulGivenValidId() {
        //given
        String validDoctorId = "1";
        int invalidDoctorIdInt = Integer.parseInt(validDoctorId);
 
        
        Doctor doctor = new Doctor("name", "username", "password", "email@email.com","USER");
        
       Optional<Doctor> doctorOpt = Optional.of(doctor);
       
        given(userServices.getDoctorPaging()).willReturn(dRepo);
        given(dRepo.findById(invalidDoctorIdInt)).willReturn(doctorOpt);

        //when
        DoctorListResponse res = restController.getDoctorById(validDoctorId);
        
        //then
        verify(userServices.getDoctorPaging(), Mockito.times(1)).findById(invalidDoctorIdInt);
        assertThat(res.getSuccess(), is(true));
    }

    @Test
    void getDoctorByIdReturnsUnsuccessfullGivenInvalidId() {
        //given
        String invalidDoctorId = "2";
        int invalidDoctorIdInt = Integer.parseInt(invalidDoctorId);
        
        Optional<Doctor> doctorOptEmpty = Optional.empty();
       
        given(userServices.getDoctorPaging()).willReturn(dRepo);
        given(dRepo.findById(invalidDoctorIdInt)).willReturn(doctorOptEmpty);

        //when
        DoctorListResponse res = restController.getDoctorById(invalidDoctorId);
        
        //then
        verify(userServices.getDoctorPaging(), Mockito.times(1)).findById(invalidDoctorIdInt);
        assertThat(res.getSuccess(), is(false));
    }

    //get doctor's patients
    @Test
    void getDoctorsPatientsReturnsSuccessfulGivenValidId() {
         //given
         String validDoctorId = "1";
         int invalidDoctorIdInt = Integer.parseInt(validDoctorId);
  
         
        Doctor doctor = new Doctor("name", "username", "password", "email@email.com","USER");
         
        Optional<Doctor> doctorOpt = Optional.of(doctor);
        
         given(userServices.getDoctorPaging()).willReturn(dRepo);
         given(dRepo.findById(invalidDoctorIdInt)).willReturn(doctorOpt);
 
         //when
         PatientListResponse res = restController.getDoctorsPatients(validDoctorId);
         
         //then
         verify(userServices.getDoctorPaging(), Mockito.times(1)).findById(invalidDoctorIdInt);
         assertThat(res.getSuccess(), is(true));
    }

    @Test
    void getDoctorsPatientsReturnsUnsuccessfulGivenInvalidId() {
        //given
        String invalidDoctorId = "2";
        int invalidDoctorIdInt = Integer.parseInt(invalidDoctorId);
        
        Optional<Doctor> doctorOptEmpty = Optional.empty();
       
        given(userServices.getDoctorPaging()).willReturn(dRepo);
        given(dRepo.findById(invalidDoctorIdInt)).willReturn(doctorOptEmpty);

        //when
        PatientListResponse res = restController.getDoctorsPatients(invalidDoctorId);
        
        //then
        verify(userServices.getDoctorPaging(), Mockito.times(1)).findById(invalidDoctorIdInt);
        assertThat(res.getSuccess(), is(false));
    }

    //find doctor by name
    @Test
    void findDoctorByNameReturnsSuccesfulGivenValidDoctorName() {
        /* Given */
        String doctorName = "name2";
        //set page number and return up to 10 elements
        Pageable pageable = PageRequest.of(0, 10, Sort.by("name").ascending());

        //test patients
        Doctor d1 = new Doctor("name", "username", "password", "email@email.com", "specialisation");
        Doctor d2 = new Doctor("name", "username", "password", "email@email.com", "specialisation");
        Doctor d3 = new Doctor("name", "username", "password", "email@email.com", "specialisation");
        Doctor d4 = new Doctor("name", "username", "password", "email@email.com", "specialisation");

        //create temp patients for mocking
        Doctor[] doctors = {d1,d2,d3,d4};
        List<Doctor> doctorList = Arrays.asList(doctors);
        Page<Doctor> patientPage = new PageImpl<Doctor>(doctorList, pageable, 4);

        given(userServices.getDoctorPaging()).willReturn(dRepo);
        given(dRepo.findAllByNameContainingIgnoreCase(doctorName, pageable)).willReturn(patientPage);

        /* When */
        DoctorListResponse res = restController.findDoctorByName(doctorName, "1");

        /* Then */
        verify(userServices.getDoctorPaging(), Mockito.times(1)).findAllByNameContainingIgnoreCase(doctorName,pageable);
        assertThat(res.getSuccess(), is(true));
        assertThat(res.getTotalPages(), is(1));
        assertThat(res.getMessage(), is(""));
        assertThat(res.getDoctorJsons().size(), is(doctorList.size()));
    }


    @Test
    void findDoctorByNameReturnsUnsuccesfulGivenInvalidDoctorName() {
        /* Given */
        String doctorName = "name2";
        //set page number and return up to 10 elements
        Pageable pageable = PageRequest.of(0, 10, Sort.by("name").ascending());

        //create temp patients for mocking
        Doctor[] doctors = {};
        List<Doctor> emptyDoctorList = Arrays.asList(doctors);
        Page<Doctor> emptyDoctorPage = new PageImpl<Doctor>(emptyDoctorList, pageable, 4);

        given(userServices.getDoctorPaging()).willReturn(dRepo);
        given(dRepo.findAllByNameContainingIgnoreCase(doctorName, pageable)).willReturn(emptyDoctorPage);

        /* When */
        DoctorListResponse res = restController.findDoctorByName(doctorName, "1");

        /* Then */
        verify(userServices.getDoctorPaging(), Mockito.times(1)).findAllByNameContainingIgnoreCase(doctorName,pageable);
        assertThat(res.getSuccess(), is(false));
        assertThat(res.getTotalPages(), is(1));
        assertThat(res.getMessage(), is(not("")));
        assertThat(res.getDoctorJsons().size(), is(emptyDoctorList.size()));
    }


    //add patient to doctor
    @Test
    void addPatientToDoctorReturnsSuccessfulGivenValidIds() {
        //given
        Map<String, String> request = new HashMap<String, String>();
        request.put("docId", "1");
        request.put("pId","2");
        int docId = Integer.parseInt(request.get("docId"));
        int pId = Integer.parseInt(request.get("pId"));

        Doctor doctor = new Doctor("name", "username", "password", "email@email.com","USER");
        Optional<Doctor> doctorOpt = Optional.of(doctor);

        Patient p1 = new Patient("name", "username", "password", "email@email.com", "10/11/1995");
        p1.setId(pId);
        Optional<Patient> patientOpt = Optional.of(p1);

        given(userServices.getDoctorPaging()).willReturn(dRepo);
        given(dRepo.findById(docId)).willReturn(doctorOpt);

        given(userServices.getPatientPaging()).willReturn(pRepo);
        given(pRepo.findById(pId)).willReturn(patientOpt);

        //when
        JsonResponse res = restController.addPatientToDoctor(request);

        //then
        verify(userServices.getDoctorPaging(), Mockito.times(1)).findById(docId);
        verify(userServices.getPatientPaging(), Mockito.times(1)).findById(pId);
        assertThat(res.getSuccess(),is(true));
    }



    @Test
    void addPatientToDoctorReturnsUnsuccessfulGivenInvalidIPatientId() {
        //given
        Map<String, String> request = new HashMap<String, String>();
        request.put("docId", "1");
        request.put("pId","2");
        int validDocId = Integer.parseInt(request.get("docId"));
        int invalidPId = Integer.parseInt(request.get("pId"));

        Doctor doctor = new Doctor("name", "username", "password", "email@email.com","USER");
        Optional<Doctor> doctorOpt = Optional.of(doctor);
        

        Optional<Patient> patientOpt = Optional.empty();

        given(userServices.getDoctorPaging()).willReturn(dRepo);
        given(dRepo.findById(validDocId)).willReturn(doctorOpt);

        given(userServices.getPatientPaging()).willReturn(pRepo);
        given(pRepo.findById(invalidPId)).willReturn(patientOpt);

        //when
        JsonResponse res = restController.addPatientToDoctor(request);

        //then
        verify(userServices.getDoctorPaging(), Mockito.times(1)).findById(validDocId);
        verify(userServices.getPatientPaging(), Mockito.times(1)).findById(invalidPId);
        assertThat(res.getSuccess(),is(false));
    }

    @Test
    void addPatientToDoctorReturnsUnsuccessfulGivenInvalidIDoctorId() {
        //given
        Map<String, String> request = new HashMap<String, String>();
        request.put("docId", "1");
        request.put("pId","2");
        int invalidDocId = Integer.parseInt(request.get("docId"));
        int validPId = Integer.parseInt(request.get("pId"));


        Optional<Doctor> doctorOpt = Optional.empty();
        
        Patient p1 = new Patient("name", "username", "password", "email@email.com", "10/11/1995");
        Optional<Patient> patientOpt = Optional.of(p1);

        given(userServices.getDoctorPaging()).willReturn(dRepo);
        given(dRepo.findById(invalidDocId)).willReturn(doctorOpt);

        given(userServices.getPatientPaging()).willReturn(pRepo);
        given(pRepo.findById(validPId)).willReturn(patientOpt);

        //when
        JsonResponse res = restController.addPatientToDoctor(request);

        //then
        verify(userServices.getDoctorPaging(), Mockito.times(1)).findById(invalidDocId);
        verify(userServices.getPatientPaging(), Mockito.times(1)).findById(validPId);
        assertThat(res.getSuccess(),is(false));
    }

    //remove patient from doctor
    @Test
    void removePatientFromDoctorReturnsSuccessfulGivenValidPatientId() {
        //given
        Map<String, String> request = new HashMap<String, String>();
        // request.put("docId", "1");
        request.put("pId","2");
        // int invalidDocId = Integer.parseInt(request.get("docId"));
        int validPId = Integer.parseInt(request.get("pId"));


        
        Patient p1 = new Patient("name", "username", "password", "email@email.com", "10/11/1995");
        Optional<Patient> patientOpt = Optional.of(p1);

        // given(userServices.getDoctorPaging()).willReturn(dRepo);
        // given(dRepo.findById(invalidDocId)).willReturn(doctorOpt);

        given(userServices.getPatientPaging()).willReturn(pRepo);
        given(pRepo.findById(validPId)).willReturn(patientOpt);

        //when
        JsonResponse res = restController.removePatientFromDoctor(request);

        //then
        String empty = "";
        // verify(userServices.getDoctorPaging(), Mockito.times(1)).findById(invalidDocId);
        verify(userServices.getPatientPaging(), Mockito.times(1)).findById(validPId);
        assertThat(res.getSuccess(),is(true));
        assertThat(res.getMessage(),is(not(empty)));
    }

    @Test
    void removePatientFromDoctorReturnsUnsuccessfulGivenInvalidPatientId() {
        //given
        Map<String, String> request = new HashMap<String, String>();
        // request.put("docId", "1");
        request.put("pId","2");
        // int invalidDocId = Integer.parseInt(request.get("docId"));
        int invalidPId = Integer.parseInt(request.get("pId"));
        Optional<Patient> patientOpt = Optional.empty();


        given(userServices.getPatientPaging()).willReturn(pRepo);
        given(pRepo.findById(invalidPId)).willReturn(patientOpt);

        //when
        JsonResponse res = restController.removePatientFromDoctor(request);

        //then
        String empty = "";
        
        verify(userServices.getPatientPaging(), Mockito.times(1)).findById(invalidPId);
        assertThat(res.getSuccess(),is(false));
        assertThat(res.getMessage(),is(not(empty)));
    }

    //add prescription to patient
    @Test
    void addPrescriptionToPatientReturnsSuccessfulGivenValidPatientId() {
        //given
        int validPId = 1;
        Patient patient = new Patient("name", "username", "password", "email@email.com", "10/11/1995");
        Optional<Patient> patientOpt = Optional.of(patient);
        
        given(userServices.getPatientPaging()).willReturn(pRepo);
        given(pRepo.findById(validPId)).willReturn(patientOpt);
        PrescriptionForm form = new PrescriptionForm("Paracetamol", "Directions", validPId);
        
        //when
        JsonResponse res = restController.addPrescriptionToPatient(form);

        //then
        String empty = "";
        verify(userServices.getPatientPaging(), Mockito.times(1)).findById(validPId);
        verify(userServices.getPatientPaging(), Mockito.times(1)).save(patient);
        assertThat(res.getSuccess(),is(true));
        assertThat(res.getMessage(),is(not(empty)));
    }

    @Test
    void addPrescriptionToPatientReturnsUnsuccessfulGivenInvalidPatientId() {
        //given
        int invalidPId = 1;

        Optional<Patient> patientOpt = Optional.empty();
        
        given(userServices.getPatientPaging()).willReturn(pRepo);
        given(pRepo.findById(invalidPId)).willReturn(patientOpt);
        PrescriptionForm form = new PrescriptionForm("Paracetamol", "Directions", invalidPId);
        
        //when
        JsonResponse res = restController.addPrescriptionToPatient(form);

        //then
        String empty = "";
        verify(userServices.getPatientPaging(), Mockito.times(1)).findById(invalidPId);
        assertThat(res.getSuccess(),is(false));
        assertThat(res.getMessage(),is(not(empty)));
    }
}
