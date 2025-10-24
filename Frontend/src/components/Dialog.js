import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

const Dialog = ({ type = 'modal', title, showModal, hideModals, children, widthModal, icons, ...props }) => {
   return (
     <div 
       className={`fixed top-0 left-0 z-[9999] backdrop-opacity-10 w-full h-full flex flex-1 justify-center items-center bg-black bg-opacity-50 transition-all duration-300 ease-in-out overflow-auto
         ${showModal ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
       onClick={() => hideModals(false)}
     >
       <div 
         className={`relative bg-white rounded-lg w-[${widthModal}] px-5 py-8 shadow-md border border-1 space-x-3 transition-all duration-300 ease-in-out
           ${showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
         onClick={(event) => event.stopPropagation()}
       >
         <button className="absolute right-4 top-4" onClick={() => hideModals(false)}>
           <FontAwesomeIcon icon={faTimes} className="text-gray-200 text-lg" />
         </button>
         {children}
       </div>
     </div>
   )
}

export default Dialog