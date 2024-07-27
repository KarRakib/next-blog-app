'use client'
import React, { useState } from 'react'
import { RiBarChartHorizontalLine } from 'react-icons/ri'
import { GoScreenFull } from 'react-icons/go'
import { BiExitFullscreen } from 'react-icons/bi'
import { IoIosNotifications } from "react-icons/io";
import { useSession } from 'next-auth/react'
const Header = () => {
   const{data:session} = useSession()
    const [isFullScreen, setIsFullScreen] = useState(false)
    const toggleFullScreen = () =>{
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
            .then(()=>{
                setIsFullScreen(true)
            })
        } else {
           if(document.exitFullscreen){
            document.exitFullscreen()
            .then(()=>{
                setIsFullScreen(false)
            })
           }
            
        }
    }
    return (
        <header className='header flex fle-sb'>
            <div className='logo flex gap-2'>
                <h1>Admin</h1>
                <div className="headerham flex flex-center">
                    <RiBarChartHorizontalLine />
                </div>
            </div>
            <div className='rightnav flex gap-2'>
                <div onClick={toggleFullScreen}>
                   { isFullScreen?<BiExitFullscreen/>:<GoScreenFull />}
                </div>
                <div className='notification'>
                    <IoIosNotifications/>
                </div>
                <div className='profilenav'>
                 {session?  <img src={session.user.image}  alt={session.user.name}/> : <img 
                    className='w-2 h-8 rounded-lg'
                    src="Kar_Rakib.png" alt="kar_rakib" />}
                </div>
            </div>
        </header>
    )
}

export default Header