package com.App.PatientHealth.javaJson.list;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.javaJson.single.AdminJson;

public class AdminResponse extends JsonResponse{
    List<AdminJson> adminJson;

    public AdminResponse() {
        this.adminJson = new ArrayList<AdminJson>();
    }

    public List<AdminJson> getAdminJson() {
        return adminJson;
    }

    public void setAdminJson(List<AdminJson> adminJson) {
        this.adminJson = adminJson;
    }
}
