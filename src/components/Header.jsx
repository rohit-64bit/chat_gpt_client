/*
1st - chat details (chat title, inside project, chat actions - [delete, rename, export, share, etc])
*/

import React from 'react'
import ProjectCapsule from './ProjectCapsule'
import { Button, Tooltip, useOverlayState } from '@heroui/react'
import { RiShareForward2Line } from "react-icons/ri";
import { TbBookDownload } from "react-icons/tb";
import { AiOutlineCloudDownload, AiOutlineDelete, AiOutlineSetting } from "react-icons/ai";
import ModalStyle from './ModalStyle';

const Header = () => {

  const settingsState = useOverlayState()
  const deleteState = useOverlayState()
  const exportState = useOverlayState()
  const shareState = useOverlayState()

  return (
    <div className="bg-[#2e2e2e] w-full flex items-center justify-between px-10 py-4">

      <div className="flex flex-col gap-2">

        <div className="font-medium truncate max-w-200">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis sint beatae culpa consequatur provident Lorem ipsum, dolor sit amet consectetur adipisicing elit.</div>

        <ProjectCapsule />

      </div>

      {/* action group */}
      <div className='flex gap-2 items-center w-max'>

        <Tooltip delay={0}>

          <Button className='w-full flex justify-center items-center bg-[#2e2e2e] p-2 rounded-md hover:bg-[#3e3e3e] cursor-pointer text-white font-normal aspect-square' variant='' onClick={settingsState.toggle}>

            <AiOutlineSetting className='scale-150' />

          </Button>

          <Tooltip.Content showArrow placement="top">
            <Tooltip.Arrow />
            <p className='text-xs text-black'>Chat Settings</p>
          </Tooltip.Content>

        </Tooltip>

        <Tooltip delay={0}>

          <Button className='w-full flex justify-center items-center bg-[#2e2e2e] p-2 rounded-md hover:bg-[#3e3e3e] cursor-pointer text-white font-normal aspect-square' variant='' onClick={deleteState.toggle}>

            <AiOutlineDelete className='scale-150' />

          </Button>

          <Tooltip.Content showArrow placement="top">
            <Tooltip.Arrow />
            <p className='text-xs text-black'>Delete Chat</p>
          </Tooltip.Content>

        </Tooltip>

        <Tooltip delay={0}>

          <Button className='w-full flex justify-center items-center bg-[#2e2e2e] p-2 rounded-md hover:bg-[#3e3e3e] cursor-pointer text-white font-normal aspect-square' variant='' onClick={exportState.toggle}>

            <AiOutlineCloudDownload className='scale-150' />

          </Button>

          <Tooltip.Content showArrow placement="top">
            <Tooltip.Arrow />
            <p className='text-xs text-black'>Export chat to PDF</p>
          </Tooltip.Content>

        </Tooltip>

        <Tooltip delay={0}>

          <Button className='w-full flex justify-center items-center bg-[#2e2e2e] p-2 rounded-md hover:bg-[#3e3e3e] cursor-pointer text-white font-normal aspect-square' variant='' onClick={shareState.toggle}>

            <RiShareForward2Line className='scale-150' />

          </Button>

          <Tooltip.Content showArrow placement="top">
            <Tooltip.Arrow />
            <p className='text-xs text-black'>Share Chat</p>
          </Tooltip.Content>

        </Tooltip>

      </div>

      <ModalStyle modalState={settingsState} modalHeader={
        <div>
          <h2 className='font-medium'>Chat Settings</h2>
          <p className='text-xs text-white/40'>Manage your chat preferences here.</p>
        </div>
      }>
        <form action="" className='modal-form'>
          <input type="text" name="" id="" placeholder="Modify chat title" />
          <select name="" id="">
            <option value="">Select project</option>
          </select>
          <Button type="submit">Save</Button>
        </form>
      </ModalStyle>

      <ModalStyle modalState={deleteState} modalHeader={
        <div>
          <h2 className='font-medium'>Delete Chat</h2>
          <p className='text-xs text-white/40'>Are you sure you want to delete this chat? This action cannot be undone.</p>
        </div>
      } modalFooter={
        <div className='flex gap-2'>
          <Button variant='' onClick={deleteState.toggle}>Cancel</Button>
          <Button variant='' className="modal-button">Delete</Button>
        </div>
      } />

      <ModalStyle modalState={exportState} modalHeader={
        <div>
          <h2 className='font-medium'>Export Chat</h2>
          <p className='text-xs text-white/40'>You can export this chat to a PDF file.</p>
        </div>
      }
        modalFooter={
          <div className='flex gap-2'>
            <Button variant='' onClick={exportState.toggle}>Cancel</Button>
            <Button variant='' className="modal-button">Export</Button>
          </div>
        } />

      <ModalStyle modalState={shareState}
        modalHeader={
          <div>
            <h2 className='font-medium'>Share Chat</h2>
            <p className='text-xs text-white/40'>You can share this chat with others via a link. The link will be public and can be shared with anyone. They will be able to view and continue the chat but not any new messages.</p>
          </div>
        }
        modalFooter={
          <div className='flex gap-2'>
            <Button variant='' onClick={shareState.toggle}>Cancel</Button>
            <Button variant='' className="modal-button">Generate public link</Button>
          </div>
        } />

    </div>
  )
}

export default Header