package com.cms.service;

import java.util.List;
import java.util.Map;

import com.cms.entities.BranchEntity;
import com.cms.entities.CourierEntity;

public interface BranchService {
	
	List<BranchEntity> findAllBranches();

	BranchEntity addBranch(BranchEntity branch);

	BranchEntity updateBranch(BranchEntity branchtobeupdated);

	void deleteBranch(Long bid);

	BranchEntity getBranch(Long branch);

 
	BranchEntity findByPIn(String pincode);

	List<CourierEntity> getAllPickedUpCouriersOfBranch(Long branchid);

	List<CourierEntity> getAllIntransitCouriersOfBranch(Long branchid);

	Map<String,Boolean> checkAvailability(String spin, String rpin);

	BranchEntity getBranchByBranchId(Long branchid);
 
}
