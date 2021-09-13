package com.App.PatientHealth.responseObject;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class JsonResponse {
    String message;
    /**Whether the object of the request was carried out successfully */
    boolean success;
    Integer totalPages;

    public JsonResponse() {
        this.message = "";
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean getSuccess() {
        return success;
    }

    /**
     * 
     * @param response - boolean - true if the objective of the request 
     * was carried out successfully
     */
    public void setSuccess(boolean response) {
        this.success = response;
    }

    public Integer getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(Integer totalPages) {
        this.totalPages = totalPages;
    }
}
