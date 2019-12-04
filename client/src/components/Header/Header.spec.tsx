import React from 'react';
import { renderWithRouter } from '../../testUtil';
import Header from './Header';

describe('<Header />', () => {
	test('renders to the document', () => {
		renderWithRouter(<Header />);
	});
});
