package com.App.PatientHealth.responseObject.lists;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.domain.Admin;
import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.AdminJson;

public class AdminListResponse extends JsonResponse{
    List<AdminJson> adminJsons;

    public AdminListResponse() {
        this.adminJsons = new ArrayList<AdminJson>();
    }

    public AdminListResponse(List<Admin> list) {
        this.adminJsons = adminListToAdminJson(list);
    }

    private List<AdminJson> adminListToAdminJson(List<Admin> list) {
        List<AdminJson> adminJson = new ArrayList<AdminJson>();
        list.forEach( a -> adminJson.add(new AdminJson(a)));
        return adminJson;
    }

    
    public List<AdminJson> getAdminJsons() {
        return adminJsons;
    }

    public void setAdminJsons(List<AdminJson> adminJson) {
        this.adminJsons = adminJson;
    }
}
