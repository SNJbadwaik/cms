package com.cms.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cms.dao.CustomerDao;
import com.cms.dao.EmployeeDao;
import com.cms.entities.CustomerEntity;
import com.cms.entities.EmployeeEntity;

@Service // or @Component also works!
@Transactional

public class CustomUserDetailsService implements UserDetailsService {
	// dep : user repository : based upon spring data JPA
	@Autowired
	private CustomerDao customerRepo;
	@Autowired
	private EmployeeDao employeeRepo;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		System.out.println("in load by user nm " + email);
		// invoke dao's method to load user details from db by username(ie. actaully an
		// email)
		EmployeeEntity employee = employeeRepo.
				findByEmpEmail(email);
		System.out.println("Employee details from database " + employee);
		CustomerEntity customer = customerRepo
				.findByEmail(email);
		System.out.println("Customer details from database " + customer);
		if(employee == null)
		{
			if(customer != null)
			{
				return new CustomUserDetails(customer);
			}
			else
			{
				throw new UsernameNotFoundException("Invalid email!!!");
			}
		}
		return new CustomUserDetails(employee);
	}

}
