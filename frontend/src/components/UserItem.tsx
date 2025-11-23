'use client';

import { UserResponse } from '@/type/userInterface';
import { useDeleteUser } from '@/hooks/useUsers';
import { useUserStore } from '@/store/useUserStore';
import { Button } from '@/components/ui/Button';

interface UserItemProps {
	user: UserResponse;
}

export const UserItem = ({ user }: UserItemProps) => {
	const deleteUser = useDeleteUser();
	const { openEditForm } = useUserStore();
	
	const handleEdit = () => {
		openEditForm(user);
	};
	
	const handleDelete = () => {
		if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
			deleteUser.mutate(user.id);
		}
	};
	
	return (
		<div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
			<div>
				<h3 className="font-medium">{user.name}</h3>
				<p className="text-sm text-gray-500">ID: {user.id}</p>
			</div>
			
			<div className="flex gap-2">
				<Button
					variant="secondary"
					onClick={handleEdit}
					disabled={deleteUser.isPending}
				>
					Редактировать
				</Button>
				<Button
					variant="danger"
					onClick={handleDelete}
					disabled={deleteUser.isPending}
				>
					{deleteUser.isPending ? 'Удаление...' : 'Удалить'}
				</Button>
			</div>
		</div>
	);
};