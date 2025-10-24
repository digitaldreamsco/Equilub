import React, {useState} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"


const Dialog = ({ type = 'modal', title, showModal, hideModals, children, widthModal, icons, ...props }) => {
   return(
    showModal ? (
        <div className={`fixed top-0 left-0 z-[9999] w-full h-full flex flex-1 justify-center items-center ${showModal ? 'scale-100 opacity-100 transition delay-700 duration-1000 ease-in-out': 'scale-125 opacity-0 transition delay-700 duration-1000 ease-in-out'} `} onClick={(event) => event.stopPropagation()}>
            <div className={`relative bg-white rounded-lg w-[${widthModal}] px-5 py-8 shadow-md border border-1 space-x-3  `}>
                <button className="absolute right-4 top-4 " onClick={() => hideModals(false)}><FontAwesomeIcon icon={faTimes} className="text-gray-200 text-lg" ></FontAwesomeIcon></button>
                {children}
            </div>
            
        </div>
    ) : null
    
   )
}
export default Dialog