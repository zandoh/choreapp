import React from 'react';
import { renderWithRouter, mockUser } from "../../testUtil";
import ProtectedRoute from './ProtectedRoute';
import * as reactRedux from 'react-redux';
jest.mock('../../services/cognito');

describe('<ProtectedRoute />', () => {
    test('renders to the document', () => {
        renderWithRouter(<ProtectedRoute />);
    });

    test('renders for valid user session', () => {
        const { container } = renderWithRouter(<ProtectedRoute />);
    });

    test('redirects to login for invalid user session', () => {
        const reactReduxMock = jest.spyOn(reactRedux, 'useSelector');
        reactReduxMock.mockImplementation(() => {
            return {
                ...mockUser,
                jwt: undefined,
            }
        })
        const { container } = renderWithRouter(<ProtectedRoute />);

        console.log('container ', container);
    });
})
