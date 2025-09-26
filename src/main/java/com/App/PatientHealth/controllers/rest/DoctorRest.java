package com.App.PatientHealth.controllers.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.App.PatientHealth.domain.AppointmentRequest;
import com.App.PatientHealth.domain.Doctor;
import com.App.PatientHealth.domain.MedicalNote;
import com.App.PatientHealth.domain.Patient;
import com.App.PatientHealth.domain.Prescription;
import com.App.PatientHealth.domain.User;
import com.App.PatientHealth.requestObjects.AppointmentRequestForm;
import com.App.PatientHealth.requestObjects.DoctorRegForm;
import com.App.PatientHealth.requestObjects.MedicalNoteForm;
import com.App.PatientHealth.requestObjects.PrescriptionForm;
import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.DoctorJson;
import com.App.PatientHealth.responseObject.domain.PatientJson;
import com.App.PatientHealth.responseObject.lists.DoctorListResponse;
import com.App.PatientHealth.responseObject.lists.PatientListResponse;
import com.App.PatientHealth.services.UserDetailsServiceImpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 
 */
@RequestMapping("/rest/doctor")
@RestController
public class DoctorRest {
    @Autowired
    UserDetailsServiceImpl userServices;

    Logger logger = LoggerFactory.getLogger(DoctorRest.class);


    @GetMapping("/current-doctor/get-id")
    public JsonResponse getDoctorId() {
        JsonResponse res = new JsonResponse();
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        try {
            //get current doctor id
            Optional<Doctor> doctorOpt = userServices.getDoctorPaging().findByUsername(username);

            if(doctorOpt.isPresent()) {
                Doctor doctor = doctorOpt.get();
                String id = Integer.toString(doctor.getId());
                res.setMessage(id);
                res.setSuccess(true);
            }
        }
        catch (Exception e) {
            res.setSuccess(false);
        }
        
        return res;
    }

    //SECTION ******** Doctor *********
    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE)
    public JsonResponse createDoctor(@RequestBody DoctorRegForm form) {
        //create response object
        JsonResponse res = new JsonResponse();
        //check is user with that username already exists
        User u = userServices.getUserPaging().findByUsername(form.getUsername());
        //save user if no user exists with that username
        if (u == null) {
            Doctor doctor = new Doctor(form);
            try {
                userServices.getDoctorPaging().save(doctor);
                res.setMessage("Successfully registered doctor.");
                res.setSuccess(true);
            }
            catch (Error e) {
                res.setMessage("Error registering doctor.");
                res.setSuccess(false);
            }
        }
        //return response to client
        return res;
    }


    @GetMapping("/{doctorId}")
    public DoctorListResponse getDoctorById(@PathVariable String doctorId) {
        //create response object
        DoctorListResponse res = new DoctorListResponse();

        //find doctor by id
        int id = Integer.parseInt(doctorId);
        Optional<Doctor> doctorOpt = userServices.getDoctorPaging().findById(id);

        //add doctor to response
        List<DoctorJson> docJsons = new ArrayList<DoctorJson>();
        if(doctorOpt.isPresent()) {
            docJsons.add(new DoctorJson(doctorOpt.get()));
            res.setDoctorJsons(docJsons);
            res.setSuccess(true);
        }
        else {
            res.setSuccess(false);
            res.setMessage("No details available");
        }
        return res;
    }

    //read doctor's patient info
    @GetMapping("/get-patients/{doctorId}")
    public PatientListResponse getDoctorsPatients(@PathVariable String doctorId) {
        //retrieve doctor
        Optional<Doctor> doctorOpt = userServices.getDoctorPaging().findById(Integer.parseInt(doctorId));
        Doctor doctor;
        PatientListResponse res = new PatientListResponse();
        List<PatientJson> pJson = new ArrayList<PatientJson>();
        //if present return doctor
        if(doctorOpt.isPresent()) {
            doctor = doctorOpt.get();
            //add patients
            doctor.getPatients().forEach( p -> 
                pJson.add(new PatientJson(p))
            );
            res.setPatientJsons(pJson);
            res.setSuccess(true);
        }
        else {
            res.setSuccess(false);
        }
        
        return res;
    }


    //get doctors - pagination method - by firstname
    @GetMapping("/get-doctor/name/{name}/{pageNum}")
    public DoctorListResponse findDoctorByName(@PathVariable String name, @PathVariable String pageNum) {

        //set page number and return up to 10 elements
        //Note: pageNum -1 because it starts at zero
        Pageable page = PageRequest.of(Integer.parseInt(pageNum)-1, 5, Sort.by("name").ascending());
        
        //get list of users from that page
        Page<Doctor> doctorPage = userServices.getDoctorPaging().findAllByNameContainingIgnoreCase(name, page);
        //set response object with users
        DoctorListResponse res = new DoctorListResponse();

        logger.debug("page.toString():"+page.toString());
        logger.debug("findDoctorByFirstname");
        logger.debug("pageNum:"+pageNum);
        logger.debug("name:"+name);
        logger.debug("Doctor List size:"+Integer.toString(doctorPage.getContent().size()));
        logger.debug("Page Content:"+doctorPage.getContent().toString());

        if(doctorPage.hasContent()) {
            doctorPage.getContent().forEach( u -> {
                res.getDoctorJsons().add(new DoctorJson(u));
                res.setSuccess(true);
            });
         }
         else {
             res.setSuccess(false);
             res.setMessage("No doctors to display.");
         }
         
         res.setTotalPages(doctorPage.getTotalPages());
         return res;
    }
   
    
    @PostMapping("/add-patient")
    public JsonResponse addPatientToDoctor(@RequestBody Map<String,String> request) {
        String doctorId = request.get("docId");
        String patientId = request.get("pId");
        //create new repsonse object
        JsonResponse res = new JsonResponse();

        //find doctorId
        Optional<Doctor> d = userServices.getDoctorPaging().findById(Integer.parseInt(doctorId));

        //find patient
        Optional<Patient> p = userServices.getPatientPaging().findById(Integer.parseInt(patientId));
        if (!p.isPresent()) {
            res.setMessage("No Patient found with id:" + patientId);
            res.setSuccess(false);
            return res;
        }
        //add patient to doctor list
        if (d.isPresent()) {
            d.get().getPatients().add(p.get());
            p.get().setDoctor(d.get());
            //save changes
            try {
                userServices.getDoctorPaging().save(d.get());
                // userServices.getPatientPaging().save(p.get());
                res.setSuccess(true);
            }
            catch (Exception e) {
                res.setMessage("Patient may already be assigned a Doctor.");
                res.setSuccess(false);
            }
            
        }
        else {
            res.setMessage("No Patient found with id:" + patientId);
            res.setSuccess(false);
            return res;
        }

        //return response
        return res;
    }

    

    @DeleteMapping("/remove-patient")
    public JsonResponse removePatientFromDoctor(@RequestBody Map<String, String> request) {
        String docId = request.get("docId");
        String pId = request.get("pId");
        logger.debug("pId:"+ pId+" docId:"+docId);
        JsonResponse res = new JsonResponse();

        Optional<Patient> patientOpt = userServices.getPatientPaging().findById(Integer.parseInt(pId));

        //delete doctor-patient entity relationship from owning side - patient side
        //otherwise causes problems
        if(patientOpt.isPresent()) {
           Patient p = patientOpt.get();
           p.setDoctor(null);
           userServices.getPatientPaging().save(p);
           res.setSuccess(true);
           res.setMessage("Removing patient successful.");
        }
        else {
            res.setSuccess(false);
            res.setMessage("Problem removing patient.");
        }

        
        return res;
    }



    //SECTION ******** Patient Prescriptions CRUD *********
    //add prescription to patient
    @PostMapping("/add-prescription")
    public JsonResponse addPrescriptionToPatient(@RequestBody PrescriptionForm form) {
        JsonResponse res = new JsonResponse();

        Prescription pres = new Prescription(form);
        Optional<Patient> patientOpt = userServices.getPatientPaging().findById(form.getPatientId());

        if(patientOpt.isPresent()) {
            Patient patient = patientOpt.get();
            pres.setPatient(patient);
            patient.getPrescriptions().add(pres);
            try {
                userServices.getPrescriptionRepo().save(pres);
                // userServices.getPatientPaging().save(patient);
                //if success
                res.setSuccess(true);
                res.setMessage("Prescription added successfully");
            }
            catch (Exception e) {
                res.setSuccess(false);
                res.setMessage("Problem saving prescription");
            }
            
        }
        else {
            res.setSuccess(false);
            res.setMessage("No patient found to add prescription"); 
        }
        
        return res;
    }

    @PostMapping("/edit-patient-prescription")
    public JsonResponse editPrescription(@RequestBody PrescriptionForm form) {
        JsonResponse res = new JsonResponse();
        
        //create edited prescription from form data
        Optional<Prescription> presOpt = userServices.getPrescriptionRepo().findById(form.getPrescriptionId());

        if (presOpt.isPresent()) {
            Prescription pres = presOpt.get();
            //update prescription
            pres.updateFromForm(form);
             //save changes
            try {
                userServices.getPrescriptionRepo().save(pres);
                //if success
                res.setSuccess(true);
                res.setMessage("Prescription edited successfully");
            }
            catch (Exception e) {
                res.setSuccess(false);
                res.setMessage("Problem saving edited prescription");
            }
        }
        else {
            res.setSuccess(false);
            res.setMessage("No matching prescription found in database");
        }
        
        return res;
    }


    @DeleteMapping("/delete-prescription/{prescriptionId}")
    public JsonResponse deletePrescription(@PathVariable String prescriptionId) {
        JsonResponse res = new JsonResponse();
        int id = Integer.parseInt(prescriptionId);

        try {
            //find prescription by id
            Optional<Prescription> preOpt = userServices.getPrescriptionRepo().findById(id);
            //delete prescription if present
            if(preOpt.isPresent()) {
                Prescription prescription = preOpt.get();
                userServices.getPrescriptionRepo().delete(prescription);
                res.setSuccess(true);
                res.setMessage("Prescription successfully deleted");
            }
            else {
                res.setSuccess(false);
                res.setMessage("Prescription does not exist in databse");
            }
            
        }
        catch (Exception e) {
            res.setSuccess(false);
            res.setMessage("Problem deleting prescription");
        }
        return res;
    }




    

    //SECTION ******** Patient Medical Notes CRUD *********

    //add doctor's note to patient
    @PostMapping("/add-medical-note")
    public JsonResponse addMedicalNoteToPatient(@RequestBody MedicalNoteForm form) {
        JsonResponse res = new JsonResponse();
        
        MedicalNote note = new MedicalNote(form);
        Optional<Patient> patientOpt = userServices.getPatientPaging().findById(form.getPatientId());

        if(patientOpt.isPresent()) {
            //add note to patient
            Patient patient = patientOpt.get();
            note.setPatient(patient);
            
            //save changes
            userServices.getMedicalNoteRepo().save(note);

            //prepare response
            res.setSuccess(true);
            res.setMessage("Doctor note added to patient successfully.");
        }
        else {
            res.setSuccess(false);
            res.setMessage("Invalid patient id.");
        }
        return res;
    }

    @GetMapping("/get-patient-notes/{pid}")
    public PatientListResponse getMedicalNotesFromPatient(@PathVariable String pid) {
        int pidInt = Integer.parseInt(pid);
        PatientListResponse res = new PatientListResponse();
        Optional<Patient> patientOpt = userServices.getPatientPaging().findById(pidInt);
    
        if(patientOpt.isPresent()) {
            Patient patient = patientOpt.get();
            res.getPatientJsons().add(new PatientJson(patient));
            res.setSuccess(true);
        }
        else {
            res.setSuccess(false);
            res.setMessage("Problem retrieving patient");
        }

        return res;
    }


    @PostMapping("/edit-medical-note")
    public JsonResponse editMedicalNote(@RequestBody MedicalNoteForm form) {
        JsonResponse res = new JsonResponse();

        Optional<MedicalNote> noteOpt = userServices.getMedicalNoteRepo().findById(form.getId());

        if (noteOpt.isPresent()) {
            MedicalNote note  = noteOpt.get();
            note.updateFromForm(form);

            try {
                //save changes
                userServices.getMedicalNoteRepo().save(note);
                //prep response
                res.setSuccess(true);
                res.setMessage("Medical note updated successfully.");
            }
            catch (Exception e) {
                res.setSuccess(false);
                res.setMessage("Problem updating medical note");
            }
            
        }
        else {
            res.setSuccess(false);
            res.setMessage("No matching note was found in database");
        }
       
        return res;
    }

    @DeleteMapping("/delete-medical-note/{noteId}")
    public JsonResponse deleteMedicalNote(@PathVariable String noteId) {
        JsonResponse res = new JsonResponse();
        int id = Integer.parseInt(noteId);
        Optional<MedicalNote> noteOpt = userServices.getMedicalNoteRepo().findById(id);

        if(noteOpt.isPresent()) {
            MedicalNote note = noteOpt.get();
            try {
                //delete note
                userServices.getMedicalNoteRepo().delete(note);
                //prepare response object
                res.setSuccess(true);
                res.setMessage("Note deleted successfully.");
            }
            catch (Exception e) {
                res.setSuccess(false);
                res.setMessage("Problem deleting note");
            }
        }
        else {
            res.setSuccess(false);
            res.setMessage("Note was not deleted successfully");
        }

        return res;
    }



    //SECTION ******** Patient Appointment Requests CRUD *********

    @PostMapping("/add-patient-appointment-request")
    public JsonResponse addAppointmentRequest(@RequestBody AppointmentRequestForm form) {
        JsonResponse res = new JsonResponse();
        AppointmentRequest request = new AppointmentRequest(form);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<Patient> patientOpt = userServices.getPatientPaging().findById(form.getPatientId());
        Optional<Doctor> doctorOpt = userServices.getDoctorPaging().findByUsername(username);
        
        if (doctorOpt.isPresent()) {
            Doctor doctor = doctorOpt.get();
            request.setDoctor(doctor);
        }
        if (patientOpt.isPresent()) {
            Patient patient = patientOpt.get();
            request.setPatient(patient);
            patient.getAppointmentRequests().add(request);
        }

        if (patientOpt.isPresent() && doctorOpt.isPresent()) {
            //save new request
            try {
                userServices.getAppointmentRequestRepo().save(request);
                // will cascade saving the new appointment request
                res.setSuccess(true);
                res.setMessage("Appointment Request submitted successfully.");
            }
            catch (Exception e) {
                res.setSuccess(false);
                res.setMessage("Error submitting appointment request");
            }
        }
        else {
            res.setSuccess(false);
            res.setMessage("Problem submitting appointment request");
        }
        return res;
    }

    @PostMapping("/edit-appointment-request")
    public JsonResponse editAppointmentRequest(@RequestBody AppointmentRequestForm form) {
        JsonResponse res = new JsonResponse();

        //get optional appointment request by id
        Optional<AppointmentRequest> requestOpt = userServices.getAppointmentRequestRepo().findById(form.getRequestId());

        //if present - update appointment request with form changes
        if (requestOpt.isPresent()) {
            AppointmentRequest request = requestOpt.get();
            request.updateFromForm(form);

            try {
                //save changes
                userServices.getAppointmentRequestRepo().save(request);
            
                //prepare response object
                res.setSuccess(true);
                res.setMessage("Appointment Request edited successfully");
            }
            catch (Exception e){
                res.setSuccess(false);
                res.setMessage("Problem updating appointment");
                //TODO ADD LOGGING MESSAGE
            }
            
        }
        else {
            res.setSuccess(false);
            res.setMessage("No matching appointment request found");
        }

        //return response
        return res;
    }


    @DeleteMapping("/delete-appointment-request/{requestId}")
    public JsonResponse deleteAppointmentRequest(@PathVariable String requestId) {
        JsonResponse res = new JsonResponse();
        int id = Integer.parseInt(requestId);

        //get optional appointment request note by id
        Optional<AppointmentRequest> requestOpt = userServices.getAppointmentRequestRepo().findById(id);

        //if present - delete
        if (requestOpt.isPresent()) {
            AppointmentRequest request = requestOpt.get(); 
            try {
                userServices.getAppointmentRequestRepo().delete(request);
                res.setSuccess(true);
                res.setMessage("Successfully deleted Appointment Request");
            }
            catch (Exception e){
                res.setSuccess(false);
                res.setMessage("Problem deleting appointment request");
            }
        }
        else {
            res.setSuccess(false);
            res.setMessage("No matching appointment request found in database");
        }
        //return resposne

        return res;
    }
    

    
}
