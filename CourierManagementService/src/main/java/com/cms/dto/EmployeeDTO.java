package com.cms.dto;

import com.cms.entities.BranchEntity;
import com.cms.entities.RoleEnum;
import lombok.Data;

@Data
public class EmployeeDTO {
	private Long id;
 	private String empName;
 	private RoleEnum empRole;
 	private String empUsername;
 	private String empPassword;
 	private String empEmail;
 	private String empPhone;
	private BranchEntity empBranch;

}
