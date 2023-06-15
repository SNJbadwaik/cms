package com.cms.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cms.dto.BranchDTO;
import com.cms.dto.CourierDTO;
import com.cms.dto.FeedbackDTO;
import com.cms.entities.BranchEntity;
import com.cms.entities.CategoryEnum;
import com.cms.entities.CourierEntity;
import com.cms.entities.CustomerEntity;
import com.cms.entities.FeedbackEntity;
import com.cms.service.AddressService;
import com.cms.service.BranchService;
import com.cms.service.CourierService;
import com.cms.service.CustomerService;
import com.cms.service.FeedbackService;
import com.cms.service.ReceiverService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/customer")
public class CustomerController {

//	@Autowired
//	AdminService adminService;

	@Autowired
	CustomerService customerService;

	@Autowired
	BranchService branchService;

	@Autowired
	CourierService courierService;

	@Autowired
	ReceiverService receiverService;

	@Autowired
	AddressService addressService;

	@Autowired
	FeedbackService feedbackService;

	@Autowired
	ModelMapper modelMapper;

	@GetMapping("/getallcouriers/{customerId}")
	public ResponseEntity<List<CourierEntity>> getAllCouriers(@PathVariable Long customerId) {
		CustomerEntity customer = customerService.getCustomer(customerId);
		return ResponseEntity.ok().body(customer.getAllCouriers());
	}

	@GetMapping("/sendcourier")
	public String sendCourier() {
		List<BranchEntity> branchList = branchService.findAllBranches();
		List<BranchDTO> branchdtolist = branchList.stream().map(branch -> modelMapper.map(branch, BranchDTO.class))
				.collect(Collectors.toList());

		CategoryEnum[] categoryList = CategoryEnum.values();
		System.out.println(branchdtolist + " " + categoryList);
		return branchdtolist + "  " + Arrays.toString(categoryList);
	}
 
	@GetMapping("/check/{spin}/{rpin}")
	public ResponseEntity<?> checkAvailability(@PathVariable String spin,@PathVariable String rpin){
		Map<String,Boolean> map =branchService.checkAvailability(spin,rpin);		
		return ResponseEntity.ok().body(map) ;
	}
	
	
	@PostMapping("/sendcourier/{spin}/{rpin}/{c_id}")
	public ResponseEntity<CourierEntity> sendCourier(@RequestBody CourierEntity courier, @PathVariable Long c_id,
			@PathVariable String spin,@PathVariable String rpin) {

		// adding courier to the List<couriers> in sender branch
		BranchEntity sbranch = branchService.findByPIn(spin);
		sbranch.addCourierHelper(courier);
		
		// adding courier to the List<couriers> in receiver branch
		BranchEntity rbranch = branchService.findByPIn(rpin);
		rbranch.addReceiverBranchCourierHelper(courier);

		// adding this courier to the List<couriers> in customer
		CustomerEntity customer = customerService.getCustomer(c_id);
		customer.addCourierHelper(courier);
		
		
		customerService.saveExistingCustomer(customer);
		
		CourierEntity courieradded =customer.getAllCouriers().get(customer.getAllCouriers().size()-1);

		return ResponseEntity.ok().body(courieradded);
	}

	@PostMapping("/feedback/{c_id}")
//			public ResponseEntity<List<FeedbackEntity>> addfeedback(@RequestBody FeedbackEntity feedbackEntity,
	public ResponseEntity<FeedbackDTO> addfeedback(@RequestBody FeedbackEntity feedbackEntity,
			@PathVariable Long c_id) {

		CustomerEntity customer = customerService.getCustomer(c_id);
		customer.addFeedbackHelper(feedbackEntity);
		customerService.saveExistingCustomer(customer);

		FeedbackDTO feedbackdto = modelMapper.map(feedbackEntity, FeedbackDTO.class);
		return ResponseEntity.ok().body(feedbackdto);
		// return ResponseEntity.ok().body(customer.getAllFeedbacks());
	}

	@PostMapping("/trackcourier")
	public ResponseEntity<CourierDTO> trackCourier(@RequestParam Long c_id) {
		CourierEntity courier = courierService.getCourier(c_id);
		CourierDTO courierdto = modelMapper.map(courier, CourierDTO.class);
		return ResponseEntity.ok().body(courierdto);
	}
}
