
/*
actual chat layout with chat window and input box
chat history on left side and chat window on right side
*/

import React from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import ChatRender from '../components/ChatRender'
import SendMessage from '../components/SendMessage'

const ChatLayout = () => {
    return (
        <div className='h-screen flex'>

            <SideBar />

            <div className='flex flex-col'>

                <Header />
                <ChatRender />
                <SendMessage />

            </div>

        </div>
    )
}

export default ChatLayout