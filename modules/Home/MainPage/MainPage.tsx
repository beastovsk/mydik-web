import {Button} from '@/components/ui/button';
import {Icons} from '@/components/ui/icons';
import img from '@/src/assets/login.png';
import Image from 'next/image';
import Link from 'next/link';

export const MainPage = () => {
  return (
    <div className='flex lg:justify-between w-[80%] flex-col lg:flex-row items-center justify-center'>
      <div>
        <Image src={img} alt='' />
      </div>
      <div>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <Icons.rabbit className='mx-auto h-6 w-6' />
            <h1 className='text-2xl font-semibold tracking-tight'>Добро пожаловать</h1>
            <p className='text-sm text-muted-foreground'>Введите данные своего аккаунта для входа</p>
          </div>
          <div className='flex flex-col gap-2'>
            <Link href='/login'>
              <Button className='w-full'>Авторизация</Button>
            </Link>
            <Link href='/register'>
              <Button className='w-full' variant='secondary'>
                Регистрация
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
