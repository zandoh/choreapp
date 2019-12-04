import { theme } from '@chakra-ui/core';

export const appTheme = {
	...theme,
	colors: {
		...theme.colors,
		brand: {
			red: '#D7373C',
			orange: '#FCAB44',
			gradient: `linear-gradient(
        45deg,
        rgba(247, 55, 60, 1) 0%,
        rgba(252, 171, 68, 1) 100%
      );`,
		},
		app: {
			white: '#FFF',
			lightGrey: '#D3D3D3',
			mediumGrey: '#E6EAED',
			green: '#61B07F',
			blue: '#0089ff',
		},
	},
	shadow: {
		header: '0px 0px 10px rgba(0, 0, 0, 0.2)',
		sidebar: '0px 10px 10px rgba(0, 0, 0, 0.2)',
	},
};

export type AppTheme = typeof appTheme;
