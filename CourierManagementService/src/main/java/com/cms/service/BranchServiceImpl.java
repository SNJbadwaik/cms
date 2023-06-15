package com.cms.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.dao.AddressDao;
import com.cms.dao.BranchDao;
import com.cms.dao.CourierDao;
import com.cms.dao.EmployeeDao;
import com.cms.entities.AddressEntity;
import com.cms.entities.BranchEntity;
import com.cms.entities.CourierEntity;
import com.cms.entities.EmployeeEntity;
import com.cms.entities.StatusEnum;

@Service
@Transactional
public class BranchServiceImpl implements BranchService {

	@Autowired
	private BranchDao branchDao;
	
	@Autowired
	private CourierDao courierDao;
	
	@Autowired
	private AddressDao addressDao;
	
	@Autowired
	private EmployeeDao employeeDao;
	@Override
	public List<BranchEntity> findAllBranches() {

		return branchDao.findAll();
	}

	@Override
	public BranchEntity addBranch(BranchEntity branch) {
 
		return branchDao.save(branch);
	}

	@Override
	public BranchEntity updateBranch(BranchEntity branchtobeupdated) {
		BranchEntity ExistingBranch =branchDao.findById(branchtobeupdated.getId()).get();
		ExistingBranch.setBranchAddress(branchtobeupdated.getBranchAddress());
 		ExistingBranch.setBranchName(branchtobeupdated.getBranchName());
		
		BranchEntity updatedBranch = branchDao.save(ExistingBranch);
		return updatedBranch;
	}

 
	@Override
	public void deleteBranch(Long bid) {
	    BranchEntity branch = branchDao.findById(bid).get();
	    List<EmployeeEntity> emplist =employeeDao.findByEmpBranchId(bid);
	    for(EmployeeEntity emp : emplist ) {
	    	emp.setEmpBranch(null);
	    	employeeDao.delete(emp);
	    }
 	    for(CourierEntity courier : branch.getAllCouriers()) {
	        courier.setOrderBranch(null);
	        courier.setDeliveryBranch(null);
	        courierDao.delete(courier);
	    }
	    branch.setAllCouriers(null);

	    
	    AddressEntity branchAddress = branch.getBranchAddress();
	    if (branchAddress != null) {
	        addressDao.delete(branchAddress);
	        branch.setBranchAddress(null);
	    }

 	    branchDao.deleteById(bid);
	}



	@Override
	public BranchEntity getBranch(Long branch) {
		return branchDao.findById(branch).get();
	}

	@Override
	public BranchEntity findByPIn(String pincode) {
 		return branchDao.findByBranchAddressPincode(pincode);
 		}

	@Override
	public List<CourierEntity> getAllPickedUpCouriersOfBranch(Long branchid) {
		  BranchEntity branch =branchDao.findById(branchid).get();
		 List<CourierEntity> list = branch.getAllCouriers()
				 .stream()
				 .filter(s->s.getCourierStatus()==StatusEnum.valueOf("PICKED_UP"))
				 .collect(Collectors.toList());
		return list;
	}

	@Override
//	public List<CourierEntity> getAllIntransitCouriersOfBranch(Long branchid) {
//		BranchEntity branch =branchDao.findById(branchid).get();
//		List<CourierEntity> list = branch.getAllCouriers()
//				.stream()
//				.filter(s->(s.getCourierStatus().equals(StatusEnum.INTRANSIT)))
//				.collect(Collectors.toList());
//		return list;
//		
// 	}
	public List<CourierEntity> getAllIntransitCouriersOfBranch(Long branchid) {

		List<CourierEntity> list = courierDao.findAll()
				.stream()
				.filter(s->(s.getCourierStatus().equals(StatusEnum.INTRANSIT))&&(s.getDeliveryBranch().getId().equals(branchid)))
				.collect(Collectors.toList());
		return list;
		
	}

	@Override
	public Map<String, Boolean> checkAvailability(String spin, String rpin) {
		BranchEntity sbranch = branchDao.findByBranchAddressPincode(spin);
		BranchEntity rbranch = branchDao.findByBranchAddressPincode(rpin);
		Map<String,Boolean> map=new LinkedHashMap<>();
 		if(sbranch!=null) {
 			map.put(spin, true); 			
 		}
 		if(rbranch!=null) {
 			map.put(rpin, true); 			
 		}
 		return map;
 		
	}
//------------------------get branch by branch id-------------------------
	@Override
	public BranchEntity getBranchByBranchId(Long branchid) {
		return branchDao.findById(branchid).get();
	}
  
}
