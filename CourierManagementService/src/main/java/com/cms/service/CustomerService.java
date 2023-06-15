package com.cms.service;

import com.cms.entities.CustomerEntity;

public interface CustomerService {
	CustomerEntity signUp(CustomerEntity customer);
	CustomerEntity getCustomerDetails(String email,String password);
	CustomerEntity getCustomer(Long c_id);
	void saveExistingCustomer(CustomerEntity customer);
    	
	CustomerEntity getByEmail(String email);
   	
	
 }
