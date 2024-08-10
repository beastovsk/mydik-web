import {useState, useEffect} from 'react';
import Image from 'next/image';
import me from '@/src/assets/me.jpg';

const initialMessages = [
  {id: 1, sender: 'me', text: 'Привет! Как дела?'},
  {id: 2, sender: 'other', text: 'Привет! Все хорошо, как ты?'},
  {id: 3, sender: 'me', text: 'Отлично, спасибо!'},
  {id: 4, sender: 'other', text: 'Здорово слышать! Какие планы на сегодня?'}
];

export const Messages = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        sender: 'me',
        text: inputValue
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  return (
    <div className='flex flex-col h-[90vh] md:h-[75vh]'>
      {/* Заголовок с именем */}
      <div className='p-[18px] border-b border-gray-300'>
        <h2 className='text-xl font-bold'>Алена</h2>
      </div>

      {/* Контейнер сообщений */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} items-start`}
          >
            {/* Аватарка для сообщений от других пользователей (на десктопе) */}
            {!isMobile && message.sender === 'other' && (
              <Image
                src={me}
                alt='Profile Picture'
                width={40}
                height={40}
                className='rounded-full mr-3 w-[50px] h-[50px] object-fill'
              />
            )}
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                message.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'
              } ${isMobile && message.sender === 'me' ? 'ml-auto' : ''}`}
            >
              {message.text}
            </div>
            {/* Аватарка для сообщений от себя (на десктопе) */}
            {!isMobile && message.sender === 'me' && (
              <Image
                src={me}
                alt='Profile Picture'
                width={40}
                height={40}
                className='rounded-full ml-3 w-[50px] h-[50px] object-fill'
              />
            )}
          </div>
        ))}
      </div>

      {/* Инпут и кнопка отправки */}
      <div className='flex mt-4 p-4 border-t border-gray-300'>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className='flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none'
          placeholder='Введите сообщение...'
        />
        <button onClick={handleSendMessage} className='bg-blue-500 text-white p-2 rounded-r-lg'>
          Отправить
        </button>
      </div>
    </div>
  );
};
