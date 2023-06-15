package com.cms.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
public class ReceiverEntity extends BaseEntity {
	@Column(length=20)
	private String receiverName;
	
 	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="receiverAddress")
	private AddressEntity receiverAddress;
	
	@Column(length=12)
	private String receiverPhone;
	@Column(length=20)
	private String receiverEmail;
}
