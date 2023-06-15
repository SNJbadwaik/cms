package com.cms.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cms.entities.FeedbackEntity;

@Repository
public interface FeedbackDao extends JpaRepository<FeedbackEntity, Long> {

}
