package com.cms.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

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
@Table(name = "user")
public class CustomerEntity extends BaseEntity {
	@Column(length = 20)
	private String username;
	@Column(name = "email", length = 20, unique = true)
	private String email;
	@Column(name = "password", length = 100)
	private String password;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "customerAddress")
	private AddressEntity customerAddress;

	@Column(length = 10)
	private String phone;
	@Column(length = 12)
	private String aadhaarNo;

	@JsonIgnore
	@OneToMany(mappedBy = "customer",cascade = CascadeType.ALL )
	private List<CourierEntity> allCouriers=new ArrayList<>();
	
	@JsonIgnore
	@OneToMany(mappedBy="customer",cascade= CascadeType.ALL)
	private List<FeedbackEntity> allFeedbacks=new ArrayList<>();
	

//GAVIN KING --> HELPER METHOD
	public void addCourierHelper(CourierEntity courier) {
 		allCouriers.add(courier);
		courier.setCustomer(this);
	}
//GAVIN KING --> HELPER METHOD
	public void addFeedbackHelper(FeedbackEntity feedback) {
		allFeedbacks.add(feedback);
		feedback.setCustomer(this);
	}
	
	 
	
	
}
