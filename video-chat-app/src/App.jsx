import { useState, useEffect, useRef } from 'react'
import socketService from './services/socket'
import Login from './components/Login'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import OnlineUsers from './components/OnlineUsers'
import ScrollToBottom from './components/ScrollToBottom'

function App() {
  const [username, setUsername] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [messages, setMessages] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [showScrollButton, setShowScrollButton] = useState(false)
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)
  const socketRef = useRef(null)

  useEffect(() => {
    if (isLoggedIn) {
      // Connect to socket
      socketRef.current = socketService.connect()

      // Listen for online users updates
      socketRef.current.on('online_users', (users) => {
        console.log('Received online users:', users)
        setOnlineUsers(users)
      })

      // Listen for previous messages
      socketRef.current.on('previous_messages', (previousMessages) => {
        console.log('Received previous messages:', previousMessages)
        setMessages(previousMessages)
        scrollToBottom()
      })

      // Listen for new messages
      socketRef.current.on('new_message', (message) => {
        console.log('Received new message:', message)
        setMessages(prev => [...prev, message])
        if (!showScrollButton) {
          scrollToBottom()
        }
      })

      // Emit login event
      socketRef.current.emit('user_login', username)
    }

    return () => {
      socketService.disconnect()
    }
  }, [isLoggedIn])

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleScroll = () => {
    if (!messagesContainerRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current
    const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100
    setShowScrollButton(isScrolledUp)
  }

  const handleLogin = (username) => {
    setUsername(username)
    setIsLoggedIn(true)
  }

  const handleSendMessage = async (messageData) => {
    if (!socketRef.current) return
    console.log('Sending message:', messageData)

    const newMessage = {
      text: messageData.text,
      sender: username,
      timestamp: new Date().toISOString(),
      file: null
    }

    if (messageData.file) {
      const file = messageData.file
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          newMessage.file = {
            name: file.name,
            url: e.target.result,
            type: file.type
          }
          socketRef.current.emit('send_message', newMessage)
        }
        reader.readAsDataURL(file)
        return
      } else {
        newMessage.file = {
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type
        }
      }
    }

    socketRef.current.emit('send_message', newMessage)
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 fixed inset-0 overflow-hidden">
      <OnlineUsers onlineUsers={onlineUsers} />
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.1)] 
        h-[calc(100vh-2rem)] flex flex-col border border-gray-200"
      >
        <div className="bg-white border-b border-gray-200 p-4 rounded-t-2xl flex-shrink-0">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Chat Room</h1>
            <p className="text-gray-600">Logged in as: {username}</p>
          </div>
        </div>

        <div 
          className="flex-1 overflow-y-auto"
          ref={messagesContainerRef}
          onScroll={handleScroll}
        >
          <div className="p-4 space-y-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                isOwnMessage={message.sender === username}
              />
            ))}
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                No messages yet. Start a conversation!
              </div>
            )}
            <div ref={messagesEndRef} /> {/* Scroll anchor */}
          </div>
        </div>

        {showScrollButton && (
          <ScrollToBottom onClick={scrollToBottom} />
        )}

        <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-2xl flex-shrink-0">
          <ChatInput onSendMessage={handleSendMessage} onStartTyping={scrollToBottom} />
        </div>
      </div>
    </div>
  )
}

export default App