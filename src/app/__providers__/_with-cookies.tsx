import { ReactNode } from 'react';
import { CookiesProvider } from 'react-cookie';

export const WithCookies = ({ children }: { children: ReactNode }) => (
	<CookiesProvider defaultSetOptions={{ path: '/' }}>
		{children}
	</CookiesProvider>
);
