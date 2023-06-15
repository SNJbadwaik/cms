package com.cms.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cms.entities.CourierEntity;

import com.cms.entities.StatusEnum;

public interface CourierDao extends JpaRepository<CourierEntity, Long> {

//	List<CourierEntity> findAllByPickupBoy(EmployeeEntity emp);
	
	List<CourierEntity> findAllByOrderBranchId(Long branchId);
	
	List<CourierEntity> findAllByDeliveryBranchId(Long branchId);

	List<CourierEntity> findAllCourierByPickupBoyId(Long empId);

	List<CourierEntity> findByPickupBoyIdAndCourierStatus(long empId, StatusEnum status);

	List<CourierEntity> findByDeliveryBoyIdAndCourierStatus(long empId, StatusEnum status);

	List<CourierEntity> findAllByPickupBoyIdOrDeliveryBoyId(Long empId,Long empId1);

	List<CourierEntity> findAllByCourierStatus(StatusEnum status);

}
