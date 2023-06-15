package com.cms.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

import com.cms.dto.BranchDTO;
import com.cms.dto.EmployeeDTO;
import com.cms.entities.BranchEntity;
import com.cms.entities.CourierEntity;
import com.cms.entities.EmployeeEntity;
import com.cms.entities.FeedbackEntity;
import com.cms.entities.RoleEnum;
import com.cms.entities.StatusEnum;
import com.cms.service.BranchService;
import com.cms.service.CourierService;
import com.cms.service.EmployeeService;
import com.cms.service.FeedbackService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin")
public class AdminController {
	
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

	@GetMapping("/getallbranches")
	public ResponseEntity<List<BranchEntity>> getAllBranches() {
		List<BranchEntity> branchlist=branchService.findAllBranches();
 		return ResponseEntity.ok().body(branchlist);
	}	
	
	@PostMapping("/addbranch")
	public ResponseEntity<BranchEntity> addBranch(@RequestBody BranchEntity branchEntity) {
 		System.out.println(branchEntity);
		BranchEntity branch =branchService.addBranch(branchEntity);		
 		return ResponseEntity.ok().body(branchEntity);
	}
 
 
	@PutMapping("/updatebranch")
	public ResponseEntity<?> updateBranch(@RequestBody BranchEntity branchtobeupdated ) {
		 	BranchEntity updatedBranch = branchService.updateBranch(branchtobeupdated);
		BranchDTO updatedBranchdto=modelMapper.map(updatedBranch, BranchDTO.class);
		return ResponseEntity.ok().body( updatedBranchdto);
	}
	@DeleteMapping("/deletebranch/{bid}")
	public String deleteBranch(@PathVariable Long bid) {
		
	     branchService.deleteBranch(bid);
		return "Branch Deleted Successfully!";		
		
	}
	
	//------------------------------------------GET--getallemployee ---------------------------------------------
	@GetMapping("/getallemployees")
	public ResponseEntity<?> getAllEmployees(){
		List<EmployeeEntity>emplist=employeeService.findAllEmployees();
//		System.out.println("sending these employees==========================> " +emplist.toString());
		List <EmployeeEntity> emplist2 =emplist.stream().filter(emp->emp.getEmpRole()!=RoleEnum.valueOf("ADMIN")).collect(Collectors.toList());
		List<EmployeeDTO> empdtolist=emplist2.stream().map(emp->modelMapper.map(emp, EmployeeDTO.class)).collect(Collectors.toList());
		return ResponseEntity.ok().body(empdtolist);
	}
	
	//------------------------------------------GET--addemployee/Addemployee---------------------------------------------
	@GetMapping("/getallbranchnamesandid")
	public ResponseEntity<List<BranchEntity>> addnewEmployee(){		 
		return ResponseEntity.ok().body(branchService.findAllBranches());
	}
	
   //-------------------------------------------addemployee/branch---------------------------------------------
	@PostMapping("/addemployee/{branchid}")
	public ResponseEntity<EmployeeEntity> addEmployee(@RequestBody EmployeeEntity employee, @PathVariable Long branchid) {
		BranchEntity branch1=branchService.getBranch(branchid);
		employee.setEmpBranch(branch1);
		return  ResponseEntity.ok().body(employeeService.addEmployee(employee));
 	}

	//------------------------------------------- Update Employee ---------------------------------------------
	@PostMapping("/updateemployee/{empid}")
	public ResponseEntity<EmployeeEntity>updateEmployee(@RequestBody EmployeeEntity employeetoupdate,@PathVariable Long empid){
 		return ResponseEntity.ok().body(employeeService.updateEmp(empid,employeetoupdate));
	}
	
	//------------------------------------------- Delete Employee ---------------------------------------------
	@DeleteMapping("/deleteEmployee/{empid}")
	public String deleteEmployee(@PathVariable Long empid){
		employeeService.deleteEmployee(empid);
		return "employee deleted Successfully";
	}
	
	//------------------------------------------- ALL ABOUT COURIERS ------------------------------------------------------
	@GetMapping("/getallcouriers")
	public ResponseEntity<List<CourierEntity>> getAllCouriers() {		
		return ResponseEntity.ok().body(courierService.findAll());
 	}
	
	//---------------------------------------------- GET COURIERS BY STATUS --------------------------------------------------------
	@GetMapping("/getcouriersbystatus/{status}")
	public ResponseEntity<List<CourierEntity>> getCouriersByStatus(@PathVariable String status){
		StatusEnum statusEnum =StatusEnum.valueOf(status.toUpperCase());
 		return ResponseEntity.ok().body(courierService.findCouriersByStatus(statusEnum));
	}	
	
	//---------------------------------------------- CHANGE STATUS --------------------------------------------------------
	@PutMapping("/updateCourierStatus/{courierId}")
	public  ResponseEntity<CourierEntity> changeCourierStatus(@PathVariable Long courierId) {
		
	   return ResponseEntity.ok().body(courierService.updateCourierStatus(courierId));
		 
	}
	//----------------------------------------------- MANAGE FEEDBACK ---------------------------------------------------
	@GetMapping("/feedbacks")
	public ResponseEntity<?> getAllFeedbacks(){
		List<FeedbackEntity> list=feedbackService.findAllFeedback();
//		List<FeedbackDTO> feedbacklist= list.stream().map(feedback->modelMapper.map(feedback,FeedbackDTO.class)).collect(Collectors.toList());
		return ResponseEntity.ok().body(list);
	}
	//---------------------------------------------- READ FEEDBACK ----------------------------------------------------
	@PutMapping("/readfeedback/{feedbackid}")
	public ResponseEntity<?> readFeedback(@PathVariable Long feedbackid) {
		feedbackService.changeFeedbackStatus(feedbackid);
		
		return ResponseEntity.ok().body("read_successfully");
	}
	
	
 	
}
