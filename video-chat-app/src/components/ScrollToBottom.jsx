const ScrollToBottom = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-[7rem] left-1/2 transform -translate-x-1/2 
        bg-gray-900/60 text-white px-3 py-1.5 rounded-full text-sm
        shadow-lg hover:bg-gray-900/70 transition-all duration-200 
        flex items-center gap-1.5 animate-fade-in group"
    >
      <span className="text-white/90 group-hover:text-white">New message</span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-4 w-4" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path 
          fillRule="evenodd" 
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
          clipRule="evenodd" 
        />
      </svg>
    </button>
  )
}

export default ScrollToBottom
