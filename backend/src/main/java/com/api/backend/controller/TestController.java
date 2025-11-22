package com.api.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {
	
	@GetMapping("/hello")
	public String hello() {
		return "Hello from Backend! Time: " + new Date();
	}
	
	@GetMapping("/data")
	public Map<String, Object> getData() {
		return Map.of(
				"message", "Hello from Spring Boot",
				"timestamp", new Date(),
				"status", "success"
		);
	}
}