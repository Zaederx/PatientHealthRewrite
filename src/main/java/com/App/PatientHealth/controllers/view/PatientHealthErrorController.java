package com.App.PatientHealth.controllers.view;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PatientHealthErrorController implements ErrorController {

	// @Override
	// public String getErrorPath() {
	// 	return "/error";
	// }
	
	@RequestMapping("/error")
	public String defaultError(HttpServletRequest request) {
	System.out.println("defaultError page");
	Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);

	if (status !=null) {
		Integer statusInteger = Integer.valueOf(status.toString());
		if (statusInteger == HttpStatus.NOT_FOUND.value()) {
			return "errors/error-404-lost-user";//404
		}
		
		if (statusInteger == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
			return "errors/error-500";//500
		}
	}
	return "errors/error-default";
	}
	

}
