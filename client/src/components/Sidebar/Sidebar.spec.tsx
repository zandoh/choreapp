import React from 'react';
import { renderWithRouter } from '../../testUtil';
import Sidebar from './Sidebar';

describe('<Sidebar />', () => {
	test('renders to the document', () => {
		renderWithRouter(<Sidebar />);
	});
});
