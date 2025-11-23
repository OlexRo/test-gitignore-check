import { RegisterOptions } from 'react-hook-form';
import {UserFormData} from '@/type/userInterface';

export const userValidationRules: {
	name: RegisterOptions<UserFormData, 'name'>;
} = {
	name: {
		required: 'Имя обязательно для заполнения',
		minLength: {
			value: 2,
			message: 'Имя должно содержать минимум 2 символа'
		},
		maxLength: {
			value: 50,
			message: 'Имя не должно превышать 50 символов'
		},
		validate: {
			noEmptySpaces: (value: string) =>
				value.trim().length > 0 || 'Имя не может состоять только из пробелов'
		}
	},
};