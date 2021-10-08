package com.App.PatientHealth.controllers.rest;

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
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.CoreMatchers.equalTo;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.App.PatientHealth.domain.Admin;
import com.App.PatientHealth.domain.User;
import com.App.PatientHealth.repository.AdminPagingRepository;
import com.App.PatientHealth.repository.UserPagingRepository;
import com.App.PatientHealth.requestObjects.AdminRegForm;
import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.lists.AdminListResponse;
import com.App.PatientHealth.responseObject.lists.PatientListResponse;
import com.App.PatientHealth.services.UserDetailsServiceImpl;

import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@ExtendWith(MockitoExtension.class)
public class AdminRestTests {

    @Mock
    UserDetailsServiceImpl userServices;

    @Mock
    UserPagingRepository uRepo;

    @Mock
    AdminPagingRepository aRepo;

    @InjectMocks
    AdminRest restController;


    @Test
    void createAdminReturnsSuccessResponse() {
        //given
        AdminRegForm form = new AdminRegForm();
        String freeUsername = "username";
        String email = "email@email.com";
        String name = "Patient Name";
        String password = "PatientPassword";
        form.setUsername(freeUsername);
        form.setEmail(email);
        form.setName(name);
        form.setPassword(password);

        given(userServices.getUserPaging()).willReturn(uRepo);
        given(uRepo.findByUsername(freeUsername)).willReturn(null);
        given(userServices.getAdminPaging()).willReturn(aRepo);


        //when
        JsonResponse res = restController.createAdmin(form);

        //then
        verify(userServices.getUserPaging(), Mockito.times(1)).findByUsername(freeUsername);
        verify(userServices.getAdminPaging(), Mockito.times(1)).save(any(Admin.class));
        assertThat(res.getSuccess(), is(true));
        assertThat(res.getMessage(), is("Successfully registered admin."));
    }

    @Test
    void createAdminReturnsUnsuccessfulResponse() {
        //given
        AdminRegForm form = new AdminRegForm();
        String takenUsername = "username";
        String email = "email@email.com";
        String name = "Patient Name";
        String password = "PatientPassword";
        form.setUsername(takenUsername);
        form.setEmail(email);
        form.setName(name);
        form.setPassword(password);

        User user = new User();

        given(userServices.getUserPaging()).willReturn(uRepo);
        given(uRepo.findByUsername(takenUsername)).willReturn(user);
        given(userServices.getAdminPaging()).willReturn(aRepo);


        //when
        JsonResponse res = restController.createAdmin(form);

        //then
        verify(userServices.getUserPaging(), Mockito.times(1)).findByUsername(takenUsername);
        verify(userServices.getAdminPaging(), Mockito.times(0)).save(any(Admin.class));
        assertThat(res.getSuccess(), is(false));
        assertThat(res.getMessage(), is("User already exists with username:"+takenUsername));
    }

    @Test
    void getAdminByIdReturnsSuccessfulResponseGivenValidId() {
        //given
        String validAdminIdStr = "1";
        int validAdminIdInt = Integer.parseInt(validAdminIdStr);

        Admin admin = new Admin();
        Optional<Admin> adminOpt = Optional.of(admin);

        given(userServices.getAdminPaging()).willReturn(aRepo);
        given(aRepo.findById(validAdminIdInt)).willReturn(adminOpt);

        //when
        AdminListResponse res = restController.getAdminById(validAdminIdStr);

        //then
        verify(userServices.getAdminPaging(), Mockito.times(1)).findById(validAdminIdInt);
        assertThat(res.getSuccess(), is(true));
        assertThat(res.getMessage(), is(""));
    }


    @Test
    void getAdminByIdReturnsUnsuccessfulResponseGivenInvalidId() {
        //given
        String invalidAdminIdStr = "1";
        int validAdminIdInt = Integer.parseInt(invalidAdminIdStr);

        Optional<Admin> adminOpt = Optional.empty();

        given(userServices.getAdminPaging()).willReturn(aRepo);
        given(aRepo.findById(validAdminIdInt)).willReturn(adminOpt);

        //when
        AdminListResponse res = restController.getAdminById(invalidAdminIdStr);

        //then
        verify(userServices.getAdminPaging(), Mockito.times(1)).findById(validAdminIdInt);
        assertThat(res.getSuccess(), is(false));
        assertThat(res.getMessage(), is(not("")));
    }

    @Test
    void listAdminReturnsSuccessfulResponseGivenPageNumber() {
        //given
        String pageNum = "1";
        int pageNumInt = Integer.parseInt(pageNum);
        Pageable pageable = PageRequest.of(pageNumInt-1, 10);

        Admin a1 = new Admin();
        Admin a2 = new Admin();
        Admin a3 = new Admin();
        Admin a4 = new Admin();
        Admin[] admins = {a1,a2,a3,a4};
        
        List<Admin> adminsList = Arrays.asList(admins);

        Page<Admin> adminPage = new PageImpl<Admin>(adminsList, pageable, adminsList.size());

        given(userServices.getAdminPaging()).willReturn(aRepo);
        given(aRepo.findAll(pageable)).willReturn(adminPage);

        //when
        AdminListResponse res = restController.listAdmin(pageNum);

        //then
        verify(userServices.getAdminPaging(), Mockito.times(1)).findAll(pageable);
        assertThat(res.getSuccess(), is(true));
        assertThat(res.getTotalPages(), is(adminPage.getTotalPages()));
        assertThat(res.getAdminJsons().size(), is(adminsList.size()));


    }


   
    @Test
    void findAdminByFirstnameReturnsSuccessfulGivenNameFromDB() {
        //given
        String nameFromDB = "name";
        String pageNum = "1";
        int pageNumInt = Integer.parseInt(pageNum);
        Pageable pageable = PageRequest.of(pageNumInt-1, 10, Sort.by("name").ascending());

        Admin a1 = new Admin();
        Admin a2 = new Admin();
        Admin a3 = new Admin();
        Admin a4 = new Admin();
        Admin[] admins = {a1,a2,a3,a4};
        
        List<Admin> adminsList = Arrays.asList(admins);

        Page<Admin> adminPage = new PageImpl<Admin>(adminsList, pageable, adminsList.size());
        
        
        given(userServices.getAdminPaging()).willReturn(aRepo);
        given(aRepo.findAllByNameContaining(nameFromDB,pageable)).willReturn(adminPage);

        //when
        AdminListResponse res = restController.findAdminByFirstname(nameFromDB, pageNum);

        //then
        verify(userServices.getAdminPaging(), Mockito.times(1)).findAllByNameContaining(nameFromDB, pageable);
        assertThat(res.getSuccess(), is(true));
        assertThat(res.getTotalPages(), is(adminPage.getTotalPages()));
        assertThat(res.getAdminJsons().size(), is(adminsList.size()));

    }

    @Test
    void findAdminByFirstnameReturnsUnsuccessfulGivenNameNotFromDB() {
        //given
        String nameFromDB = "name";
        String pageNum = "1";
        int pageNumInt = Integer.parseInt(pageNum);
        Pageable pageable = PageRequest.of(pageNumInt-1, 10, Sort.by("name").ascending());

        
        Admin[] noAdmins = {};
        
        List<Admin> emptyAdminsList = Arrays.asList(noAdmins);

        Page<Admin> adminPage = new PageImpl<Admin>(emptyAdminsList, pageable, emptyAdminsList.size());
        
        given(userServices.getAdminPaging()).willReturn(aRepo);
        given(aRepo.findAllByNameContaining(nameFromDB,pageable)).willReturn(adminPage);

        //when
        AdminListResponse res = restController.findAdminByFirstname(nameFromDB, pageNum);

        //then
        verify(userServices.getAdminPaging(), Mockito.times(1)).findAllByNameContaining(nameFromDB, pageable);
        assertThat(res.getSuccess(), is(false));
        assertThat(res.getTotalPages(), is(adminPage.getTotalPages()));
        assertThat(res.getAdminJsons().size(), is(emptyAdminsList.size()));
        assertThat(res.getMessage(), is(not("")));

    }
}
