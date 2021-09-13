package com.App.PatientHealth.requestObjects;

public class UserLoginForm {

	private String username;
	
	private String password;
	
	private boolean rememberMe;

	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * @param username the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @return the rememberMe
	 */
	public boolean isRememberMe() {
		return rememberMe;
	}

	/**
	 * @param rememberMe the rememberMe to set
	 */
	public void setRememberMe(boolean rememberMe) {
		this.rememberMe = rememberMe;
	}
	
	
}
