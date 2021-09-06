package com.App.PatientHealth.services;

import java.util.ArrayList;

import com.App.PatientHealth.domain.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.App.PatientHealth.repository.AdminRepository;
import com.App.PatientHealth.repository.DoctorRepository;
import com.App.PatientHealth.repository.PatientRespository;
import com.App.PatientHealth.repository.UserRepository;


public class UserDetailsServiceImpl implements UserDetailsService{

    @Autowired
    UserRepository userRepo;

    @Autowired
    DoctorRepository docRepo;

    @Autowired
    PatientRespository pRepo;

    @Autowired
    AdminRepository aRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("\n***************** LoadByUsername Called**************");
		System.out.println(username);
		String password = null;
		User u =  null;
		u = userRepo.findByUsername(username);
		
		// OAuthUser oUser = null;
		
		// if (u == null) {
		// 	oUser = oauthRepo.findOAuthUserByEmail(username);
		// } else {
		// 	password = u.getPassword();
		// }
		
		// if (oUser != null) {
		// 	u = oUser.getUser();
		// 	password = encode("oauth");
		// }
		boolean enabled = true;
		boolean accountNonExpired = true;
		boolean credentialsNonExpired = true;
		boolean accountNotLocked  = true;
		
		ArrayList<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		String role = u.getRole();
		System.out.println("********ROLE******: "+ role);
		System.out.println(role+" created and granted authority.");
		
		authorities.add(new SimpleGrantedAuthority("ROLE_"+role));
		
		System.out.println("*********Username*********: " +u.getUsername());
		
		/*Authentication Manager will then try to make sure 
		 * that details submitted match these details that are being returned*/
		return new org.springframework.security.core.userdetails.User(
				u.getUsername(),
				password,
				enabled, 
				accountNonExpired,
				credentialsNonExpired, 
				accountNotLocked,
				authorities
				);
    }


    public UserRepository getUserRepo() {
        return this.userRepo;
    }

    public DoctorRepository getDocRepo() {
        return this.docRepo;
    }

    public PatientRespository getPRepo() {
        return this.pRepo;
    }

    public AdminRepository getARepo() {
        return this.aRepo;
    }

    
}
