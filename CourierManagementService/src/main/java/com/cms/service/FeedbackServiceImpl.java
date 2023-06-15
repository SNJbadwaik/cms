package com.cms.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.dao.FeedbackDao;
import com.cms.dto.FeedbackDTO;
import com.cms.entities.FeedbackEntity;


@Service
@Transactional

public class FeedbackServiceImpl implements FeedbackService{
	@Autowired
	private FeedbackDao feedbackDao;	
	
	@Override
	public FeedbackEntity addfeedback(FeedbackEntity feedback) {
		return 	feedbackDao.save(feedback);
	}

	@Override
	public List<FeedbackEntity> findAllFeedback() {
	
		return feedbackDao.findAll();
		 
	}

	@Override
	public void changeFeedbackStatus(Long feedbackid) {
		 FeedbackEntity feedback=feedbackDao.findById(feedbackid).get();
		 feedback.setFeedbackStatus(false);
		 feedbackDao.save(feedback);
	}

}
