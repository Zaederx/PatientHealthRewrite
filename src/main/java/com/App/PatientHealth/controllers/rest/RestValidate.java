package com.App.PatientHealth.controllers.rest;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import com.App.PatientHealth.domain.Gmc;
import com.App.PatientHealth.domain.User;
import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.PasswordResponse;
import com.App.PatientHealth.services.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("rest/validate")
@RestController
public class RestValidate {
    @Autowired
    UserDetailsServiceImpl userServices;

    @PostMapping(value = "/name", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public JsonResponse validateName(@RequestBody Map<String,String> request) {
        JsonResponse res = new JsonResponse();
        String name = request.get("name");
        if (name.length() != 0) {
            res.setSuccess(true);
        }
        else {
            res.setSuccess(false);
            res.setMessage("No valid name given.");
        }
        return res;
    }

    @PostMapping(value = "/username", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public JsonResponse validateUsername(@RequestBody  Map<String,String> request) {
        JsonResponse res = new JsonResponse();
        String username = request.get("username");
        User u = null;
        if (!username.isEmpty()) {
            u = userServices.getUserRepo().findByUsername(username);
        }
        if (username.length() != 0 && u == null) {
            res.setSuccess(true);
        }
        else if (u != null){
            res.setSuccess(false);
            res.setMessage("Username is already taken.");
            
        }
        else if (username.length() == 0){
            res.setMessage("No valid username given.");
        }
        return res;
    }

    @PostMapping(value = "/email", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public JsonResponse validateEmail(@RequestBody  Map<String,String> request) {
        //create response object
        JsonResponse res = new JsonResponse();
        //get email
        String email = request.get("email");
        //check against email pattern
        String emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$";
		boolean matches = Pattern.matches(emailPattern, email);

        //not valid if does not match
		if(!matches) {
			res.setSuccess(false);
			res.setMessage("Not valid email. Please enter a valid email address "
					+ "or contact our administrative team for assistance.");
			return res;
		}
		
        //not valid is already in use
        User u = userServices.getUserRepo().findByEmail(email);
		try {
			if (u != null) {
				res.setSuccess(false);
				res.setMessage("This email is already in use."
						+ " Please choose a unique email or contact our "
						+ "administrative team for assistance.");
				return res;
			} 
		} 
        //any other problem
        catch (Exception e) {
			res.setSuccess(false);
			res.setMessage("There seems to be a problem."
					+ " Please contact our administrative team for assistance.");//TODO
			return res;
		}
		res.setSuccess(true);
        return res;
    }

    @PostMapping(value = "/password", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public PasswordResponse validatePassword(@RequestBody  Map<String,String> request) {
        PasswordResponse res = new PasswordResponse();
        String password1 = request.get("password1");
        String password2 = request.get("password2");

        if (password1.isEmpty() || password1 == null) {
            res.setSuccess(false);
            res.setMessage("Password 1 is empty. Please enter password into first password field.");
            return res;
        }
        //Password
		//Password Error messages
		String passwordsMatch = null;
		String passwordLength = null;
		String specialCharacters = null;
		String containsNumber = null;
		String containsUppercase = null;
		String containsLowercase = null;

        //Password Regex rules
		String spec = "[^a-z0-9]";
		String upper = "[A-Z]";
		String lower = "[a-z]";
		String num = "[0-9]";

		Pattern special = Pattern.compile(spec, Pattern.CASE_INSENSITIVE);
		Pattern uppercase = Pattern.compile(upper);
		Pattern lowercase = Pattern.compile(lower);
		Pattern number = Pattern.compile(num);
		
		//If password2 is null
		boolean p2Null = password2 == null;
		
		if (!p2Null && !password1.equals(password2)) {
			passwordsMatch = "- passwords do not match";
            res.setPasswordsMatch(passwordsMatch);
		}
		
		if (!(password1.length() >= 8)) {
			passwordLength = "- must be at least 8 characters long";
            res.setPasswordLength(passwordLength);
		}
		
		if (!special.matcher(password1).find()) {
			specialCharacters = "- must contain special characters";
            res.setSpecialCharacters(specialCharacters);
		}
		
		if (!number.matcher(password1).find()) {
			containsNumber = "- must contain a number";
            res.setContainsNumber(containsNumber);
		}
		
		if (!uppercase.matcher(password1).find()) {
			containsUppercase = "- must contain an uppercased (capital) letter";
            res.setContainsUppercase(containsUppercase);
		}
		
		if (!lowercase.matcher(password1).find()) {
			containsLowercase = "- must contain a lowercased (common) letter";
            res.setContainsLowercase(containsLowercase);
		}

        if(passwordsMatch == null && passwordLength == null && specialCharacters == null
        && containsNumber == null && containsUppercase == null && containsLowercase == null) {
            res.setSuccess(true);
        }
        
        return res;
    }


    @PostMapping(value = "/gmcNum")
    public JsonResponse validateGmc(@RequestBody Map<String,String> request) {
        JsonResponse res = new JsonResponse();
        Double gmcNum = null;
        try {
            gmcNum = Double.parseDouble(request.get("gmcNum"));
        } catch (Exception e) {
            res.setSuccess(false);
            res.setMessage("Please enter a valid number");
            return res;
        }
        
        Gmc gmcCheck = userServices.getGRepo().findByGmcNum(gmcNum);
        
        if (gmcCheck != null && gmcCheck.getUsed() == true) {
            res.setSuccess(false);
            res.setMessage("GMC number is already in use.");
        } 
        else if (gmcCheck == null){
            res.setSuccess(false);
            res.setMessage("GMC number is invalid");
        }
        else if (gmcCheck != null && gmcCheck.getUsed() == false) {
            res.setSuccess(true);
        }
        return res;
        
    }
}
