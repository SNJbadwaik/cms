package com.cms.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cms.entities.BranchEntity;
import com.cms.entities.CourierEntity;
import com.cms.entities.EmployeeEntity;
import com.cms.entities.RoleEnum;
import com.cms.entities.StatusEnum;
import com.cms.service.BranchService;
import com.cms.service.CourierService;
import com.cms.service.EmployeeService;
import com.cms.service.FeedbackService;

@CrossOrigin
@RestController
@RequestMapping("/branchadmin")
public class BranchAdminController {

	@Autowired
	BranchService branchService;

	@Autowired
	EmployeeService employeeService;

	@Autowired
	ModelMapper modelMapper;

	@Autowired
	CourierService courierService;

	@Autowired
	FeedbackService feedbackService;

	// ----------------------------GET--getallemployee-------------------------------------------
	@GetMapping("/getallemployees")
	public String getAllEmployees() {
		List<EmployeeEntity> emplist = employeeService.findAllEmployees();
		return emplist.toString();
	}

	// ------------------------------------------GET--addemployee/Addemployee---------------------------------------------
	@GetMapping("/addemployee")
	public ResponseEntity<Map<String, Object[]>> addnewEmployee() {
		Map<String, Object[]> map = new HashMap<>();
		map.put("branches", branchService.findAllBranches().toArray());
		map.put("roles", RoleEnum.values());
		return ResponseEntity.ok().body(map);
	}

	// -------------------------------------------addemployee/branch---------------------------------------------
	@PostMapping("/addemployee/{branchid}")
	public ResponseEntity<EmployeeEntity> addEmployee(@RequestBody EmployeeEntity employee,
			@PathVariable Long branchid) {
		BranchEntity branch1 = branchService.getBranch(branchid);
		employee.setEmpBranch(branch1);
		return ResponseEntity.ok().body(employeeService.addEmployee(employee));
	}

	// ---------------------------------- - Update
	// Employee-------------------------------------
	@PostMapping("/updateemployee/{empid}")
	public ResponseEntity<EmployeeEntity> updateEmployee(@RequestBody EmployeeEntity employeetoupdate,
			@PathVariable Long empid) {
//		employeetoupdate.setEmpPassword(passwordEncoder.encode(employeetoupdate.getEmpPassword()));
		return ResponseEntity.ok().body(employeeService.updateEmp(empid, employeetoupdate));
	}

	// ------------------------------------------- Delete
	// Employee--------------------------------
	@DeleteMapping("/deleteEmployee/{empid}/{branchid}")
	public String deleteEmployee(@PathVariable Long empid, @PathVariable Long branchid) {
		EmployeeEntity emp = employeeService.findEmpById(empid);
		if (emp != null) {
			for (CourierEntity cr : emp.getAllCouriers()) {
				cr.setDeliveryBoy(null);
				cr.setPickupBoy(null);
			}
			emp.setEmpBranch(null);
		}
		employeeService.deleteEmployee(empid);
		return "employee deleted Successfully";
	}

	// ----------------------------------------ALL
	// COURIERS----------------------------------
	// here we are getting all the couriers but we need couriers related to this
	// branch only
	@GetMapping("/getallcouriers")
	public ResponseEntity<List<CourierEntity>> getAllCouriers() {
		return ResponseEntity.ok().body(courierService.findAll());
	}

	// ----------------------------------- ALL COURIERS BY ORDER
	// BRANCH-------------------------
	@GetMapping("/getallcouriersbyorderbranch/{branchid}")
	public ResponseEntity<List<CourierEntity>> getAllCouriersByOrderBranch(@PathVariable Long branchid) {
		// return ResponseEntity.ok().body(courierService.findAll());
		List<CourierEntity> list = courierService.getAllCouriersByOrderBranch(branchid);
		return ResponseEntity.ok().body(list);
	}

	// ----------------------------------- ALL COURIERS BY DELIVERY
	// BRANCH-----------------------
	@GetMapping("/getallcouriersbydeliverybranch/{branchid}")
	public ResponseEntity<List<CourierEntity>> getAllCouriersByDeliveryBranch(@PathVariable Long branchid) {
		// return ResponseEntity.ok().body(courierService.findAll());
		List<CourierEntity> list = courierService.getAllCouriersByDeliveryBranch(branchid);
		return ResponseEntity.ok().body(list);
	}

	// ------------------------------------- GET COURIERS BY
	// STATUS----------------------------
	@GetMapping("/getcouriersbystatus/{status}")
	public ResponseEntity<List<CourierEntity>> getCouriersByStatus(@PathVariable String status) {
		StatusEnum statusEnum = StatusEnum.valueOf(status.toUpperCase());
		return ResponseEntity.ok().body(courierService.findCouriersByStatus(statusEnum));
	}

	// ------------------------------------GET ALL COURIERS WHICH ARE PICKED
	// UP----------------------
	// Once courier is picked up --> branch admin will change its status to
	// intransit
	@GetMapping("/getallpickedupcouriers/{branchid}")
	public ResponseEntity<List<CourierEntity>> getAllPickedUpCouriersOfBranch(@PathVariable Long branchid) {
		List<CourierEntity> list = branchService.getAllPickedUpCouriersOfBranch(branchid);
		return ResponseEntity.ok().body(list);
	}

	// --------------------------------------CHANGE STATUS TO
	// INTRANSIT--------------------------
	// change status of all picked_Up couriers to INTRANSIT
	@PutMapping("/changestatustointransit/{courierId}")
	public ResponseEntity<CourierEntity> changeStatusToIntransit(@PathVariable Long courierId) {
		CourierEntity c = courierService.updateCourierStatus(courierId);
		return ResponseEntity.ok().body(c);
	}

	// ----------------------------------GET ALLCOURIERS WHICH ARE INTRANSIT
	// ----------------
	@GetMapping("/getallintransitcouriers/{branchid}")
	public ResponseEntity<List<CourierEntity>> getAllIntransitCouriersOfBranch(@PathVariable Long branchid) {
		List<CourierEntity> list = branchService.getAllIntransitCouriersOfBranch(branchid);
		// once courier is intransit its next flow is maintained by receiving branch...
		// get all intransit couriers whose receiveing branch is this branch
		return ResponseEntity.ok().body(list);
	}

	// ----------------------------------- CHANGE
	// STATUS--------------------------------------
	@PutMapping("/updateCourierStatus/{courierId}")
	public ResponseEntity<CourierEntity> changeCourierStatus(@PathVariable Long courierId) {

		return ResponseEntity.ok().body(courierService.updateCourierStatus(courierId));
	}

	// ------------------------------------- GET ALL PICKUP
	// BOY-----------------------------
	@GetMapping("/allotpickupboy/{branchid}")
	public ResponseEntity<List<EmployeeEntity>> getAllPickupBoysByBranch(@PathVariable Long branchid) {

		List<EmployeeEntity> pickupBoyList = employeeService.getAllPickupBoys(branchid);

		return ResponseEntity.ok().body(pickupBoyList);
	}

	// -------------------------------------- ALLOT PICKUP BOY
	// ---------------------------

	@PutMapping("/allotpickupboy/{courierid}/{pickupboyid}")
	public ResponseEntity<List<CourierEntity>> allotPickupBoyToCourier(@PathVariable Long courierid,
			@PathVariable Long pickupboyid) {
		//return ResponseEntity.ok().body(courierService.allotPickupBoy(courierid, pickupboyid));
		courierService.allotPickupBoy(courierid, pickupboyid);
		// we also need to change the status from new to ready_for_pickup

		EmployeeEntity pboy = employeeService.findEmpById(pickupboyid);
		return ResponseEntity.ok().body(pboy.getAllCouriers());

	}

	// ---------------------------------- GET ALL DELIVERY BOYS
	// ------------------------------------------
	@GetMapping("/allotdeliveryboy/{branchid}")
	public ResponseEntity<List<EmployeeEntity>> getAlldeliveryBoysByBranch(@PathVariable Long branchid) {

		List<EmployeeEntity> deliveryBoyList = employeeService.getAllDeliveryBoys(branchid);

		return ResponseEntity.ok().body(deliveryBoyList);
	}

	// ---------------------------------- ALLOT  DELIVERY
	// BOY------------------------------------------
	@PutMapping("/allotdeliveryboy/{courierid}/{deliveryboyid}")
	public ResponseEntity<List<CourierEntity>> allotDeliveryBoyToCourier(@PathVariable Long courierid,
			@PathVariable Long deliveryboyid) {
		courierService.allotDeliveryBoy(courierid, deliveryboyid);

		EmployeeEntity dboy = employeeService.findEmpById(deliveryboyid);
		return ResponseEntity.ok().body(dboy.getAllCouriers());

	}

	// ------ Get All Courier By Branch Id ----------------------
	@GetMapping("/getallcouriers/{branchId}")
	public ResponseEntity<?> getAllCouriers(@PathVariable long branchId) {
		return ResponseEntity.ok().body(courierService.getAllCouriersByBranchId(branchId));
	}

}
