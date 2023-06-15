package com.cms.entities;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
public class CourierEntity extends BaseEntity {
	@ToString.Exclude
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "customer")
	private CustomerEntity customer;

	@ToString.Exclude
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "receiver")
	private ReceiverEntity receiver;

	@Enumerated(EnumType.STRING)
	private CategoryEnum courierCategory;

	@Enumerated(EnumType.STRING)
	private SizeEnum courierSize;

	@Enumerated(EnumType.STRING)
	private TypeEnum courierType;

	@Column(length = 10)
	private int courierWeight;

	@Column(length = 10)
	private int courierAmount;

	@Enumerated(EnumType.STRING)
	private PayModeEnum paymentMode;

	@Temporal(TemporalType.DATE)
	@CreationTimestamp
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date courierOdate;

	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date courierDdate;

	@Enumerated(EnumType.STRING)
	private StatusEnum courierStatus=StatusEnum.valueOf("NEW");

	@ToString.Exclude
  	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "orderBranch")
	private BranchEntity orderBranch;
	
	@ToString.Exclude
  	@ManyToOne
	@JoinColumn(name = "deliveryBranch")
	private BranchEntity deliveryBranch;

	@ToString.Exclude
  	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "pickupBoy")
	private EmployeeEntity pickupBoy;
	
	@ToString.Exclude
  	@ManyToOne
	@JoinColumn(name = "deliverBoy")
	private EmployeeEntity deliveryBoy;

}
