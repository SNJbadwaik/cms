package com.cms.service;

import java.util.List;

import com.cms.dto.FeedbackDTO;
import com.cms.entities.FeedbackEntity;


public interface FeedbackService {
	FeedbackEntity addfeedback(FeedbackEntity feedback);
	List<FeedbackEntity> findAllFeedback();
	void changeFeedbackStatus(Long feedbackid);
}
