package com.cms.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cms.entities.BranchEntity;

public interface BranchDao extends JpaRepository<BranchEntity, Long> {

	BranchEntity findByBranchName(String branchname);

	BranchEntity findByBranchAddressPincode(String pincode);

//	branchAddress
 
}
