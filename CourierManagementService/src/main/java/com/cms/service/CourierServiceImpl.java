package com.cms.service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.dao.BranchDao;
import com.cms.dao.CourierDao;
import com.cms.dao.EmployeeDao;
import com.cms.entities.CourierEntity;
import com.cms.entities.EmployeeEntity;
import com.cms.entities.StatusEnum;

@Service
@Transactional
public class CourierServiceImpl implements CourierService {

	@Autowired
	private CourierDao courierDao;

	@Autowired
	private EmployeeDao employeeDao;

	@Autowired
	private BranchDao branchDao;

	// -------------------Add Courier---------------------------
	@Override
	public CourierEntity addCourier(CourierEntity courier) {

		return courierDao.save(courier);
	}

	// -------------------get Courier by customer id -------------------
	@Override
	public CourierEntity getCourier(Long c_id) {
		return courierDao.findById(c_id).orElseThrow(() -> new RuntimeException("Courier Not Found"));
	}

	// ---------------------get all courier by employee id ---------------------
	@Override
	public List<CourierEntity> getAllCouriersByEmpId(Long empId) {
		return courierDao.findAllByPickupBoyIdOrDeliveryBoyId(empId, empId);
	}

	// -------------------get all courier to be pickup by courier boy---------------
	@Override
	public List<CourierEntity> getAllOrdersToBePickedUp(long empId, StatusEnum status) {

		return courierDao.findByPickupBoyIdAndCourierStatus(empId, status);
	}

//----------------get all courier to be delivered by courier boy----------------
	@Override
	public List<CourierEntity> getAllOrdersToBeDelivered(long empId, StatusEnum statusCode) {

		return courierDao.findByDeliveryBoyIdAndCourierStatus(empId, statusCode);
	}

//------------------update courier status using courierId and status -------------
	@Override
	public CourierEntity updateCourierStatus(long courierId) {

		CourierEntity courier = courierDao.findById(courierId).get();
		StatusEnum status = courier.getCourierStatus();
//		courier.setCourierStatus(StatusEnum.values()[status.ordinal() + 1]);
		if (courier.getCourierStatus() == StatusEnum.valueOf("NEW"))
			courier.setCourierStatus(StatusEnum.valueOf("READY_FOR_PICKUP"));
		else if (courier.getCourierStatus() == StatusEnum.valueOf("READY_FOR_PICKUP"))
			courier.setCourierStatus(StatusEnum.valueOf("PICKED_UP"));
		else if (courier.getCourierStatus() == StatusEnum.valueOf("PICKED_UP"))
			courier.setCourierStatus(StatusEnum.valueOf("INTRANSIT"));
		else if (courier.getCourierStatus() == StatusEnum.valueOf("INTRANSIT"))
			courier.setCourierStatus(StatusEnum.valueOf("READY_TO_DELIVER"));
		else if (courier.getCourierStatus() == StatusEnum.valueOf("READY_TO_DELIVER"))
			courier.setCourierStatus(StatusEnum.valueOf("DELIVERED"));
		courierDao.save(courier);
		return courier;
	}

	// -----------------------------FIND ALL COURIERS
	// -------------------------------------------------
	@Override
	public List<CourierEntity> findAll() {
		return courierDao.findAll();
	}

	// -----------------------FIND COURIERS BY STATUS-------
	// -------------------------------------------------
	@Override
	public List<CourierEntity> findCouriersByStatus(StatusEnum status) {
		List<CourierEntity> list = courierDao.findAllByCourierStatus(status);
		return list;
	}

	// ------------------ALLOT PICKUP BOY TO COURIER------------------
	// -------------------------------------------------
	@Override
	public CourierEntity allotPickupBoy(Long courierid, Long pickupboyid) {
		CourierEntity courier = courierDao.findById(courierid).get();
		EmployeeEntity pickupboy = employeeDao.findById(pickupboyid).get();
		courier.setCourierStatus(StatusEnum.valueOf("READY_FOR_PICKUP"));
		pickupboy.addCourierHelper(courier);
		employeeDao.save(pickupboy);
		return courier;
	}

	// -----------------Get All Courier by Order Branch-----------------------
	@Override
	public List<CourierEntity> getAllCouriersByOrderBranch(Long branchId) {

		List<CourierEntity> list = branchDao.findById(branchId).get().getAllCouriers();
		List<CourierEntity> nlist = list.stream().filter((c) -> c.getCourierStatus().equals(StatusEnum.NEW))
				.collect(Collectors.toList());
		// System.out.println("---------------------------i was
		// executed-----------------------");
		return nlist;

	}

	@Override
	public List<CourierEntity> getAllCouriersByDeliveryBranch(Long branchId) {
		return (List<CourierEntity>) courierDao.findAllByDeliveryBranchId(branchId);
	}

	// -----------------------------ALLOT DELIVERY BOY TO COURIER
	// -------------------------------------------------
	@Override
	public CourierEntity allotDeliveryBoy(Long courierid, Long deliveryboyid) {
		CourierEntity courier = courierDao.findById(courierid).get();
		EmployeeEntity deliveryboy = employeeDao.findById(deliveryboyid).get();
		courier.setCourierStatus(StatusEnum.valueOf("READY_TO_DELIVER"));
		deliveryboy.addCourierHelper2(courier);
		employeeDao.save(deliveryboy);
		return courier;
	}

//---------------- CHANGE COURIER STATUS TO PICKED_UP-----------------------
	@Override
	public CourierEntity changeStatusToPickedUp(@Valid long courierId) {
		CourierEntity courier = courierDao.findById(courierId).get();
		courier.setCourierStatus(StatusEnum.PICKED_UP);
		return courier;
	}

//---------------- CHANGE COURIER STATUS TO DELIVERED-----------------------
	@Override
	public CourierEntity changeStatusToDelivered(@Valid long courierId) {
		CourierEntity courier = courierDao.findById(courierId).get();
		courier.setCourierDdate(new Date());
		courier.setCourierStatus(StatusEnum.DELIVERED);
		return courier;
	}

	// -----------------get all courier by branch id----------------------
	@Override
	public List<CourierEntity> getAllCouriersByBranchId(long branchId) {
		return courierDao.findAllByOrderBranchId(branchId);
	}

}
