'use client';

import { useState, useEffect } from 'react';

interface ApiData {
	message: string;
	timestamp: string;
	status: string;
}

export default function TestApi() {
	const [helloMessage, setHelloMessage] = useState('');
	const [apiData, setApiData] = useState<ApiData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	
	// Базовый URL для API - используем полный путь до бэкенда
	const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
	
	// Автоматически загружаем данные при монтировании компонента
	useEffect(() => {
		fetchHelloMessage();
		fetchApiData();
	}, []);
	
	const fetchHelloMessage = async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/test/hello`);
			if (!response.ok) throw new Error('Failed to fetch hello message');
			const text = await response.text();
			setHelloMessage(text);
		} catch (err) {
			setError('Error fetching hello message');
			console.error('Error:', err);
		}
	};
	
	const fetchApiData = async () => {
		setLoading(true);
		setError('');
		try {
			const response = await fetch(`${API_BASE_URL}/test/data`);
			if (!response.ok) throw new Error('Failed to fetch API data');
			const data = await response.json();
			setApiData(data);
		} catch (err) {
			setError('Error fetching API data');
			console.error('Error:', err);
		} finally {
			setLoading(false);
		}
	};
	
	const refreshData = () => {
		fetchHelloMessage();
		fetchApiData();
	};
	
	return (
		<div className="w-full max-w-md p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700">
			<h2 className="text-xl font-bold mb-4 text-black dark:text-white">
				Backend API Test
			</h2>
			
			{/* API Base URL Info */}
			<div className="mb-4 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
				<p className="text-xs text-blue-600 dark:text-blue-400">
					API Base: {API_BASE_URL}
				</p>
			</div>
			
			{/* Hello Message */}
			<div className="mb-4">
				<h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
					Simple Message:
				</h3>
				<p className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-2 rounded">
					{helloMessage || 'Loading...'}
				</p>
			</div>
			
			{/* API Data */}
			<div className="mb-4">
				<h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
					JSON Data:
				</h3>
				{loading ? (
					<p className="text-sm text-blue-600 dark:text-blue-400">Loading...</p>
				) : apiData ? (
					<pre className="text-xs bg-zinc-50 dark:bg-zinc-800 p-3 rounded overflow-auto">
            {JSON.stringify(apiData, null, 2)}
          </pre>
				) : (
					<p className="text-sm text-zinc-500 dark:text-zinc-400">No data</p>
				)}
			</div>
			
			{/* Error Message */}
			{error && (
				<div className="mb-4 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
					<p className="text-sm text-red-600 dark:text-red-400">{error}</p>
				</div>
			)}
			
			{/* Refresh Button */}
			<button
				onClick={refreshData}
				disabled={loading}
				className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-md transition-colors font-medium"
			>
				{loading ? 'Refreshing...' : 'Refresh Data'}
			</button>
			
			{/* Connection Status */}
			<div className="mt-3 text-center">
				<div className="inline-flex items-center gap-2 text-sm">
					<div className={`w-2 h-2 rounded-full ${apiData ? 'bg-green-500' : 'bg-red-500'}`}></div>
					<span className="text-zinc-600 dark:text-zinc-400">
            Backend: {apiData ? 'Connected' : 'Disconnected'}
          </span>
				</div>
			</div>
		</div>
	);
}