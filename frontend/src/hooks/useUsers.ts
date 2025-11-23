import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import { UserRequest } from '@/type/userInterface'
import { useUserStore } from '@/store/useUserStore';

export const useUsers = () => {
	return useQuery({
		queryKey: ['users'],
		queryFn: userService.getAllUsers,
	});
};

export const useUser = (id: number) => {
	return useQuery({
		queryKey: ['user', id],
		queryFn: () => userService.getUserById(id),
		enabled: !!id,
	});
};

export const useCreateUser = () => {
	const queryClient = useQueryClient();
	const { closeForm } = useUserStore();
	return useMutation({
		mutationFn: userService.createUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
			closeForm();
		},
	});
};

export const useUpdateUser = () => {
	const queryClient = useQueryClient();
	const { closeForm } = useUserStore();
	return useMutation({
		mutationFn: ({ id, data }: { id: number; data: UserRequest }) =>
			userService.updateUser(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
			closeForm();
		},
	});
};

export const useDeleteUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: userService.deleteUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});
};