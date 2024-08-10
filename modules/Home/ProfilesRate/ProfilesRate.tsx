'use client';

import {useState, useEffect} from 'react';
import Image from 'next/image';
import {ChevronLeft, ChevronRight, Heart, XCircle} from 'lucide-react';
import me1 from '@/src/assets/me.jpg'; // Замените на путь к вашим изображениям
import me2 from '@/src/assets/me.jpg'; // Замените на путь к вашим изображениям
import me3 from '@/src/assets/me.jpg'; // Замените на путь к вашим изображениям
import {Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerDescription} from '@/components/ui/drawer';

const images = [me1, me2, me3]; // Массив изображений

export const ProfilesRate = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Мобильный режим включается при ширине экрана <= 768px
    };

    handleResize(); // Устанавливаем начальное значение
    window.addEventListener('resize', handleResize); // Слушаем изменения размера экрана

    return () => {
      window.removeEventListener('resize', handleResize); // Чистим слушатель при размонтировании
    };
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  if (!isMobile) {
    return (
      <div className='flex h-[80vh]'>
        {/* Левая часть с фотографиями */}
        <div className='relative w-1/2 h-full bg-black'>
          <Image
            src={images[currentIndex]}
            alt={`Profile ${currentIndex + 1}`}
            layout='fill'
            objectFit='cover'
            className='absolute inset-0'
          />
          {/* Фиолетовое затемнение снизу */}
          <div className='absolute inset-0 bg-gradient-to-t from-purple-700 via-transparent to-transparent' />
          {/* Кнопки переключения слайдов */}
          <button
            onClick={handlePrevious}
            className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full'
          >
            <ChevronLeft className='w-8 h-8' />
          </button>
          <button
            onClick={handleNext}
            className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full'
          >
            <ChevronRight className='w-8 h-8' />
          </button>
          {/* Кнопки лайка и скипа */}
          <div className='flex absolute bottom-14 bg-purple-200 shadow-lg p-4 rounded-2xl left-0 right-0 ml-auto mr-auto w-max gap-5'>
            <button
              onClick={handlePrevious}
              className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg'
            >
              <XCircle className='w-5 h-5 text-white' />
            </button>
            <button
              onClick={handleNext}
              className='w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg'
            >
              <Heart className='w-5 h-5 text-white' />
            </button>
          </div>
        </div>

        {/* Правая часть с описанием анкеты */}
        <div className='w-1/3 h-full bg-white p-6 flex flex-col gap-5'>
          <div>
            <h2 className='text-3xl font-semibold text-black'>Алена, 20</h2>
            <p className='text-xl mt-1 text-gray-600'>ЭНГЕЛЬС, Россия</p>
            <div className='mt-2 inline-block px-3 py-1 bg-purple-500 text-white text-sm rounded-[15px]'>
              80% Совпадение
            </div>
            <p className='text-gray-700 mt-4'>
              Я люблю активный отдых, прогулки на природе и чтение книг. Ищу человека с общими интересами.
            </p>
          </div>
          <div>
            <h4 className='text-md font-semibold mb-2'>Теги:</h4>
            <div className='flex flex-wrap gap-2'>
              <span className='bg-purple-500 text-white text-sm px-2 py-1 rounded'>Путешествия</span>
              <span className='bg-purple-500 text-white text-sm px-2 py-1 rounded'>Активный отдых</span>
              <span className='bg-purple-500 text-white text-sm px-2 py-1 rounded'>Чтение</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-[80vh] justify-between'>
      {/* Слайдер с фотографиями */}
      <div className='relative w-full h-full bg-black'>
        <Image
          src={images[currentIndex]}
          alt={`Profile ${currentIndex + 1}`}
          layout='fill'
          objectFit='cover'
          className='absolute inset-0'
        />
        {/* Фиолетовое затемнение снизу */}
        <div className='absolute inset-0 bg-gradient-to-t from-purple-700 via-transparent to-transparent' />
        {/* Информация о профиле */}
        <div className='absolute bottom-0 left-0 w-full p-4 text-white'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-2xl font-semibold'>Алена, 20</h2>
              <p className='text-xl mt-1'>ЭНГЕЛЬС, Россия</p>
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='mt-2 inline-block px-3 py-1 bg-purple-500 text-white text-sm rounded-[15px]'>
              80% Совпадение {/* Этот элемент можно заменить графиком pie */}
            </div>
            {/* Drawer с дополнительной информацией */}
            <Drawer>
              <DrawerTrigger asChild>
                <button className=''>Подробнее</button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <h3 className='text-lg font-semibold mb-4'>Дополнительная информация</h3>
                </DrawerHeader>
                <DrawerDescription className='p-3'>
                  <p className='text-gray-700 mb-4'>
                    Я люблю активный отдых, прогулки на природе и чтение книг. Ищу человека с общими интересами.
                  </p>
                  <h4 className='text-md font-semibold mb-2'>Теги:</h4>
                  <div className='flex flex-wrap gap-2'>
                    <span className='bg-purple-500 text-white text-sm px-2 py-1 rounded'>Путешествия</span>
                    <span className='bg-purple-500 text-white text-sm px-2 py-1 rounded'>Активный отдых</span>
                    <span className='bg-purple-500 text-white text-sm px-2 py-1 rounded'>Чтение</span>
                  </div>
                </DrawerDescription>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        {/* Кнопки переключения слайдов */}
        <button
          onClick={handlePrevious}
          className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full'
        >
          <ChevronLeft className='w-8 h-8' />
        </button>
        <button
          onClick={handleNext}
          className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full'
        >
          <ChevronRight className='w-8 h-8' />
        </button>
      </div>{' '}
      {/* Кнопки лайка и скипа */}
      <div className='flex absolute bottom-14 bg-purple-200 shadow-lg p-4 rounded-2xl left-0 right-0 ml-auto mr-auto w-max gap-5'>
        <button
          onClick={handlePrevious}
          className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg'
        >
          <XCircle className='w-5 h-5 text-white' />
        </button>
        <button
          onClick={handleNext}
          className='w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg'
        >
          <Heart className='w-5 h-5 text-white' />
        </button>
      </div>
    </div>
  );
};
