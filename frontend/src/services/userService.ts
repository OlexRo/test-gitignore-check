import { apiClient } from '@/config/axios-config';
import { UserResponse, UserRequest } from '@/type/userInterface';
import { PATHS } from '@/route/path';

export const userService = {

	getAllUsers: async (): Promise<UserResponse[]> => {
		const response = await apiClient.get<UserResponse[]>(PATHS.API.USERS);
		return response.data;
	},
	
	getUserById: async (id: number): Promise<UserResponse> => {
		const response = await apiClient.get<UserResponse>(PATHS.API.USER_BY_ID(id));
		return response.data;
	},
	
	createUser: async (userData: UserRequest): Promise<UserResponse> => {
		const response = await apiClient.post<UserResponse>(PATHS.API.USERS, userData);
		return response.data;
	},
	
	updateUser: async (id: number, userData: UserRequest): Promise<UserResponse> => {
		const response = await apiClient.put<UserResponse>(PATHS.API.USER_BY_ID(id), userData);
		return response.data;
	},
	
	deleteUser: async (id: number): Promise<void> => {
		await apiClient.delete(PATHS.API.USER_BY_ID(id));
	},
};