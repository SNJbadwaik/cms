package com.cms.service;

import java.util.List;

import com.cms.entities.CourierEntity;
import com.cms.entities.EmployeeEntity;

public interface EmployeeService {

	List<EmployeeEntity> findAllEmployees();

	EmployeeEntity addEmployee(EmployeeEntity employee);

	EmployeeEntity updateEmp(Long empid, EmployeeEntity employeetoupdate);

	void deleteEmployee(Long empid);

	EmployeeEntity findEmpById(Long empId);

	List<EmployeeEntity> getAllPickupBoys(Long branchid);

	List<CourierEntity> getAllCouriersToBePickedUp(long empId);
	List<CourierEntity> getAllCouriersToBeDelivered(long empId);

	void pickedUpCourier(Long pickupBoyId, Long courier_id);

	List<EmployeeEntity> getAllDeliveryBoys(Long branchid);

	EmployeeEntity getByEmpEmail(String email);

}
