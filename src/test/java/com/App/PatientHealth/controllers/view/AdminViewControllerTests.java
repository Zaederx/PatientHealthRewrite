package com.App.PatientHealth.controllers.view;

import com.App.PatientHealth.services.UserDetailsServiceImpl;

import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.CoreMatchers.is;
@ExtendWith(MockitoExtension.class)
public class AdminViewControllerTests {
    
    @Mock
    UserDetailsServiceImpl userServices;

    @InjectMocks
    AdminViewController adminViewController;

    @BeforeEach
    void setup() {
    }

    @Test
    void adminHomeView() {
        //when
        String view = adminViewController.adminHome();

        //then
        assertThat(view,is("admin/admin-home"));

    }

    void registerUsersView() {

    }

    void searchUsersView() {

    }

    void manageDoctorsView() {

    }

    void editUsersView() {

    }

    void deleteUsersView() {

    }
}
