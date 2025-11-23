package com.api.backend.controller;

import com.api.backend.dto.request.UserRequest;
import com.api.backend.dto.response.UserResponse;
import com.api.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	
	@GetMapping
	public ResponseEntity<List<UserResponse>> findAll() {
		return ResponseEntity.ok(userService.findAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<UserResponse> findById(@PathVariable Long id) {
		return ResponseEntity.ok(userService.findById(id));
	}
	
	@PostMapping
	public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserRequest userRequest) {
		return ResponseEntity.ok(userService.createUser(userRequest));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @Valid @RequestBody UserRequest userRequest) {
		return ResponseEntity.ok(userService.updateUser(id, userRequest));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		userService.deleteById(id);
		return ResponseEntity.ok().build();
	}
}