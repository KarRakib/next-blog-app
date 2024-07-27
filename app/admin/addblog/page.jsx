'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import Loader from '../../components/Loader';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import Blog from '../../components/Blog';

const page = () => {
  
    const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() => {
      if (!session) {
        router.push('/login');
      }
    }, [session, router]);
    if (status === 'loading') {
        return (
          <div className='loadingdata flex flex-col flex-center wh_100'>
            <Loader />
          </div>
        );
      }
    
 if(session){
    return (
        <>
          <div className='addblogspage'>
          <div className="titledashboard flex flex-sb">
            <div date-aos='fade-right'>
              <h2>Add <span>Blog</span></h2>
              <h3>Admin PANEl</h3>
            </div>
            <div className="breadcrumb" date-aos='fade-left'>
              <MdOutlineAddPhotoAlternate /> <span>/</span> <span>Add Blog</span>
            </div>
          </div>
              <div className="blogsadd" >
                <Blog/>
              </div>
          </div>
        </>
        )
 }
}

export default page