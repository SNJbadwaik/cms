package com.cms.service;

import java.util.List;

import javax.validation.Valid;

import com.cms.entities.CourierEntity;
import com.cms.entities.StatusEnum;

public interface CourierService {
	CourierEntity addCourier(CourierEntity courier);

	CourierEntity getCourier(Long c_id);

	List<CourierEntity> getAllCouriersByEmpId(Long empId);

	List<CourierEntity> getAllOrdersToBePickedUp(long empId, StatusEnum status);

	List<CourierEntity> getAllOrdersToBeDelivered(long empId, StatusEnum status);

	CourierEntity updateCourierStatus(long courierId);

	List<CourierEntity> findAll();

	List<CourierEntity> findCouriersByStatus(StatusEnum status);

	CourierEntity allotPickupBoy(Long courierid, Long pickupboyid);
	
	CourierEntity allotDeliveryBoy(Long courierid, Long deliveryboyid);
	
	List<CourierEntity> getAllCouriersByOrderBranch(Long branchId);
	
	List<CourierEntity> getAllCouriersByDeliveryBranch(Long branchId);

	CourierEntity changeStatusToPickedUp(@Valid long courierId);

	CourierEntity changeStatusToDelivered(@Valid long courierId);

	List<CourierEntity> getAllCouriersByBranchId(long branchId);

 
	

}
