package com.cms.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
public class FeedbackEntity extends BaseEntity{
	@Column(length=150)
	private String message;	
	
	private Boolean feedbackStatus=true;
  
	@Temporal(TemporalType.DATE)
	@CreationTimestamp
 	private Date feedbackDate;
	
	@ManyToOne
	@JoinColumn(name="customer")
	private CustomerEntity customer;
}
