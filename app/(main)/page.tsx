import {Metadata} from 'next';
import Link from 'next/link';

import {cn} from '@/lib/utils';
import {buttonVariants} from '@/components/ui/button';
import {Icons} from '@/components/ui/icons';
import {UserAuthForm} from '@/components/Auth/Auth';
import {MainPage} from '@/modules/Home/MainPage/MainPage';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
};

export default function Page() {
  return (
    <div className='container flex h-screen w-screen flex-col items-center justify-center'>
      <MainPage />
    </div>
  );
}
