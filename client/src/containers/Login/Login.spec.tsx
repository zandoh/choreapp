import React from 'react';
import { renderWithRouter, mockReduxState } from "../../testUtil";
import Login from './Login';
jest.mock('../../services/cognito');

describe('<Login />', () => {
    test('renders to the document', () => {
        mockReduxState({
            user: {
                jwt: undefined
            }
        });
        const { getByTestId } = renderWithRouter(<Login />);
        const loginForm = getByTestId('app-login-form');
        expect(loginForm).toBeInTheDocument();
    });
})
