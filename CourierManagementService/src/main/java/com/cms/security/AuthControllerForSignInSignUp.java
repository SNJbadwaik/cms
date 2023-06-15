package com.cms.security;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cms.entities.CustomerEntity;
import com.cms.entities.EmployeeEntity;
import com.cms.service.CustomerService;
import com.cms.service.EmployeeService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@Slf4j
public class AuthControllerForSignInSignUp {
//dep : JWT utils : for generating JWT
	@Autowired
	private JwtUtils utils;

	@Autowired
	private CustomerService customerService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	// dep : Auth mgr
	@Autowired
	private AuthenticationManager manager;
	// dep : user service for handling users

	@Autowired
	private EmployeeService employeeService;

	// add a method to authenticate user In case of success --send back token
	// otherwise - send back err message

	@PostMapping("/signin")
	public ResponseEntity<?> validateUserCreateToken(@RequestBody @Valid AuthRequest request) {
		System.out.println(request.toString());
		// store incoming user details(not yet validated) into Authentication object
		// Authentication i/f ---> implemented by UserNamePasswordAuthToken
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.getEmail(),
				request.getPassword());
		log.info("auth token before {}", authToken);
		try {
			// authenticate the credentials
			Authentication authenticatedDetails = manager.authenticate(authToken);
			log.info("auth token again {} ", authenticatedDetails);

			////////////////////////////////// updated--27/02/23
			////////////////////////////////// ////////////////////////////////////////////
			////////////////////////////////// //////////////////////////////////////////////////////////////

			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", "Auth successful");
			map.put("token", utils.generateJwtToken(authenticatedDetails));
			EmployeeEntity authEmp = employeeService.getByEmpEmail(request.getEmail());
			CustomerEntity authCustomer = customerService.getByEmail(request.getEmail());
			if (authEmp != null) {
				return ResponseEntity.ok(
						new AuthResp("Auth successful!", utils.generateJwtToken(authenticatedDetails), authEmp, null));
			} else // if (authCustomer!=null)
			{
				return ResponseEntity.ok(new AuthResp("Auth successful!", utils.generateJwtToken(authenticatedDetails),
						null, authCustomer));
			}
		} catch (BadCredentialsException e) {
			// send back err resp code
			System.out.println("err " + e);
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("status", "INVALID CREDENTIALS");
			return ResponseEntity.ok(errorMap);
		}
	}

	// add request handling method for user registration
	@PostMapping("/signup")
	public ResponseEntity<?> userRegistration(@RequestBody @Valid CustomerEntity customer) {
		System.out.println("in reg customer : customer " + customer + " roles " + "CUSTOMER");
		// save the encoded password in the data base usng password encoder ------------
		customer.setPassword(passwordEncoder.encode(customer.getPassword()));
		// invoke service layer method , for saving : user info + associated roles info
		return ResponseEntity.status(HttpStatus.CREATED).body(customerService.signUp(customer));
	}
}
