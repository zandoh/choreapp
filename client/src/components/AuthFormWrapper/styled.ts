import styled from '@emotion/styled';

export const LoginWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	background: ${props => props.theme['colors']['brand']['gradient']};
`;

export const LogoWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 2rem;
	img {
		display: block;
		max-width: 150px;
	}
`;

export const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 4rem;
	background: ${props => props.theme['colors']['white']};
	border-radius: 8px;
`;
