/*
shows chat history in grid format with chat title and recent msg short details 
allows user to click on chat title to open chat in chat window
allows user to start a new chat with new title
*/

import { TbPencilPlus } from "react-icons/tb";
import { CiFolderOn } from "react-icons/ci";
import React from 'react'
import ProjectCapsule from "../components/ProjectCapsule";
import { useNavigate } from "react-router-dom";

const NewChat = () => {

  const navigate = useNavigate();

  return (
    <button onClick={() => {
      navigate("/chat/new")
    }} className='chat-card bg-white/90 hover:bg-white flex items-center justify-center text-black'>
      <div className='text-sm font-medium flex gap-1 items-center justify-center -ml-4'><TbPencilPlus fontSize={20} /> New Chat</div>
    </button>
  )
}

const ChatCard = ({ title, recentMsg }) => {

  return (
    <div className='chat-card bg-black/40 hover:bg-black/70 flex flex-col items-start justify-start text-white gap-2'>

      <div className='flex flex-col gap-1 items-start justify-start w-full h-full p-2'>
        {/* truncates after first line */}
        <div className='font-medium truncate w-full'>{title}</div>
        {/* truncated when needed */}
        <div className='text-xs text-gray-500 truncate w-full h-full'>{recentMsg}</div>
      </div>

      <ProjectCapsule />

    </div>
  )

}

const Home = () => {
  return (
    <div className='p-10 h-screen'>

      <h1 className='text-2xl font-medium'>Welcome to the Chat App</h1>

      <div className='grid md:grid-cols-3 xl:grid-cols-4 gap-5 mt-10 h-[90%] overflow-y-auto'>

        <NewChat />

        <ChatCard title="Chat 1" recentMsg="This is the recent message for Chat 1" />

        <ChatCard title="Chat 2" recentMsg="This is the recent message for Chat 2" />

        <ChatCard title="Chat 3" recentMsg="This is the recent message for Chat 3" />

      </div>

    </div>
  )
}

export default Home