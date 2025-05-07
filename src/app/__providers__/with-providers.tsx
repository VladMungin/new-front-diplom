'use client';

import { composeProviders } from '@/shared/helpers';
import { WithCookies } from './_with-cookies';
import { WithJotai } from './_with-jotai';
import { WithMantine } from './_with-mantine';
import { WithTanstackQuery } from './_with-tanstack-query';

export const WithProviders = composeProviders(
	WithJotai,
	WithTanstackQuery,
	WithCookies,
	WithMantine
);
