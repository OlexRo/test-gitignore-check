'use client';

import { useUsers } from '@/hooks/useUsers';
import { UserItem } from './UserItem';

export const UserList = () => {
	const { data: users, isLoading, error } = useUsers();
	
	if (isLoading) {
		return <div className="text-center py-4">Загрузка пользователей...</div>;
	}
	
	if (error) {
		return (
			<div className="text-center py-4 text-red-500">
				Ошибка при загрузке пользователей: {error.message}
			</div>
		);
	}
	
	if (!users || users.length === 0) {
		return (
			<div className="text-center py-4 text-gray-500">
				Пользователи не найдены
			</div>
		);
	}
	
	return (
		<div className="space-y-3">
			{users.map((user) => (
				<UserItem key={user.id} user={user} />
			))}
		</div>
	);
};