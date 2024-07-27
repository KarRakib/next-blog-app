import Link from 'next/link'
import React from 'react'
import { IoHome,IoSettingsOutline } from 'react-icons/io5'
import { BsPostcard } from 'react-icons/bs'
import { MdOutlineAddPhotoAlternate ,MdOutlinePending} from 'react-icons/md'


const SideBar = () => {
    return (
        <aside className='asideleft'>
            <ul>
                <Link href="/admin">
                    <li className='navactive'>
                        <IoHome />
                        <span>Dashboard</span>
                    </li>
                </Link>
                <Link href="/admin/blogs">
                    <li className='navactive'>
                        <BsPostcard />
                        <span>Blogs</span>
                    </li>
                </Link>
                <Link href="/admin/addblog">
                    <li className='navactive'>
                        <MdOutlineAddPhotoAlternate />
                        <span>AddBlog</span>
                    </li>
                </Link>
                <Link href="/admin/pending">
                    <li className='navactive'>
                        <MdOutlinePending />
                        <span>Pending</span>
                    </li>
                </Link>
                <Link href="/admin/setting">
                    <li className='navactive'>
                        <IoSettingsOutline />
                        <span>Setings</span>
                    </li>
                </Link>
            </ul>
        </aside>
    )
}

export default SideBar