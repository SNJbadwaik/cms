package com.cms.dto;

import java.util.Date;

import lombok.Data;

@Data
public class FeedbackDTO {
	private String message;
	private String customerName;
	private Boolean feedbackstatus;
	private Date feedbackdate;
}
