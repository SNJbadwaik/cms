package com.cms.dto;

import lombok.Data;

@Data
public class ReceiverDTO {
	private String receiverName;
	private AddressDTO receiverAddress;
	private String receiverPhone;
	private String receiverEmail;
}
