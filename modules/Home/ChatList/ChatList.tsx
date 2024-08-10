'use client';

import {useState, useEffect} from 'react';
import Image from 'next/image';
import {Drawer, DrawerTrigger, DrawerContent} from '@/components/ui/drawer';
import me from '@/src/assets/me.jpg'; // Импорт изображения для примера
import {Messages} from '../Messages/Messages';

// Список чатов
const chats = [
  {id: 1, name: 'Алена', lastMessage: 'Привет! Как дела?', time: '10:00'},
  {id: 2, name: 'Иван', lastMessage: 'Когда встретимся?', time: '09:45'},
  {id: 3, name: 'Мария', lastMessage: 'Сегодня вечером?', time: '08:30'}
];

// Главный компонент
export const ChatList = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Устанавливаем режим для мобильных устройств
    };

    handleResize(); // Устанавливаем начальное значение
    window.addEventListener('resize', handleResize); // Обновляем режим при изменении размера окна

    return () => {
      window.removeEventListener('resize', handleResize); // Чистим слушатель при размонтировании
    };
  }, []);

  const handleSelectChat = (chatId) => {
    setSelectedChat(chats.find((chat) => chat.id === chatId));
  };

  if (isMobile) {
    return (
      <div className='flex flex-col h-screen'>
        {/* Заголовок списка чатов */}
        <div className='flex items-center justify-between p-4 border-b border-gray-300'>
          <h1 className='text-2xl font-semibold'>Чаты</h1>
        </div>

        {/* Список чатов */}
        <div className='flex-1 overflow-y-auto'>
          {chats.map((chat) => (
            <Drawer key={chat.id}>
              <DrawerTrigger asChild>
                <div
                  onClick={() => handleSelectChat(chat.id)}
                  className={`flex items-center p-4 border-b border-gray-200 cursor-pointer ${
                    selectedChat && selectedChat.id === chat.id ? 'bg-gray-200' : ''
                  }`}
                >
                  <div className='mr-3'>
                    <Image src={me} alt='Profile Picture' width={50} height={50} className='rounded-full' />
                  </div>
                  <div className='flex-1'>
                    <div className='flex justify-between items-center'>
                      <h2 className='text-lg font-semibold'>{chat.name}</h2>
                      <p className='text-sm text-gray-500'>{chat.time}</p>
                    </div>
                    <p className='text-gray-700'>{chat.lastMessage}</p>
                  </div>
                </div>
              </DrawerTrigger>
              <DrawerContent>
                <Messages />
              </DrawerContent>
            </Drawer>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-screen'>
      {/* Левая колонка - список чатов */}
      <div className='w-1/2 border-r border-gray-300'>
        <div className='flex items-center justify-between p-4 border-b border-gray-300'>
          <h1 className='text-2xl font-semibold'>Чаты</h1>
        </div>
        <div className='flex-1 overflow-y-auto'>
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleSelectChat(chat.id)}
              className={`flex items-center p-4 border-b border-gray-200 cursor-pointer ${
                selectedChat && selectedChat.id === chat.id ? 'bg-gray-200' : ''
              }`}
            >
              <div className='mr-3'>
                <Image
                  src={me}
                  alt='Profile Picture'
                  width={50}
                  height={50}
                  className='rounded-full w-[50px] h-[50px] object-fill'
                />
              </div>
              <div className='flex-1'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-lg font-semibold'>{chat.name}</h2>
                  <p className='text-sm text-gray-500'>{chat.time}</p>
                </div>
                <p className='text-gray-700'>{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Правая колонка - переписка */}
      <div className='w-1/2'>
        <Messages />
      </div>
    </div>
  );
};
