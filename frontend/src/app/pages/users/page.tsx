'use client';

import { UserList } from '@/components/UserList';
import { UserForm } from '@/components/UserForm';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useUserStore } from '@/store/useUserStore';

const UsersPage = () => {
	const { isFormOpen, formMode, openCreateForm, closeForm } = useUserStore();
	
	const modalTitle = formMode === 'create' ? 'Создать пользователя' : 'Редактировать пользователя';
	
	return (
		<div className="container mx-auto p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Пользователи</h1>
				<Button onClick={openCreateForm}>
					Создать пользователя
				</Button>
			</div>
			
			<UserList />
			
			<Modal
				isOpen={isFormOpen}
				onClose={closeForm}
				title={modalTitle}
			>
				<UserForm />
			</Modal>
		</div>
	);
};

export default UsersPage;