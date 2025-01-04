import { useState } from 'react'

const OnlineUsers = ({ onlineUsers }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed top-4 right-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-white rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)] border border-gray-200 p-4 
          hover:shadow-[0_0_15px_rgba(0,0,0,0.15)] transition-all w-full text-left"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-gray-700">Currently Online: {onlineUsers.length}</span>
        </div>
      </button>

      {isOpen && (
        <div className="mt-2 bg-white rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)] border border-gray-200 
          p-4 min-w-[200px] max-h-[300px] overflow-y-auto"
        >
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Online Users</h3>
          <ul className="space-y-2">
            {onlineUsers.map((user, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">{user}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default OnlineUsers
