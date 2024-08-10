import Image from 'next/image';
import me from '@/src/assets/me.jpg';

const matches = [
  {name: 'Алена, 20', location: 'ЭНГЕЛЬС', distance: '16КМ', status: 'НОВОЕ', image: me},
  {name: 'Алена, 20', location: 'ЭНГЕЛЬС', distance: '16КМ', status: 'НОВОЕ', image: me}
  // Добавьте другие совпадения
];

export const LatestMatches = () => {
  return (
    <div>
      <h2 className='font-bold text-xl mb-5'>Последние матчи</h2>
      <div className='flex gap-4'>
        {matches.slice(0, 5).map((match, index) => (
          <div key={index} className='relative w-1/2 md:w-1/4 h-64 rounded-lg overflow-hidden shadow-sm'>
            <Image src={me} alt='User' layout='fill' objectFit='cover' />

            {/* Затемнение внизу изображения */}
            <div className='absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-purple-800 to-transparent'></div>

            {/* Метка "NEW" */}
            <div className='absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full'>NEW</div>

            {/* Расстояние */}
            <div className='absolute bottom-16 left-2 bg-gray-700 bg-opacity-60 text-white text-sm px-2 py-1 rounded-lg'>
              4,8 km away
            </div>

            {/* Имя, возраст и индикатор активности */}
            <div className='absolute bottom-6 left-2 flex items-center space-x-1'>
              <span className='text-white font-semibold'>Vanessa, 18</span>
              <div className='w-2 h-2 bg-green-400 rounded-full border-2 border-white'></div>
            </div>

            {/* Город с отступом между буквами */}
            <div className='absolute bottom-2 inset-x-0 text-center text-gray-300 text-xs tracking-wide'>MUNICH</div>
          </div>
        ))}
      </div>
    </div>
  );
};
