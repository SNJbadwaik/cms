package com.cms.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cms.entities.CourierEntity;
import com.cms.entities.EmployeeEntity;
import com.cms.entities.StatusEnum;
import com.cms.service.CourierService;
import com.cms.service.EmployeeService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/dboy")
public class DeliveryBoyController {

	@Autowired
	CourierService courierService;

	@Autowired
	EmployeeService employeeService;

	@GetMapping("/getAllCouriersByEmpId/{empId}")
	public ResponseEntity<?> getCouriersByEmployeeId(@PathVariable Long empId) {
		EmployeeEntity emp = employeeService.findEmpById(empId);
		System.out.println(emp);
		return new ResponseEntity<>(courierService.getAllCouriersByEmpId(empId), HttpStatus.OK);
	}
	
 
	@GetMapping("/getAllOrdersToBePickedUp/{empId}")
	public ResponseEntity<List<CourierEntity>> getAllOrdersToBePickedUp(@PathVariable long empId) {
		return ResponseEntity.ok().body(employeeService.getAllCouriersToBePickedUp(empId));
	}
	@GetMapping("/getAllOrdersToBeDelivered/{empId}")
	public ResponseEntity<List<CourierEntity>> getAllOrdersToBeDelivered(@PathVariable long empId) {
		return ResponseEntity.ok().body(employeeService.getAllCouriersToBeDelivered(empId));
	}
	
	//***************************************** EROR*****************************************
	@GetMapping("/pickupcourier/{pboy_id}/{courier_id}")
	public ResponseEntity<?> pickedUpCourier(@PathVariable Long pboy_id,@PathVariable Long courier_id){
		
		employeeService.pickedUpCourier(pboy_id,courier_id);
 		return ResponseEntity.ok().body("picked up successfully and status has been updated ");
	}
	
//	//------get status from request parameter using query 
//	@PutMapping("/courierdelivered/{courierId}")
//	public CourierEntity updateCourierStatus(@PathVariable @Valid long courierId) {
//		System.out.println("in update of courier dtls" + courierId);
//		return courierService.updateCourierStatus(courierId);
//	}
	
	//------change status from READY_TO_PICKED_UP to PICKED_UP 
	@PutMapping("/courierpickedup/{courierId}")
	public ResponseEntity<?> changeStatusToPickedUp(@PathVariable @Valid long courierId) {
		System.out.println("in update of courier dtls" + courierId);
		 courierService.changeStatusToPickedUp(courierId);
		 return ResponseEntity.ok().body("status changed successfully");
	}
	
	
	//------change status from READY_TO_DELIVERED to DELIVERED 
	@PutMapping("/courierdelivered/{courierId}")
	public ResponseEntity<?> changeStatusToDelivered(@PathVariable @Valid long courierId) {
		System.out.println("in update of courier dtls" + courierId);
		courierService.changeStatusToDelivered(courierId);
		return ResponseEntity.ok().body("status changed successfully");
	}
	

}
