package com.App.PatientHealth;

import java.util.Map;

import com.App.PatientHealth.controllers.view.LoginViewController;
import com.App.PatientHealth.requestObjects.UserLoginForm;

import org.hamcrest.core.IsInstanceOf;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.BDDMockito.then;
// import static org.mockito.BDDMockito.any;

import org.mockito.ArgumentMatchers;
// import static org.mockito.ArgumentMatchers.any;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.ui.Model;

@ExtendWith(MockitoExtension.class)
public class PatientLoginViewTest {

    @Mock
    Model model;

    @InjectMocks
    LoginViewController viewController;
    
    @Test
    void loginViewController() {
        //when
        String view = viewController.login(model);

        //then
        assertThat(view, is("home/login"));
        then(model).should().addAttribute(ArgumentMatchers.contains("userLoginForm"), ArgumentMatchers.any(UserLoginForm.class));
    }
}
