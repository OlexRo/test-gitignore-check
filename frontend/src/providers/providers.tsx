'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryConfig } from '@/config/query-config';
import { ReactNode } from 'react';

interface ProvidersProps {
	children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	return (
		<QueryClientProvider client={queryConfig}>
			{children}
		</QueryClientProvider>
	);
}