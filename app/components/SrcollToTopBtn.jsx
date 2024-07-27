'use client'
import React from 'react'
import { FaArrowUp } from 'react-icons/fa'

const SrcollToTopBtn = () => {
    const [isVisible, setIsVisible] = React.useState(false)

    // function to scroll to top of the page
    const scrollToTop = () =>{
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        });
    }

    // show or hide the button based on scroll positon

const handleScroll = () =>{
    if(window.scrollY > 300){
        setIsVisible(true)
    }else{
        setIsVisible(false)
    }
};

// add scroll event listener when component mounts

React.useEffect(() => {
  window.addEventListener('scroll', handleScroll);

  return () => {
   window.removeEventListener('scroll',handleScroll)
  }
}, [])

  return (
    <>
    <button onClick={scrollToTop} className={`scrollToTop ${isVisible ? 'show': 'hide'}`}>
        <FaArrowUp/>
    </button>
    
    </>
  )
}

export default SrcollToTopBtn