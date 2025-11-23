package com.api.backend.service;

import com.api.backend.dto.request.UserRequest;
import com.api.backend.dto.response.UserResponse;
import java.util.List;

public interface UserService {
	List<UserResponse> findAll();
	UserResponse findById(Long id);
	UserResponse createUser(UserRequest userRequest);
	UserResponse updateUser(Long id, UserRequest userRequest);
	void deleteById(Long id);
}
