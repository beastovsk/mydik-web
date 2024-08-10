'use client';

import {BriefcaseBusiness, CircleUser, Menu, Rabbit, MessageCircle, Settings, Heart} from 'lucide-react';
import Link from 'next/link';
import {Button} from '../ui/button';
import {usePathname, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useToast} from '../ui/use-toast';

export const Header = () => {
  const pathname = usePathname();
  const {push} = useRouter();
  const {toast} = useToast();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Определяем, является ли устройство мобильным
    };

    handleResize(); // Проверка при монтировании компонента
    window.addEventListener('resize', handleResize); // Слушаем изменения размера окна

    return () => window.removeEventListener('resize', handleResize); // Очищаем слушатель при размонтировании
  }, []);

  const getLinkClassName = (path) => {
    return pathname === path ? 'text-foreground font-bold' : 'text-muted-foreground';
  };

  const getMobileLinkClassName = (path) => {
    return pathname === path ? 'text-foreground' : 'text-muted-foreground';
  };

  if (isMobile) {
    return (
      <div className='fixed bottom-0 left-0 right-0 flex justify-around bg-background py-2 border-t border-gray-300'>
        <Link href='/home'>
          <Button variant='ghost' size='icon' className={getMobileLinkClassName('/home')}>
            <Rabbit className='h-6 w-6' />
          </Button>
        </Link>
        <Link href='/home/messages'>
          <Button variant='ghost' size='icon' className={getMobileLinkClassName('/home/messages')}>
            <MessageCircle className='h-6 w-6' />
          </Button>
        </Link>
        <Link href='/home/matches'>
          <Button variant='ghost' size='icon' className={getMobileLinkClassName('/home/matches')}>
            <Heart className='h-6 w-6' />
          </Button>
        </Link>
        <Link href='/home/settings'>
          <Button variant='ghost' size='icon' className={getMobileLinkClassName('/home/settings')}>
            <Settings className='h-6 w-6' />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
        <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
          <Link href='/' className='flex items-center gap-2 text-lg font-semibold md:text-base'>
            <Rabbit className='h-6 w-6' />
            <span className='sr-only'>Mydik</span>
          </Link>
          <Link href='/home' className={`${getLinkClassName('/home')} transition-colors hover:text-foreground`}>
            Главная
          </Link>
          <Link
            href='/home/messages'
            className={`${getLinkClassName('/home/messages')} transition-colors hover:text-foreground`}
          >
            Сообщения
          </Link>
          <Link
            href='/home/matches'
            className={`${getLinkClassName('/home/matches')} transition-colors hover:text-foreground`}
          >
            Матчи
          </Link>
          <Link
            href='/home/settings'
            className={`${getLinkClassName('/home/settings')} transition-colors hover:text-foreground`}
          >
            Настройки
          </Link>
        </nav>

        <div className='flex justify-end w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
          <Button variant='secondary' size='icon' className='rounded-full'>
            <CircleUser className='h-5 w-5' />
            <span className='sr-only'>Toggle user menu</span>
          </Button>
        </div>
      </header>
    </>
  );
};
