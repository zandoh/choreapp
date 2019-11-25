import React, { ReactNode } from 'react'
import { render, RenderOptions, Queries, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import { appTheme } from './theme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Router } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from 'history';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// to allow mocks to be imported out of scope, jest only permits 
// variables/functions that begin with mock
export const mockUser = {
    jwt: 'asdf1234'
};
const mockStore = configureStore([])
export const initialMockState = {
    user: mockUser
}

const AppProviders = ({ children }: { children?: ReactNode }): any => (
    <Provider store={mockStore(initialMockState)}>
        <ThemeProvider theme={appTheme}>
            { children }
        </ThemeProvider>
    </Provider>
);
// Renders child component with prodiders that index.ts wraps components in
export const customRender = <Q extends Queries>(
    ui: React.ReactElement<any>,
    options?:  Omit<RenderOptions, "queries"> | RenderOptions<Q>
): RenderResult | RenderResult<Q> => {
    return render(ui, { wrapper: AppProviders, ...options })
}

// utility function to wrap components in router
export const renderWithRouter = (
    ui: React.ReactElement<any>,
    {
      route = '/',
      history = createMemoryHistory({ initialEntries: [route] }),
    }: { route?: string, history?: MemoryHistory<any> } = { }
): RenderResult => {
    const RouterProvider = ({ children }: { children?: ReactNode }) => (
        <AppProviders>
            <Router history={history}>
                { children }
            </Router>
        </AppProviders>
    )
    return render(ui, { wrapper: RouterProvider })
}
