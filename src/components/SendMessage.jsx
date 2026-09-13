/*send message into the chat (can contain attachments, text, etc.)*/

import { Button } from '@heroui/react'
import React from 'react'
import { FaArrowUp } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";



const SendMessage = () => {
  return (
    <div className='bg-[#2e2e2e] w-full flex items-center justify-between px-10 py-4'>

      <Button variant='' className='text-white aspect-square rounded-full p-3 hover:bg-[#4e4e4e] cursor-pointer'>
        <MdOutlineFileUpload />
      </Button>

      <textarea name="message" id="" placeholder="Ask anything..." className='bg-[#2e2e2e] text-white placeholder:text-white/40 focus:outline-none w-full px-5 py-1' rows={1}></textarea>

      <Button variant='' className='bg-white text-black aspect-square rounded-full p-3 hover:bg-[#dfd9d9] cursor-pointer'>
        <FaArrowUp />
      </Button>

    </div>
  )
}

export default SendMessage