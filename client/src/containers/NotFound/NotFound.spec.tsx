import React from 'react';
import { customRender } from "../../testUtil";
import NotFound from './NotFound';

describe('<NotFound />', () => {
    test('renders to the document', () => {
        customRender(<NotFound />);
    });
})
