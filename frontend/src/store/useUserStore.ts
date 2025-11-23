import { create } from 'zustand';
import { UserResponse } from '@/type/userInterface'

interface UserState {
	selectedUser: UserResponse | null;
	isFormOpen: boolean;
	formMode: 'create' | 'edit';
	setSelectedUser: (user: UserResponse | null) => void;
	openCreateForm: () => void;
	openEditForm: (user: UserResponse) => void;
	closeForm: () => void;
}

export const useUserStore = create<UserState>((set) => ({
	selectedUser: null,
	isFormOpen: false,
	formMode: 'create',
	
	setSelectedUser: (user) => set({ selectedUser: user }),
	
	openCreateForm: () => set({
		isFormOpen: true,
		formMode: 'create',
		selectedUser: null
	}),
	
	openEditForm: (user) => set({
		isFormOpen: true,
		formMode: 'edit',
		selectedUser: user
	}),
	
	closeForm: () => set({
		isFormOpen: false,
		selectedUser: null
	}),
}));