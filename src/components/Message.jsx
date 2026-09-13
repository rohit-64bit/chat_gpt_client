/*
message type sent by user/sent by chatbot ( can have attachments, text, etc) 
*/

import React from 'react'

const Message = ({ message }) => {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`} >

      <div className={`bg-[#3e3e3e] text-white p-4 rounded-md max-w-[60%] ${message.role === 'user' ? 'rounded-tr-none bg-[#0153a0]' : 'rounded-tl-none'}`}>
        <p className='text-sm'>{message.content}</p>
        <p className={`text-xs text-white/40 mt-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>{new Date(message.timestamp).toLocaleString()}</p>
      </div>

    </div>
  )
}

export default Message