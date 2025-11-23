package com.api.backend.service.impl;

import com.api.backend.dto.request.UserRequest;
import com.api.backend.dto.response.UserResponse;
import com.api.backend.model.User;
import com.api.backend.repository.UserRepository;
import com.api.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
	private final ModelMapper modelMapper;
	
	@Override
	@Transactional(readOnly = true)
	public List<UserResponse> findAll() {
		return userRepository.findAll().stream()
				.map(user -> modelMapper.map(user, UserResponse.class))
				.collect(Collectors.toList());
	}
	
	@Override
	@Transactional(readOnly = true)
	public UserResponse findById(Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Пользователь не найден с id: " + id));
		return modelMapper.map(user, UserResponse.class);
	}
	
	@Override
	public UserResponse createUser(UserRequest userRequest) {
		User user = modelMapper.map(userRequest, User.class);
		User savedUser = userRepository.save(user);
		return modelMapper.map(savedUser, UserResponse.class);
	}
	
	@Override
	public UserResponse updateUser(Long id, UserRequest userRequest) {
		User existingUser = userRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Пользователь не найден с id: " + id));
		existingUser.setName(userRequest.getName());
		User updatedUser = userRepository.save(existingUser);
		return modelMapper.map(updatedUser, UserResponse.class);
	}
	
	@Override
	public void deleteById(Long id) {
		if (!userRepository.existsById(id)) {
			throw new RuntimeException("Пользователь не найден с id " + id);
		}
		userRepository.deleteById(id);
	}
}