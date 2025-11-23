package com.api.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserRequest {
	@NotBlank(message = "Имя обязательно")
	private String name;
}
