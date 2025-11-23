'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateUser, useUpdateUser } from '@/hooks/useUsers';
import { useUserStore } from '@/store/useUserStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { userValidationRules } from '@/utils/validation/schemas';
import { UserFormData } from '@/type/userInterface';

export const UserForm = () => {
	
	const { selectedUser, formMode, closeForm } = useUserStore();
	const createUser = useCreateUser();
	const updateUser = useUpdateUser();
	
	const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, reset, watch } = useForm<UserFormData>({
		mode: 'onChange',
		defaultValues: {
			name: selectedUser?.name || '',
		}
	});
	
	useEffect(() => {
		reset({ name: selectedUser?.name || '' });
	}, [selectedUser, reset]);
	
	const onSubmit = (data: UserFormData) => {
		const userData = { name: data.name.trim() };
		if (formMode === 'create') {
			createUser.mutate(userData);
		} else if (formMode === 'edit' && selectedUser) {
			updateUser.mutate({ id: selectedUser.id, data: userData });
		}
	};
	
	const isLoading = isSubmitting || createUser.isPending || updateUser.isPending;
	const nameValue = watch('name');
	const isNameEmpty = !nameValue?.trim();
	
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<Input
				label="Имя пользователя"
				placeholder="Введите имя пользователя"
				error={errors.name?.message}
				disabled={isLoading}
				{...register('name', userValidationRules.name)}
			/>
			<div className="flex gap-2 justify-end pt-4">
				<Button
					type="button"
					variant="secondary"
					onClick={closeForm}
					disabled={isLoading}
				>
					Отмена
				</Button>
				<Button
					type="submit"
					disabled={isLoading || !isValid || isNameEmpty}
					className={!isValid || isNameEmpty ? 'opacity-50 cursor-not-allowed' : ''}
				>
					{isLoading ? 'Сохранение...' : formMode === 'create' ? 'Создать' : 'Обновить'}
				</Button>
			</div>
		</form>
	);
};