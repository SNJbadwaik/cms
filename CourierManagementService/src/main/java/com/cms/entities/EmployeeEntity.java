package com.cms.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

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
public class EmployeeEntity extends BaseEntity {
	@Column(length = 30)
	private String empName;
	@Enumerated(EnumType.STRING)
	private RoleEnum empRole;
	@Column(length = 25)
	private String empUsername;
	@Column(length = 100)
	private String empPassword;
	@Column(length = 25)
	private String empEmail;
	@Column(length = 10)
	private String empPhone;
	
//	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "empBranch")
	private BranchEntity empBranch;
	
	 

	@JsonIgnore
	@OneToMany(mappedBy ="pickupBoy",cascade = CascadeType.ALL)
	private List<CourierEntity> allCouriers=new ArrayList<>();

	//GAVIN KING HELPER
	public void addCourierHelper(CourierEntity courier) {
		this.allCouriers.add(courier);
		courier.setPickupBoy(this);
	}
	
	//GAVIN KING HELPER TO ADD SET RECEIVER OF COURIER
	public void addCourierHelper2(CourierEntity courier) {
		this.allCouriers.add(courier);
		courier.setDeliveryBoy(this);
	}
	 
	
	
}
