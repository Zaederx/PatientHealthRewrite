package com.App.PatientHealth.responseObject.lists;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.UserJson;

public class UserListResponse extends JsonResponse {
    List<UserJson> userJson;
    
    public UserListResponse() {
        this.userJson = new ArrayList<UserJson>();
    }
    public List<UserJson> getUserJson() {
        return userJson;
    }

    public void setUserJson(List<UserJson> userJson) {
        this.userJson = userJson;
    }
}
