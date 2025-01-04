import React, { useState } from 'react'

const ChatMessage = ({ message, isOwnMessage }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className={`px-4 py-2 flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] flex ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white
          ${isOwnMessage ? 'bg-blue-600' : 'bg-emerald-600'} self-end`}>
          {message.sender.charAt(0).toUpperCase()}
        </div>
        <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
          <div className={`rounded-2xl px-4 py-2 shadow-sm
            ${isOwnMessage 
              ? 'bg-blue-600 text-white rounded-br-none' 
              : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}
          >
            {!isOwnMessage && (
              <p className="text-xs font-medium mb-1">
                {message.sender}
              </p>
            )}
            
            {message.text && <p className="break-words">{message.text}</p>}
            
            {message.file && (
              <div className={`mt-2 ${message.text ? 'border-t border-white/10 pt-2' : ''}`}>
                {message.file.type?.startsWith('image/') ? (
                  <div className={`transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <img 
                      src={message.file.url} 
                      alt={message.file.name}
                      className="max-w-xs rounded-lg"
                      onLoad={() => setImageLoaded(true)}
                    />
                  </div>
                ) : (
                  <a 
                    href={message.file.url} 
                    download={message.file.name}
                    className={`flex items-center gap-2 ${isOwnMessage ? 'text-white/90 hover:text-white' : 'text-blue-600 hover:text-blue-700'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    {message.file.name}
                  </a>
                )}
              </div>
            )}
          </div>
          <span className={`text-xs text-gray-400 mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
