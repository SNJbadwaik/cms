package com.cms.dto;

import java.util.Date;

import com.cms.entities.CategoryEnum;
import com.cms.entities.PayModeEnum;
import com.cms.entities.SizeEnum;
import com.cms.entities.StatusEnum;
import com.cms.entities.TypeEnum;

import lombok.Data;

@Data
public class CourierDTO {
	private CustomerDTO customer;

	private ReceiverDTO receiver;

	private CategoryEnum courierCategory;

	private SizeEnum courierSize;

	private TypeEnum courierType;

	private int courierWeight;

	private int courierAmount;

	private PayModeEnum paymentMode;

	private Date courierOdate;

	private Date courierDdate;

	private StatusEnum courierStatus;

	private BranchDTO orderBranch;

	private BranchDTO deliveryBranch;

	private EmployeeDTO pickupBoy;

	private EmployeeDTO deliveryBoy;

}
