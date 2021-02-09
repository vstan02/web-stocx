import * as React from 'react';
import styled from 'styled-components';

interface Option {
	text: string;
	value: string;
}

interface OptionInputProps {
	value: string;
	label: string;
	options: Array<Option>;
	onChange: (value: string) => void;
}

const InputRoot = styled.div`
	display: flex;
	align-items: center;
`;

const InputLabel = styled.label`
	font-weight: bold;
	margin-right: 10px;
	color: ${ ({ theme }) => theme.color.PRIMARY_BETA };
`;

const InputSelect = styled.select`
	width: 150px;
	height: 40px;
	border: none;
	outline: none;
	font-weight: bold;
	background-color: ${ ({ theme }) => theme.color.PRIMARY_ALPHA };
`;

const InputOption = styled.option`
	color: ${ ({ theme }) => theme.color.BASE_ALPHA };
`;

export const OptionInput: React.FC<OptionInputProps> = props => {
	const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		props.onChange(event.target.value);
	};

	return (
		<InputRoot>
			<InputLabel>
				{ props.label }:
			</InputLabel>
			<InputSelect value={ props.value } onChange={ onChange }>
				{ props.options.map((option, index) => (
					<InputOption key={ index } value={ option.value }>
						{ option.text }
					</InputOption>
				)) }
			</InputSelect>
		</InputRoot>
	);
};
