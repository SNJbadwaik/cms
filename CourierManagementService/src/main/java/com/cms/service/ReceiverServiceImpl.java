package com.cms.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.dao.ReceiverDao;
import com.cms.entities.ReceiverEntity;

@Service
@Transactional
public class ReceiverServiceImpl implements ReceiverService{

	@Autowired
	ReceiverDao receiverDao ;

	@Override
	public void addReceiver(ReceiverEntity receiver) {
		 receiverDao.save(receiver);
	}
}
