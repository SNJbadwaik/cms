package com.cms.security;

import com.cms.entities.CustomerEntity;
import com.cms.entities.EmployeeEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
//@AllArgsConstructor
public class AuthResp {
	private String message;
	private String jwt;
	private EmployeeEntity emp;
	private CustomerEntity cust;
	
	public AuthResp(String message, String jwt, EmployeeEntity emp, CustomerEntity cust) {
		super();
		this.message = message;
		this.jwt = jwt;
		this.emp = emp;
		this.cust = cust;
	}
	
}
