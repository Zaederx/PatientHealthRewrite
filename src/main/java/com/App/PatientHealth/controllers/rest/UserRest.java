package com.App.PatientHealth.controllers.rest;

import java.util.Map;

import com.App.PatientHealth.domain.Admin;
import com.App.PatientHealth.domain.Doctor;
import com.App.PatientHealth.domain.Patient;
import com.App.PatientHealth.domain.User;
import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.UserJson;
import com.App.PatientHealth.responseObject.lists.UserListResponse;
import com.App.PatientHealth.services.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("rest/user")
public class UserRest {

    @Autowired
    UserDetailsServiceImpl userServices;

    //SECTION create user
    @PostMapping("/create-user")
    public JsonResponse createUser(@RequestBody Map<String,String> request ) {
        //username
        String username = request.get("username");
        //password
        String password = request.get("password");
        //names
        String name = request.get("name");
        String email = request.get("email");

        String message = "User added successfully";
        //if admind - save admin
        if(request.get("usertype") == "admin") {
            Admin admin = new Admin(name,username,password,email);
            try {
                userServices.getARepo().save(admin);
            }
            catch (Exception e) {
                message = "Adding admin unsucessful";
            }
            
        }
        //if doctor
        else if(request.get("usertype") == "doctor") {
            String specialty = request.get("specialty");
            Doctor doctor = new Doctor(name,username,password,email,specialty);
            try {
                userServices.getDocRepo().save(doctor);
            }
            catch (Exception e) {
                message = "Adding doctor unsucessful";
            }
        }
        //if patient
        else if(request.get("usertype") == "patient") {
            Patient patient = new Patient(name,username,password,email);
            try {
                userServices.getPRepo().save(patient);
            }
            catch (Exception e) {
                message = "Saving user unsuccessful";
            }
        }
        JsonResponse res = new JsonResponse();
        res.setMessage(message);
        return res;
    }

    //get doctor - by firstname
    @GetMapping("get-user/name/{name}/{pageNum}")
    public JsonResponse findUserByFirstname(@RequestParam String name,@RequestParam Integer pageNum) {
         //set page number and return up to 10 elements
         Pageable page = PageRequest.of(pageNum, 10);
         //get list of users from that page
         Page<User> uList = userServices.getUserPaging().findAllByName(name, page);
         //set response object with users
         UserListResponse res = new UserListResponse();
         uList.forEach( u -> 
             res.getUserJson().add(new UserJson(u))
         );
         res.setTotalPages(uList.getTotalPages());
         return res;
    }

    //read user by username
    @GetMapping("get-user/username/{username}")
    public JsonResponse findUserByUsername(@RequestParam String username) {
        User u = userServices.getUserRepo().findByUsername(username);
        UserListResponse res = new UserListResponse();
        res.getUserJson().add(new UserJson(u));
        return res;
   }
}
