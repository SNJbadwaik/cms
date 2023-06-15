package com.cms.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

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
public class BranchEntity extends BaseEntity{
	@Column(name="branch_name",length=20)
	private String branchName;
	
// 	@OneToOne(cascade = CascadeType.ALL)
//	private EmployeeEntity branchAdmin;	
	
	
 	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="branch_address")
	private AddressEntity branchAddress;
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL,mappedBy="orderBranch")
	private List<CourierEntity> allCouriers;

	// Gavin King -->
	public void addCourierHelper(CourierEntity newcourier) {
		allCouriers.add(newcourier);
		newcourier.setOrderBranch(this);
	}
	
	//Gavin King --> 
	public void addReceiverBranchCourierHelper(CourierEntity newcourier) {
		allCouriers.add(newcourier);
 		newcourier.setDeliveryBranch(this);
	}
	
	
	
	
}
