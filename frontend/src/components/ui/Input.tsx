import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, className = '', ...props }, ref) => {
		return (
			<div className="flex flex-col w-full">
				{label && (
					<label className="mb-2 text-sm font-medium text-gray-700">
						{label}
					</label>
				)}
				<input
					ref={ref}
					className={`
            px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
            ${error
						? 'border-red-500 focus:ring-red-500'
						: 'border-gray-300 focus:ring-blue-500'
					}
            ${className}
          `}
					{...props}
				/>
				{error && (
					<span className="mt-1 text-sm text-red-500">{error}</span>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';