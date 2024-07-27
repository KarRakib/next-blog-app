'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import Loader from '../components/Loader'
import { useRouter } from 'next/navigation'

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  console.log(process.env.NEXT_PUBLIC_GOOGLE_SECRET);
  console.log(session);

  if (status === 'loading') {
    return (
      <div className='loadingdata flex flex-col flex-center wh_100'>
        <Loader />
      </div>
    );
  }

  if (!session) {
    return (
      <div className='loginfront flex flex-center flex-col full-w'>
        <Image src="/kar_rakib.png" width={250} height={250} alt='karrakib' />
        <h1>Welcome Admin of the blogpage 🤝</h1>
        <p>visit our main website <a href="www.kar.com">rakib</a></p>
      
        <button onClick={() => signIn('google')} className='bg-white px-8 py-8 flex gap-2 items-center'>
          <FcGoogle size={30} /> Sign In with Google
        </button>
      </div>
    );
  }

  // You can return null or any other component if the session is present
  // since the user will be redirected to the home page anyway
  return null;
}

export default Page;
