import React, { useState, useContext } from 'react';

import { HttpMethod, useHttp } from '../../hooks';
import { AuthContext } from '../../context';

import { FormInput } from '../inputs';
import { FormButton, TextButton } from '../buttons';
import { ErrorMessage } from '../messages';

import { BaseForm } from './BaseForm';

interface LoginFormProps {
	toRegister(): void;
}

export const LoginForm: React.FC<LoginFormProps> = props => {
	const auth = useContext(AuthContext);
	const { request, error, clearError } = useHttp();
	const [credentials, setCredentials] = useState({
		username: '',
		password: ''
	});

	const updateField = (field: string, value: string) => {
		setCredentials(prev => ({ ...prev, [field]: value }));
	};

	const submit = async () => {
		const data = await request('/auth/login', HttpMethod.POST, credentials);
		if (data) {
			clearError();
			auth.login(data.token);
		}
	};

	return (
		<BaseForm title='Login' onSubmit={ submit }>
			<FormInput
				required
				label='Username'
				value={ credentials.username }
				onChange={ value => updateField('username', value) }
			/>
			<FormInput
				required
				type='password'
				label='Password'
				value={ credentials.password }
				onChange={ value => updateField('password', value) }
			/>
			<ErrorMessage>{ error }</ErrorMessage>
			<FormButton>Submit</FormButton>
			<TextButton onClick={ props.toRegister }>
				Create account
			</TextButton>
		</BaseForm>
	);
};