import { Button, Modal } from '@heroui/react'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const ModalStyle = ({ children, modalState, className, modalHeader, modalFooter }) => {
    return (
        <Modal.Backdrop isOpen={modalState.isOpen} onOpenChange={modalState.setOpen}>
            <Modal.Container>
                <Modal.Dialog className={`bg-[#2e2e2e] rounded-2xl shadow-lg min-w-1/4 h-max ${className}`}>

                    {/* <Modal.CloseTrigger /> */}

                    <Modal.Header className="flex flex-row justify-between items-start">

                        {modalHeader}

                        <Button className='w-max flex justify-center items-center bg-[#2e2e2e] p-2 rounded-md hover:bg-[#3e3e3e] cursor-pointer text-white font-normal aspect-square' variant='' onClick={modalState.toggle}>

                            <AiOutlineClose className='scale-100' />

                        </Button>

                    </Modal.Header>

                    <Modal.Body>
                        {children}
                    </Modal.Body>

                    <Modal.Footer>
                        {modalFooter}
                    </Modal.Footer>

                </Modal.Dialog>
            </Modal.Container>
        </Modal.Backdrop>
    )
}

export default ModalStyle