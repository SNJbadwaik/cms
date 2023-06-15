package com.cms.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.dao.CustomerDao;
import com.cms.entities.CustomerEntity;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService{

	@Autowired
	private CustomerDao customerDao;
	
	
	//-------------------------signUp------------------------------------------
	@Override
	public CustomerEntity signUp(CustomerEntity customer) {
		
		return customerDao.save(customer);
	}
	
	//------------------------getCustomerDetails-----------------------------------
	@Override
	public CustomerEntity getCustomerDetails(String email,String password) {
		
		return customerDao.findByEmailAndPassword(email,password);
	}

	//------------------------getCustomer------------------------------------------
	@Override
	public CustomerEntity getCustomer(Long c_id) {
		
		return customerDao.findById(c_id).get();
	}

	@Override
	public void saveExistingCustomer(CustomerEntity customer) {
		 customerDao.save(customer);
	}

	 

	//----------------------------get by email id--------------------------------
	@Override
	public CustomerEntity getByEmail(String email) {
		
		return customerDao.findByEmail(email);
	}

	 
}
