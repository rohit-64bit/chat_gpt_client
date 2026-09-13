/*
chat history properly
*/

import React from 'react'
import Message from './Message'

const samples = [
  {
    "role": "user",
    "content": "Can you help me learn Python?",
    "timestamp": "2026-09-06T10:00:00+05:30"
  },
  {
    "role": "assistant",
    "content": "Absolutely! We can start with the basics and gradually move into more advanced topics.",
    "timestamp": "2026-09-06T10:01:00+05:30"
  },
  {
    "role": "user",
    "content": "What should I learn first?",
    "timestamp": "2026-09-06T10:02:00+05:30"
  },
  {
    "role": "assistant",
    "content": "Start with variables, data types, conditions, loops, functions, and then move on to classes and modules.",
    "timestamp": "2026-09-06T10:03:00+05:30"
  }
]

const ChatRender = () => {
  return (
    <div className='bg-[#2e2e2e] w-full h-full px-10 py-4 overflow-x-auto'>

      {samples.map((message, index) => (
        <Message key={index} message={message} />
      ))}

    </div>
  )
}

export default ChatRender