package com.cms.entities;

import javax.persistence.Column;
import javax.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Setter
@Getter
@Entity
public class AddressEntity extends BaseEntity{
	@Column(name="building",length=50)
	private String building;
	
	@Column(length=50)
	private String street;
	
	@Column(length=50)
	private String landmark;
	
	@Column(length=20)
	private String city;
	
	@Column(length=6)
	private String pincode;
	
}
