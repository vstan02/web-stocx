import { useState, useCallback } from 'react';
import axios from 'axios';

import { API_URL } from '../config';

export enum HttpMethod {
	GET = 'GET',
	POST = 'POST'
}

interface HttpHook {
	error: string;
	request(url: string, method: HttpMethod, body: any): any;
	clearError(): void;
}

export const useHttp = (): HttpHook => {
	const [error, setError] = useState('');

	const request = useCallback(async (url, method = HttpMethod.GET, body = null) => {
		try {
			const  response = await axios({ url: API_URL + url, method, data: body });
			if (response.data.status >= 300)
				return setError(response.data.details);
			return response.data;
		} catch (e) {
			setError(e.message);
		}
	}, []);

	const clearError = () => setError('');
	return { error, request, clearError };
};