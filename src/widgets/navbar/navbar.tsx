'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

import { Pages } from '@/shared/constants';
import {
	Accordion,
	AccordionControl,
	AccordionItem,
	AccordionPanel,
	AppShell,
	Burger,
	NavLink,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePathname } from 'next/navigation';
import { CgProfile } from 'react-icons/cg';

interface NavbarProps {
	children: ReactNode;
}

export const Navbar = ({ children }: NavbarProps) => {
	const [opened, { toggle }] = useDisclosure();

	// const { colorScheme, setColorScheme } = useMantineColorScheme();

	const pathname = usePathname();

	const offNavbar = !pathname.includes('/auth');

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: offNavbar ? 300 : 0,
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
					{/* Переместить в профиль */}
					{/* <Switch
            defaultChecked
            label={colorScheme === 'dark' ? 'Темная' : 'Светлая'}
            onChange={() => {
              setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
            }}
						/> */}
				</div>
				<Link href='/profile'>
					<CgProfile className='w-[40px] h-[40px] cursor-pointer' />
				</Link>
			</AppShell.Header>

			{offNavbar && (
				<AppShell.Navbar p='md'>
					{Pages.map((page, index) => {
						if (page.items?.length) {
							return (
								<Accordion key={index}>
									<AccordionItem key={index} value={page.label}>
										<AccordionControl>
											<h2>{page.label}</h2>
										</AccordionControl>
										<AccordionPanel>
											{page.items.map(item => {
												return (
													<NavLink
														label={item.label}
														href={item.href}
														key={`${index}-${item.label}`}
													/>
												);
											})}
										</AccordionPanel>
									</AccordionItem>
								</Accordion>
							);
						}
						return (
							<NavLink
								href={page.href}
								label={page.label}
								key={index}
								className='!border-b !border-[rgba(255,255,255,0.1)]'
							/>
						);
					})}
				</AppShell.Navbar>
			)}

			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	);
};
