package com.App.PatientHealth.responseObject.lists;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.UserJson;

public class UserListResponse extends JsonResponse {
    List<UserJson> userJsons;
    
    public UserListResponse() {
        this.userJsons = new ArrayList<UserJson>();
    }
    public List<UserJson> getUserJsons() {
        return userJsons;
    }

    public void setUserJsons(List<UserJson> userJson) {
        this.userJsons = userJson;
    }
}
