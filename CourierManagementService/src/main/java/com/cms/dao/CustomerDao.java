package com.cms.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cms.entities.CustomerEntity;

@Repository
public interface CustomerDao extends JpaRepository<CustomerEntity, Long>{

	CustomerEntity findByEmailAndPassword(String email,String password);

	CustomerEntity findByEmail(String email);

}
