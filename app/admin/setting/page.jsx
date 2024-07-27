import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import Loader from '../../components/Loader';
import { signOut, useSession } from 'next-auth/react';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineAccountCircle } from 'react-icons/md';

const page = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push('/login')
        }

    }, [router, session]);
    if (status === 'loading') {
        return (
            <div className='loadingdata flex flex-col flex-center wh_100'>
                <Loader />
            </div>
        );
    }

    const logOut = async () => {
        await signOut();
        await router.push('/login');
    }
    if (session) {
        return (
            <>
                <div className='settingpage'>
                    <div className="titledashboard flex flex-sb">
                        <div  date-aos='fade-right'>
                            <h2>Setting <span>Dashboard</span></h2>
                            <h3>Admin PANEl</h3>
                        </div>
                        <div className="breadcrumb"  date-aos='fade-left'>
                            <IoSettingsOutline /> <span>/</span> <span>Setting</span>
                        </div>
                    </div>
                    <div className="profilesettings">
                        <div className="leftprofile_details flex"  date-aos='fade-up'>
                            <img src="/Kar_Rakib.png" alt="kar" />
                            <div className="w-100">
                                <div className='flex flex-sb flex-left mt-2'>
                                    <h2>My Profile</h2>
                                    <h3>Kar Rakib <br /> Programmer </h3>
                                </div>
                                <div className="flex flex-sb mt-2">
                                    <h3>Phone:</h3>
                                    <input type="number" defaultValue='=8801312110827' />
                                </div>
                                <div className="mt-2">
                                    <input type="email" defaultValue='rakibkazi2222@gmail.com' />
                                </div>
                                <div className="flex flex-center w-100 mt-2">
                                            <button>Save</button>
                                </div>
                            </div>
                        </div>
                        <div className="rightlogoutsec"  date-aos='fade-up'>
                            <div className="topaccoutbox">
                                <h2 className="flex flex-sb">
                                    My Account <MdOutlineAccountCircle/>
                                </h2>
                                <hr />
                                <div className="flex flex-sh mt-1">
                                    <h3>Active Accout <br /> <span>Email</span> </h3>
                                    <button onClick={logOut}>Log Out</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default page