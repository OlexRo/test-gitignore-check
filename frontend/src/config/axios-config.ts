import axios from 'axios';

const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

apiClient.interceptors.response.use(
	response => response,
	error => {
		console.error('Ошибка Api', error);
		return Promise.reject(error);
	}
)
export { apiClient };