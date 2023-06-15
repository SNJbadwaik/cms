package com.cms.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.dao.AddressDao;
import com.cms.entities.AddressEntity;

@Service
@Transactional
public class AddressServiceImpl implements AddressService {

	@Autowired
	private AddressDao addressDao;

	@Override
	public AddressEntity insertAddress(AddressEntity address) {

		return addressDao.save(address);
	}

}
