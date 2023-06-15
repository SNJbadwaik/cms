package com.cms.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cms.entities.ReceiverEntity;

@Repository
public interface ReceiverDao extends JpaRepository<ReceiverEntity, Long> {

}
