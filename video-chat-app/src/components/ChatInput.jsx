import { useState, useRef } from 'react'

const ChatInput = ({ onSendMessage, onStartTyping }) => {
  const [newMessage, setNewMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newMessage.trim() || selectedFile) {
      onSendMessage({
        text: newMessage,
        file: selectedFile
      })
      setNewMessage('')
      setSelectedFile(null)
    }
  }

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value)
    // Trigger scroll to bottom when user starts typing
    onStartTyping?.()
  }

  const handleAttachment = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB')
        return
      }
      setSelectedFile(file)
      // Trigger scroll to bottom when file is selected
      onStartTyping?.()
    }
  }

  const removeAttachment = () => {
    setSelectedFile(null)
    fileInputRef.current.value = ''
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      {selectedFile && (
        <div className="mb-2 p-2 bg-gray-50 rounded-lg border border-gray-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            <span className="text-sm text-gray-600">{selectedFile.name}</span>
          </div>
          <button
            type="button"
            onClick={removeAttachment}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
      <div className="flex gap-2 items-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.txt"
        />
        <button
          type="button"
          onClick={handleAttachment}
          className="p-3 rounded-xl bg-white text-gray-600 border-2 border-gray-300 
            hover:bg-gray-50 transition-colors
            shadow-[0_5px_15px_rgba(0,0,0,0.22)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)]"
          title="Add attachment"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" 
            />
          </svg>
        </button>

        <input
          type="text"
          value={newMessage}
          onChange={handleMessageChange}
          placeholder="Type your message..."
          className="flex-1 p-4 rounded-xl bg-white text-gray-800 border-2 border-gray-300 
            focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 
            shadow-[0_5px_15px_rgba(0,0,0,0.22)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] 
            transition-all"
        />
        <button 
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 
            transition-colors font-medium shadow-xl hover:shadow-2xl"
        >
          Send
        </button>
      </div>
    </form>
  )
}

export default ChatInput
