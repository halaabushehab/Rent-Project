import React, { useState } from 'react';
import ChatBot from './ChatBot';
import 'src/ChatBotPopup.css';

function ChatBotPopup() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="chat-bot-popup">
      {isOpen && (
        <div className="chat-bot-window">
          <button className="close-button" onClick={toggleChatBot}>×</button>
          <ChatBot />
        </div>
      )}
      
      <button 
        className="chat-bot-toggle-button" 
        onClick={toggleChatBot}
      >
        {isOpen ? 'إغلاق المساعد' : 'فتح المساعد الآلي'}
      </button>
    </div>
  );
}

export default ChatBotPopup;
