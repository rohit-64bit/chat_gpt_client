/*
1st - to create a new chat
2nd - to create a project 
3rd - chat history along with chat title
4th - account settings and logout section
*/

import { Avatar, Button, Drawer, Popover } from '@heroui/react'
import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import Icon from '../assets/icon.png'
import { GoSidebarExpand, GoSidebarCollapse, GoGear } from "react-icons/go";
import { TiPlus } from "react-icons/ti";

const chatHistory = [
  {
    "id": "1",
    "title": "Learning Python",
    "messages": [
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
  },
  {
    "id": "2",
    "title": "Write a React Component",
    "messages": [
      {
        "role": "user",
        "content": "Can you create a simple React button component?",
        "timestamp": "2026-09-06T09:30:00+05:30"
      },
      {
        "role": "assistant",
        "content": "Sure. Here's a simple reusable Button component using React.",
        "timestamp": "2026-09-06T09:31:00+05:30"
      },
      {
        "role": "user",
        "content": "Can you add a loading state?",
        "timestamp": "2026-09-06T09:35:00+05:30"
      },
      {
        "role": "assistant",
        "content": "Yes. We can add an isLoading prop and disable the button while it is loading.",
        "timestamp": "2026-09-06T09:36:00+05:30"
      }
    ]
  },
  {
    "id": "3",
    "title": "Plan My Day",
    "messages": [
      {
        "role": "user",
        "content": "Help me organize my day.",
        "timestamp": "2026-09-05T18:00:00+05:30"
      },
      {
        "role": "assistant",
        "content": "Of course. Tell me the tasks you need to complete today and any fixed appointments.",
        "timestamp": "2026-09-05T18:01:00+05:30"
      },
      {
        "role": "user",
        "content": "I need to study, exercise, and finish a work assignment.",
        "timestamp": "2026-09-05T18:03:00+05:30"
      },
      {
        "role": "assistant",
        "content": "I'd suggest doing the work assignment first, followed by exercise, then a focused study session.",
        "timestamp": "2026-09-05T18:04:00+05:30"
      }
    ]
  },
  {
    "id": "4",
    "title": "JavaScript Help",
    "messages": [
      {
        "role": "user",
        "content": "What's the difference between let, const, and var?",
        "timestamp": "2026-09-05T15:20:00+05:30"
      },
      {
        "role": "assistant",
        "content": "The main differences involve scope, reassignment, and hoisting. In modern JavaScript, let and const are generally preferred over var.",
        "timestamp": "2026-09-05T15:21:00+05:30"
      },
      {
        "role": "user",
        "content": "Which one should I use most of the time?",
        "timestamp": "2026-09-05T15:23:00+05:30"
      },
      {
        "role": "assistant",
        "content": "Use const by default, and use let when you know the variable needs to be reassigned.",
        "timestamp": "2026-09-05T15:24:00+05:30"
      }
    ]
  },
  {
    "id": "5",
    "title": "Database Design",
    "messages": [
      {
        "role": "user",
        "content": "How should I design a database for a chat application?",
        "timestamp": "2026-09-05T13:00:00+05:30"
      },
      {
        "role": "assistant",
        "content": "A basic design could have users, conversations, and messages as separate entities.",
        "timestamp": "2026-09-05T13:01:00+05:30"
      },
      {
        "role": "user",
        "content": "What fields should the messages table contain?",
        "timestamp": "2026-09-05T13:03:00+05:30"
      },
      {
        "role": "assistant",
        "content": "You could include id, conversation_id, role, content, created_at, and optionally metadata such as token usage.",
        "timestamp": "2026-09-05T13:04:00+05:30"
      }
    ]
  },
  {
    "id": "6",
    "title": "Travel Planning",
    "messages": [
      {
        "role": "user",
        "content": "Help me plan a three-day trip.",
        "timestamp": "2026-09-04T20:00:00+05:30"
      },
      {
        "role": "assistant",
        "content": "Sure! Tell me your destination, budget, travel dates, and what kinds of activities you enjoy.",
        "timestamp": "2026-09-04T20:01:00+05:30"
      },
      {
        "role": "user",
        "content": "I'd like a relaxed trip with food, sightseeing, and some nature.",
        "timestamp": "2026-09-04T20:05:00+05:30"
      },
      {
        "role": "assistant",
        "content": "That sounds great. I'll structure the itinerary with a relaxed morning, sightseeing during the day, and local food experiences in the evening.",
        "timestamp": "2026-09-04T20:06:00+05:30"
      }
    ]
  },
  {
    "id": "7",
    "title": "Explain AI",
    "messages": [
      {
        "role": "user",
        "content": "Explain artificial intelligence in simple terms.",
        "timestamp": "2026-09-04T16:00:00+05:30"
      },
      {
        "role": "assistant",
        "content": "Artificial intelligence is technology that allows computers to perform tasks that normally require human-like abilities, such as understanding language, recognizing patterns, and making predictions.",
        "timestamp": "2026-09-04T16:01:00+05:30"
      },
      {
        "role": "user",
        "content": "How does machine learning fit into AI?",
        "timestamp": "2026-09-04T16:04:00+05:30"
      },
      {
        "role": "assistant",
        "content": "Machine learning is one approach to AI where systems learn patterns from data rather than being explicitly programmed for every situation.",
        "timestamp": "2026-09-04T16:05:00+05:30"
      }
    ]
  },
  {
    "id": "8",
    "title": "Fix My Code",
    "messages": [
      {
        "role": "user",
        "content": "My JavaScript function isn't returning the expected result.",
        "timestamp": "2026-09-03T19:00:00+05:30"
      },
      {
        "role": "assistant",
        "content": "Sure. Paste the function and an example of the input and expected output, and I'll help you find the issue.",
        "timestamp": "2026-09-03T19:01:00+05:30"
      },
      {
        "role": "user",
        "content": "I found the problem. I forgot to return the value.",
        "timestamp": "2026-09-03T19:05:00+05:30"
      },
      {
        "role": "assistant",
        "content": "Exactly. Adding the return statement should resolve it.",
        "timestamp": "2026-09-03T19:06:00+05:30"
      }
    ]
  },
  {
    "id": "9",
    "title": "Writing Assistant",
    "messages": [
      {
        "role": "user",
        "content": "Can you make this paragraph sound more professional?",
        "timestamp": "2026-09-03T14:00:00+05:30"
      },
      {
        "role": "assistant",
        "content": "Of course. Send me the paragraph and I'll rewrite it in a clear, professional tone.",
        "timestamp": "2026-09-03T14:01:00+05:30"
      },
      {
        "role": "user",
        "content": "I need to explain that the project is delayed because of unexpected technical issues.",
        "timestamp": "2026-09-03T14:03:00+05:30"
      },
      {
        "role": "assistant",
        "content": "You could say: 'The project timeline has been extended due to unforeseen technical challenges. We are actively addressing these issues and will provide an updated completion date shortly.'",
        "timestamp": "2026-09-03T14:04:00+05:30"
      }
    ]
  },
  {
    "id": "10",
    "title": "General Questions",
    "messages": [
      {
        "role": "user",
        "content": "What can you help me with?",
        "timestamp": "2026-09-02T11:00:00+05:30"
      },
      {
        "role": "assistant",
        "content": "I can help with coding, writing, brainstorming, learning, planning, analysis, research, and many other tasks.",
        "timestamp": "2026-09-02T11:01:00+05:30"
      },
      {
        "role": "user",
        "content": "Can I ask follow-up questions in the same chat?",
        "timestamp": "2026-09-02T11:03:00+05:30"
      },
      {
        "role": "assistant",
        "content": "Yes. I can use the context from the current conversation to help answer follow-up questions.",
        "timestamp": "2026-09-02T11:04:00+05:30"
      }
    ]
  }
]

const sampleProjects = [
  {
    id: 1,
    title: "Research",
    chats: [
      { id: 1, title: "My Chat 1" },
      { id: 2, title: "My Chat 2" },
      { id: 3, title: "My Chat 3" },
    ]
  },
  {
    id: 2,
    title: "Development",
    chats: [
      { id: 1, title: "My Chat 1" },
      { id: 2, title: "My Chat 2" },
      { id: 3, title: "My Chat 3" },
    ]
  },
  {
    id: 3,
    title: "Design",
    chats: [
      { id: 1, title: "My Chat 1" },
      { id: 2, title: "My Chat 2" },
      { id: 3, title: "My Chat 3" },
    ]
  },
  {
    id: 4,
    title: "Miscs",
    chats: [
      { id: 1, title: "My Chat 1" },
      { id: 2, title: "My Chat 2" },
      { id: 3, title: "My Chat 3" },
    ]
  }
]

const ChatOptions = ({ onClick, id, title }) => {
  return (
    <Button className='w-full flex justify-between items-center bg-[#2e2e2e] px-1 py-2 rounded-md hover:bg-[#3e3e3e] cursor-pointer text-white font-normal' onClick={onClick}>
      {title}
    </Button>
  )
}

const ProjectExpander = ({ onClick, isExpanded, id, projectTitle, chats }) => {

  return (
    <div className='flex flex-col gap-2'>

      <button className={`flex justify-between items-center bg-[#2e2e2e] p-2 rounded-md hover:bg-[#3e3e3e] cursor-pointer w-full text-white ${isExpanded ? 'bg-[#3e3e3e]' : ''}`} onClick={onClick}>
        {projectTitle}
      </button>

      {
        isExpanded && (
          <div className='flex flex-col gap-2 pl-1'>
            {chats?.map((chat) => (
              <ChatOptions key={chat.id} title={chat.title} id={chat.id} />
            ))}
          </div>
        )
      }

    </div>
  )

}

const AccountOptions = ({ variant }) => {
  return (
    <div variant="" className='flex justify-between items-center text-left w-full'>

      <div className='flex items-center gap-2'>

        {
          variant === "drawer" && (
            <Avatar>
              <Avatar.Image
                alt="Blue"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
              />
              <Avatar.Fallback>B</Avatar.Fallback>
            </Avatar>
          )
        }

        <div className='flex flex-col'>
          <div className='text-white font-medium text-md'>
            John Doe
          </div>
          <div className='text-white/80 text-xs'>
            john.doe@example.com
          </div>
        </div>

      </div>

      <Button variant='' className='bg-[#2e2e2e] rounded-xl hover:bg-[#3e3e3e] cursor-pointer'>
        <GoGear />
      </Button>

    </div>
  )
}

const SideBar = () => {

  const [isOpen, setIsOpen] = useState(false)

  const [activeProjectID, setActiveProjectID] = useState({
    id: null,
    isExpanded: false
  })

  const [activeChatID, setActiveChatID] = useState("new")

  return (
    <>
      <div className='bg-[#2e2e2e] w-max h-screen flex flex-col gap-5 py-5 px-2 justify-between items-center'>

        <div className='flex flex-col justify-between items-center gap-5'>

          <img src={Icon} alt="Logo" className='w-10' />

          <Button variant='' onClick={() => setIsOpen(prev => !prev)} className='bg-[#2e2e2e] rounded-xl hover:bg-[#3e3e3e] cursor-pointer'>
            <GoSidebarCollapse />
          </Button>

        </div>

        <Popover>
          <Button variant="" className="p-0 m-0">
            <Avatar>
              <Avatar.Image
                alt="Blue"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
              />
              <Avatar.Fallback>B</Avatar.Fallback>
            </Avatar>
          </Button>
          <Popover.Content className="w-64 bg-[#2e2e2e]">
            <Popover.Dialog className=''>
              <AccountOptions />
            </Popover.Dialog>
          </Popover.Content>
        </Popover>


      </div>
      <Drawer>
        <Drawer.Backdrop isOpen={isOpen} onOpenChange={setIsOpen} variant='transparent'>
          <Drawer.Content placement="left" className="bg-black *:w-80 shadow-xl shadow-black">
            <Drawer.Dialog className="bg-[#2e2e2e] flex flex-col h-screen gap-5">
              <Drawer.Header>
                <Drawer.Heading className='flex justify-between items-center'>

                  <img src={Logo} alt="" srcset="" className='w-32' />

                  <Button variant='' className='text-white p-0 m-0' onClick={() => setIsOpen(false)}>
                    <GoSidebarExpand size="30px" />
                  </Button>
                  {/* company logo */}
                  {/* close icon */}
                </Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body className='flex flex-col gap-5 h-full'>
                <div className='flex flex-col gap-2 h-full'>

                  <div className='flex flex-col gap-2'>
                    <Button variant="" className="w-full"> <TiPlus /> New Chat</Button>
                    <Button variant="" className="w-full"> <TiPlus /> Add Project</Button>
                  </div>

                  <div className='flex flex-col gap-2 overflow-y-auto h-full'>

                    <div>
                      <div className='text-white/70 text-md my-2 ml-2'>
                        Projects
                      </div>
                      {sampleProjects?.map((project) => (
                        <ProjectExpander
                          key={project.id}
                          onClick={() => setActiveProjectID({ id: project.id, isExpanded: !activeProjectID.isExpanded })}
                          isExpanded={activeProjectID.id === project.id && activeProjectID.isExpanded}
                          id={project.id}
                          projectTitle={project.title}
                          chats={project.chats}
                        />
                      ))}
                    </div>
                    <div>
                      <div className='text-white/70 text-md my-2 ml-2'>
                        Chats
                      </div>
                      {chatHistory?.map((chat) => (
                        <ChatOptions
                          key={chat.id}
                          onClick={() => setActiveChatID(chat.id)}
                          id={chat.id}
                          title={chat.title}
                        />
                      ))}
                    </div>

                  </div>

                </div>
              </Drawer.Body>
              <Drawer.Footer>

                <AccountOptions variant="drawer" />

              </Drawer.Footer>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  )
}

export default SideBar