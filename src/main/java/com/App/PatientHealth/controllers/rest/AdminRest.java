package com.App.PatientHealth.controllers.rest;

import java.util.ArrayList;
import java.util.List;

import java.util.Optional;

import com.App.PatientHealth.domain.Admin;
import com.App.PatientHealth.domain.Patient;
import com.App.PatientHealth.domain.User;
import com.App.PatientHealth.requestObjects.AdminRegForm;
import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.AdminJson;
import com.App.PatientHealth.responseObject.domain.PatientJson;
import com.App.PatientHealth.responseObject.domain.UserJson;
import com.App.PatientHealth.responseObject.lists.AdminListResponse;
import com.App.PatientHealth.responseObject.lists.PatientListResponse;
import com.App.PatientHealth.responseObject.lists.UserListResponse;
import com.App.PatientHealth.services.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("rest/admin")
@RestController
public class AdminRest {
    @Autowired
    UserDetailsServiceImpl userServices;

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE)
    public JsonResponse createPatient(@RequestBody AdminRegForm form) {
        //create response object
        JsonResponse res = new JsonResponse();
        //check is user with that username already exists
        User u = userServices.getUserRepo().findByUsername(form.getUsername());
        //save user if no user exists with that username
        if (u == null) {
            Admin admin = new Admin(form);
            try {
                userServices.getARepo().save(admin);
                res.setMessage("Successfully registered admin.");
                res.setSuccess(true);
            }
            catch (Error e) {
                res.setMessage("Error registering admin.");
                res.setSuccess(false);
            }
        }
        //return response to client
        return res;
    }

    @GetMapping("/all")
    public AdminListResponse getAdmin() {
        AdminListResponse res = new AdminListResponse();
        Iterable<Admin> admin = userServices.getARepo().findAll();

        List<AdminJson> aJson = new ArrayList<AdminJson>();
        admin.forEach( a -> 
            aJson.add(new AdminJson(a))
        );
        res.setAdminJson(aJson);
        return res;
    }

    @GetMapping("{adminId}")
    public AdminListResponse getAdminById(@RequestParam Integer adminId) {
        //create response object
        AdminListResponse res = new AdminListResponse();

        Optional<Admin> adminOpt = userServices.getARepo().findById(adminId);

        List<AdminJson> aJsons = new ArrayList<AdminJson>();
        if (adminOpt.isPresent()) {
            aJsons.add(new AdminJson(adminOpt.get()));
        }
        res.setAdminJson(aJsons);
        return res;
    }

    
    //SECTION read users
  
    //read patient's doctor
    @GetMapping("patient/{patientId}")
    public JsonResponse patientDoctors(@RequestParam Integer patientId) {
        //create response object
        PatientListResponse res = new PatientListResponse();
        //get patient
        Optional<Patient> p = userServices.getPRepo().findById(patientId);
        //if patient is present - add to response
        if(p.isPresent()) {
            res.getPatientJson().add(new PatientJson(p.get()));
        }
        return res;
    }
    
    //List of admin - pagination
    @GetMapping("list-admin/{pageNum}")
    public JsonResponse listAdmin(@RequestParam Integer pageNum) {
        //set page number and return up to 10 elements
        Pageable page = PageRequest.of(pageNum, 10);
        //retrieve page from AdminPaging repository 
        Page<Admin> adminPages = userServices.getAdminPaging().findAll(page);
        //get list of admin
        List<Admin> adminList = adminPages.getContent();
        //put list in response object
        AdminListResponse res = new AdminListResponse(adminList);
        res.setTotalPages(adminPages.getTotalPages());
        return res;
    }

    /***********Admin - By Firsname Lastname *************** */
    //get admin - by firstname
    @GetMapping("get-admin/name/{name}/{pageNum}")
    public JsonResponse findAdminByFirstname(@RequestParam String name,@RequestParam Integer pageNum) {
         //set page number and return up to 10 elements
         Pageable page = PageRequest.of(pageNum, 10);
         //get list of users from that page
         Page<Admin> uList = userServices.getAdminPaging().findAllByName(name, page);
         //set response object with users
         UserListResponse res = new UserListResponse();
         uList.forEach( u -> 
             res.getUserJson().add(new UserJson(u))
         );
         res.setTotalPages(uList.getTotalPages());
         return res;
    }

    /*********** *************** */

    /***********Doctor - By Firsname Lastname *************** */
    
    


    



    /***********User - By Firsname Lastname *************** */
    //read list of user's by lastname
    @GetMapping("get-user/name/{name}/{pageNum}")
    public JsonResponse findUserByLastname(@RequestParam String name, @RequestParam Integer pageNum) {
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


  /*********** *************** */

    


    //update user

    //delete user
}
