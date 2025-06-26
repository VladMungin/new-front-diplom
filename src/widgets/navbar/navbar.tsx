'use client';

import Link from 'next/link';
import { ReactNode, useEffect, useRef } from 'react';

import {roleStore, useAuth, userStore} from '@/entities/user';
import { baseApi } from '@/shared/api';
import { Pages } from '@/shared/constants';
import {
	Accordion,
	AccordionControl,
	AccordionItem,
	AccordionPanel,
	AppShell, Box,
	Burger,
	Button, LoadingOverlay,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAtomValue } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
import { CgProfile } from 'react-icons/cg';
import { IoMdExit } from 'react-icons/io';

interface NavbarProps {
	children: ReactNode;
}

const backup = () => baseApi.post('/backup');

export const Navbar = ({ children }: NavbarProps) => {
	// const [cookies, setCookie] = useCookies(['access_token']);
	const { loginTokenData, logoutData } = useAuth();
	const router = useRouter();
	const firstRender = useRef(true);
	const user = useAtomValue(userStore);
	useEffect(() => {
		if (firstRender || !user) {
			loginTokenData.mutate();
			if (loginTokenData.isError) {
				router.push('/auth/login');
			}
			firstRender.current = false;
		}
	}, []);
	const [opened, { toggle }] = useDisclosure();

	// const { colorScheme, setColorScheme } = useMantineColorScheme();

	const pathname = usePathname();

	const offNavbar =
		pathname.includes('/auth') || pathname.includes('company/edit');

	const role = useAtomValue(roleStore)

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: !offNavbar ? 300 : 0,
				breakpoint: 'sm',
				collapsed: { mobile: !opened },
			}}
			padding='md'
		>
			<AppShell.Header className='flex items-center justify-between px-7.5'>
				<Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
				<div className='flex items-center gap-2'>
					<svg
						height='40'
						viewBox='0 0 40 40'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<rect width='40' height='40' rx='8' fill='#1402d9' />
						<path
							d='M13 20L17 24L27 14'
							stroke='white'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
					<h1 className=' mt-1 font-bold'>Taskly</h1>
				</div>
				{pathname === '/profile' ? (
					<Button
						unstyled
						onClick={() => {
							logoutData.mutate();
						}}
					>
						<IoMdExit size={44} />
					</Button>
				) : (
					<Link href={role?.name === 'admin' ? '/profile' : `/user/${user?.id}`} className='flex items-center gap-2 capitalize'>
						{loginTokenData.data?.data.user.name}
						<CgProfile className='w-[40px] h-[40px] cursor-pointer' />
					</Link>
				)}
			</AppShell.Header>

			{!offNavbar && (
				<AppShell.Navbar p='md'>
					{Pages.map((page, index) => {
						if (page.items?.length) {
							return (
								<Accordion key={index}>
									<AccordionItem key={index} value={page.label}>
										<AccordionControl>
											<h2>{page.label}</h2>
										</AccordionControl>
										<AccordionPanel
											classNames={{
												content: 'flex flex-col gap-2',
											}}
										>
											{page.items.map(item => {
												return (
													<Link
														href={item.href as string}
														key={`${index}-${item.label}`}
													>
														{item.label}
													</Link>
												);
											})}
										</AccordionPanel>
									</AccordionItem>
								</Accordion>
							);
						}
						return (
							<Link
								href={page.href as string}
								key={index}
								className='!border-b !border-[rgba(255,255,255,0.1)]'
							>
								{page.label}
							</Link>
						);
					})}
					<button
						className='mt-auto bg-emerald-700'
						onClick={async () => {
							await backup();
						}}
					>
						backup
					</button>
				</AppShell.Navbar>
			)}

			<AppShell.Main>
				<Box pos="relative">
					<LoadingOverlay visible={loginTokenData.isPending} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

				{children}
				</Box>
			</AppShell.Main>
		</AppShell>
	);
};
