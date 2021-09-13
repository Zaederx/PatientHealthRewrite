package com.App.PatientHealth.responseObject.lists;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.domain.Admin;
import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.AdminJson;

public class AdminListResponse extends JsonResponse{
    List<AdminJson> adminJson;

    public AdminListResponse() {
        this.adminJson = new ArrayList<AdminJson>();
    }

    public AdminListResponse(List<Admin> list) {
        this.adminJson = adminListToAdminJson(list);
    }

    private List<AdminJson> adminListToAdminJson(List<Admin> list) {
        List<AdminJson> adminJson = new ArrayList<AdminJson>();
        list.forEach( a -> adminJson.add(new AdminJson(a)));
        return adminJson;
    }

    
    public List<AdminJson> getAdminJson() {
        return adminJson;
    }

    public void setAdminJson(List<AdminJson> adminJson) {
        this.adminJson = adminJson;
    }
}
