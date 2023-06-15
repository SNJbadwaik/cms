package com.cms.dto;

import lombok.Data;

@Data
public class CustomerDTO {
	private String username;
	private String email;
	private String password;
	private AddressDTO customerAddress;
	private String phone;
	private String aadhaarNo;

}
