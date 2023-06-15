package com.cms.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cms.dto.CustomerDTO;
import com.cms.entities.CustomerEntity;
import com.cms.service.AddressService;
import com.cms.service.CustomerService;

@CrossOrigin

@RestController
@RequestMapping("/")
public class SignInSignUpController {
	
	@Autowired
	ModelMapper modelMapper;
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private AddressService addressService;

	@PostMapping("signup")
	public String signUp(@RequestBody CustomerDTO customerdto) {
		
 		CustomerEntity customer = modelMapper.map(customerdto,CustomerEntity.class);
 		
		addressService.insertAddress(customer.getCustomerAddress());
		
		CustomerEntity registeredCustomer=customerService.signUp(customer);
		
		//CustomerDTO registerdCustomerDto=modelMapper.map(registeredCustomer, CustomerDTO.class);
		//DONT NEED TO PASS THIS DTO TO THE CLIENT
		
		return "signup successfull ---> go to login page ";
	}
	
	@PostMapping("signin")
	public String signIn(@RequestBody CustomerDTO customerDto) {
		CustomerEntity  customer=modelMapper.map(customerDto, 	CustomerEntity.class);
 		
		CustomerEntity  authenticatedCustomer=customerService.getCustomerDetails(customer.getEmail(), customer.getPassword());
		if(authenticatedCustomer==null)return "NO user found";
		CustomerDTO authenticatedCustomerDto=modelMapper.map(authenticatedCustomer, CustomerDTO.class);

		return "I found Customer In Database...."+authenticatedCustomerDto.toString();
	}
}
