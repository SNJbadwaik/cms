package com.cms.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cms.entities.AddressEntity;

@Repository
public interface AddressDao extends JpaRepository<AddressEntity, Long>{

}
