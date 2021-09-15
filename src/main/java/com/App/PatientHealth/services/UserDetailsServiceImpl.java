package com.App.PatientHealth.services;

import java.util.ArrayList;

import com.App.PatientHealth.domain.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.App.PatientHealth.repository.AdminPaging;
import com.App.PatientHealth.repository.AdminRepository;
import com.App.PatientHealth.repository.DoctorPaging;
import com.App.PatientHealth.repository.DoctorRepository;
import com.App.PatientHealth.repository.GmcRepository;
import com.App.PatientHealth.repository.PatientPaging;
import com.App.PatientHealth.repository.PatientRespository;
import com.App.PatientHealth.repository.UserPaging;
import com.App.PatientHealth.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

    @Autowired
    UserRepository userRepo;

    @Autowired
    DoctorRepository docRepo;

    @Autowired
    PatientRespository pRepo;

    @Autowired
    AdminRepository aRepo;

	@Autowired
	UserPaging userPaging;

	@Autowired
	AdminPaging adminPaging;

	@Autowired
	DoctorPaging doctorPaging;

	@Autowired
	PatientPaging patientPaging;

	@Autowired
	GmcRepository gRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("\n***************** LoadByUsername Called**************");
		System.out.println(username);
		// String password = null;
		User u =  null;
		u = userRepo.findByUsername(username);
		
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
				u.getPassword(),
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

	public UserPaging getUserPaging() {
		return userPaging;
	}

    public AdminPaging getAdminPaging() {
		return adminPaging;
	}

	public DoctorPaging getDoctorPaging() {
		return doctorPaging;
	}

	public PatientPaging getPatientPaging() {
		return patientPaging;
	}

	public GmcRepository getGRepo() {
		return gRepo;
	}
}
