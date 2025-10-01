package com.App.PatientHealth.controllers.rest;

import java.util.Map;
import java.util.Optional;

import com.App.PatientHealth.domain.Admin;
import com.App.PatientHealth.domain.Doctor;
import com.App.PatientHealth.domain.Patient;
import com.App.PatientHealth.domain.User;
import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.UserJson;
import com.App.PatientHealth.responseObject.lists.UserListResponse;
import com.App.PatientHealth.services.UserDetailsServiceImpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("rest/user")
public class UserRest {

    Logger logger = LoggerFactory.getLogger(UserRest.class);

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
                userServices.getAdminPaging().save(admin);
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
                userServices.getDoctorPaging().save(doctor);
            }
            catch (Exception e) {
                message = "Adding doctor unsucessful";
            }
        }
        //if patient
        else if(request.get("usertype") == "patient") {
            Patient patient = new Patient(name,username,password,email,"10/11/1995");
            try {
                userServices.getPatientPaging().save(patient);
            }
            catch (Exception e) {
                message = "Saving user unsuccessful";
            }
        }
        JsonResponse res = new JsonResponse();
        res.setMessage(message);
        return res;
    }

    @GetMapping("/get-user/name/{name}/{pageNum}")
    public JsonResponse findUserByFirstname(@PathVariable String name,@PathVariable String pageNum) {
        int pageNumInt = Integer.parseInt(pageNum);
        //set page number and return up to 10 elements
        //note -1 because of zero indexed for pages (i.e. starts at zero)
        Pageable page = PageRequest.of(pageNumInt-1, 5, Sort.by("name").ascending());
        //get page of users
        Page<User> uPage = userServices.getUserPaging().findAllByNameContainingIgnoreCase(name, page);
        //set response object with users
        UserListResponse res = new UserListResponse();
        if(uPage.hasContent()) {
            uPage.forEach( u -> 
                res.getUserJsons().add(new UserJson(u))
            );
            res.setTotalPages(uPage.getTotalPages());
            res.setSuccess(true);
        }
        else {
            res.setSuccess(false);
            res.setMessage("No results to display");
        }
        
        return res;
    }

    //read user by username
    @GetMapping("/get-user/username/{username}/{pageNum}")
    public JsonResponse findUserByUsername(@PathVariable String username, @PathVariable String pageNum) {
        int pageNumInt = Integer.parseInt(pageNum);
        //set page number and return up to 10 elements
        //note -1 because of zero indexed for pages (i.e. starts at zero)
        Pageable page = PageRequest.of(pageNumInt-1, 5, Sort.by("username").ascending());
        //get page of users
        Page<User> uPage = userServices.getUserPaging().findAllByUsernameContainingIgnoreCase(username, page);
        //set response object with users
        UserListResponse res = new UserListResponse();
        if(uPage.hasContent()) {
            uPage.forEach( u -> 
                res.getUserJsons().add(new UserJson(u))
            );
            res.setTotalPages(uPage.getTotalPages());
            res.setSuccess(true);
        }
        else {
            res.setSuccess(false);
            res.setMessage("No results to display");
        }
        return res;
   }

   @PostMapping("/edit")
   public JsonResponse updateUser(@RequestBody Map<String,String> request) {

       int id = Integer.parseInt(request.get("id"));
       String name = request.get("name");
       String username = request.get("username");
       String email = request.get("email");
       String password = request.get("password");

       //create response object
       JsonResponse res = new JsonResponse();

       //find user
       Optional<User> userOpt = userServices.getUserPaging().findById(id);
       if (userOpt.isPresent()) {
           //get user
            User user = userOpt.get();

            //make changes if values are not empty strings or null
            if (!name.isEmpty() && name != null ) {
                user.setName(name);
            }
            if (!username.isEmpty() && username != null ) {
                user.setUsername(username);
            }
            if (!email.isEmpty() && email != null ) {
                user.setEmail(email);
            }
            if (!password.isEmpty() && password != null ) {
                user.setPassword(password);
            }

            try {
                //save changes
                userServices.getUserPaging().save(user);
                res.setSuccess(true);
            }
            catch (Exception e) {
                res.setSuccess(false);
                res.setMessage("Error editing user");
            }
       }
       
       //return response object
       return res;
   }

   @DeleteMapping("/delete/{id}")
   public JsonResponse deleteUser(@PathVariable String id) {
       JsonResponse res = new JsonResponse();
       //check if user exists
       int idInt = Integer.parseInt(id);
       Optional<User> userOpt = userServices.getUserPaging().findById(idInt);
       if (userOpt.isPresent()) {
           try {
                //delete user
                userServices.getUserPaging().deleteById(idInt);
                res.setSuccess(true);
                res.setMessage("User successfully deleted");
           }
           catch (Exception e) {
               res.setSuccess(false);
               res.setMessage("Problem deleting user");
           }
           
       }
       else {
           res.setSuccess(false);
           res.setMessage("User does not exist");
       }

       return res;
   }
}
