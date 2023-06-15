package com.cms.service;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cms.dao.BranchDao;
import com.cms.dao.CourierDao;
import com.cms.dao.EmployeeDao;
import com.cms.entities.BranchEntity;
import com.cms.entities.CourierEntity;
import com.cms.entities.EmployeeEntity;
import com.cms.entities.RoleEnum;
import com.cms.entities.StatusEnum;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	EmployeeDao employeeDao;
	
	@Autowired
	CourierDao courierDao;

	@Autowired
	BranchDao branchDao;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	@Override
	public List<EmployeeEntity> findAllEmployees() {
		return employeeDao.findAll();

	}

	@Override
	public EmployeeEntity addEmployee(EmployeeEntity employee) {
		employee.setEmpPassword(passwordEncoder.encode(employee.getEmpPassword()));
		return employeeDao.save(employee);
	}

	@Override
	public EmployeeEntity updateEmp(Long empid, EmployeeEntity employeetoupdate) {
		EmployeeEntity emp = employeeDao.findById(empid).get();
		System.out.println(emp);
		emp.setEmpEmail(employeetoupdate.getEmpEmail());
		emp.setEmpName(employeetoupdate.getEmpName());
		emp.setEmpPassword(passwordEncoder.encode(employeetoupdate.getEmpPassword()));
		emp.setEmpPhone(employeetoupdate.getEmpPhone());
//		emp.setEmpRole(employeetoupdate.getEmpRole());
		emp.setEmpUsername(employeetoupdate.getEmpUsername());
		return employeeDao.save(emp);
	}

	@Override
	public void deleteEmployee(Long empid) {
		EmployeeEntity emp =employeeDao.findById(empid).get();
		emp.setEmpBranch(null);
		employeeDao.deleteById(empid);
	}

	public EmployeeEntity findEmpById(Long empId) {
		return employeeDao.findById(empId).get();

	}

	@Override
	public List<EmployeeEntity> getAllPickupBoys(Long branchid) {
		return employeeDao.findAllByEmpBranchIdAndEmpRole(branchid,RoleEnum.valueOf("DELIVERY_BOY"));
	}

	 
	@Override
	public List<CourierEntity> getAllCouriersToBePickedUp(long empId) {
 		   return employeeDao.findById(empId).get().getAllCouriers().stream().filter(c->c.getCourierStatus()==StatusEnum.valueOf("READY_FOR_PICKUP")).collect(Collectors.toList());
	}
	@Override
	public List<CourierEntity> getAllCouriersToBeDelivered(long empId) {
		return courierDao.findAll()
				.stream()
				.filter((c)->(c.getDeliveryBoy() !=null))
				.filter((c)->(c.getDeliveryBoy().getId()==empId))
				.filter(c->c.getCourierStatus()==StatusEnum.valueOf("READY_TO_DELIVER"))
				.collect(Collectors.toList());
	}
//	@Override
//	public List<CourierEntity> getAllCouriersToBeDelivered(long empId) {
//		return employeeDao.findById(empId).get()
//				.getAllCouriers()
//				.stream()
//				.filter(c->c.getCourierStatus()==StatusEnum.valueOf("READY_TO_DELIVER"))
//				.collect(Collectors.toList());
//	}

	@Override
	public void pickedUpCourier(Long pickupBoyId,Long courier_id) {
		EmployeeEntity pboy = employeeDao.findById(pickupBoyId).get();
		CourierEntity courier =courierDao.findById(courier_id).get();
		courier.setCourierStatus(StatusEnum.valueOf("PICKED_UP"));
			
		//remove  courier from pboys list < courier to pickup > 
 		pboy.getAllCouriers().remove(courier);
  		 		 
		 //remove  courier from orderbranch's list < courier to pickup > 
		 BranchEntity branch=courier.getOrderBranch();
 		 branch.getAllCouriers().remove(courier);
  		 
		 employeeDao.save(pboy);
 		 branchDao.save(branch);
		  
	}

	@Override
	public List<EmployeeEntity> getAllDeliveryBoys(Long branchid) {
		return employeeDao.findAllByEmpBranchIdAndEmpRole(branchid,RoleEnum.valueOf("DELIVERY_BOY"));
	}
		
	@Override
	public EmployeeEntity getByEmpEmail(String email) {
		
		return employeeDao.findByEmpEmail(email);
	}

}
