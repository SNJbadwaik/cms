package com.cms.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cms.entities.EmployeeEntity;
import com.cms.entities.RoleEnum;

@Repository
public interface EmployeeDao extends JpaRepository<EmployeeEntity, Long> {
//	List<EmployeeEntity> findAllByEmpBranchId(Long branchId);

//	List<EmployeeEntity> findAllByEmpBranchIdAndEmpRole(Long branchid);

	List<EmployeeEntity> findAllByEmpBranchIdAndEmpRole(Long branchid, RoleEnum string);

	EmployeeEntity findByEmpEmail(String email);

	List<EmployeeEntity> findByEmpBranchId(Long bid);

}
