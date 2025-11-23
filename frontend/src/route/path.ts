export const PATHS = {
	HOME: '/',
	USERS: '/users',
	API: {
		USERS: '/users',
		USER_BY_ID: (id: number) => `/users/${id}`,
	}
} as const;

export type AppPath = typeof PATHS[keyof typeof PATHS];