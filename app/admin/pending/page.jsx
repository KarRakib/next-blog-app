'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader';
import { BsPostcard } from 'react-icons/bs';
import useFetchData from '../../hooks/useFetchData';
import DataLoader from '../../components/DataLoader';

const page = () => {

    const [allData, loading] = useFetchData('/api/blogapi');
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(4);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const indexOfLastBlog = currentPage * perPage;
    const indexOfFirstBlog = indexOfLastBlog - perPage;
    const currentBlog = allData.slice(indexOfFirstBlog, indexOfLastBlog);
    const draftBlogs = currentBlog.filter(item => item.status === 'draft')
    const allBlog = allData.length;
    const pageNumbers = [];
    for (let index = 1; index <= Math.ceil(allBlog / perPage); index++) {
        pageNumbers.push(index);

    }
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

    if (session) {
        return (
            <>
                <div className='blogpage'>
                    <div className="titledashboard flex flex-sb">
                        <div  date-aos='fade-right'>
                            <h2>All Draft <span>Blogs</span></h2>
                            <h3>Admin PANEl</h3>
                        </div>
                        <div className="breadcrumb"  date-aos='fade-left'>
                            <BsPostcard /> <span>/</span> <span>Draft</span>
                        </div>
                    </div>
                    <div className="blogstable"  date-aos='fade-up'>
                        <table className='table table-styling' >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>title</th>
                                    <th>Slug</th>
                                    <th>Edit / Detete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? <>
                                        <tr>
                                            <td>
                                                <DataLoader />
                                            </td>
                                        </tr>
                                    </> : <>
                                        {
                                            draftBlogs.length === 0 ? (
                                                <tr>
                                                    <td colSpan={4} className='text-center'>
                                                        No Draft Blog
                                                    </td>
                                                </tr>
                                            ) : (
                                                draftBlogs.map((blog, i) => (
                                                    <tr key={blog._id}>
                                                        <td>{indexOfFirstBlog + i +1}</td>
                                                        <td>{blog.title}</td>
                                                        <td>{blog.slug}</td>
                                                        <td>
                                                            <div className='flex gap-2 flex-center'>
                                                                <Link href='/blogs/edit/id' ><button title='edit' ><FaEdit /> </button> </Link>
                                                                <Link href='/blogs/delete/id' ><button title='edit' ><RiDeleteBackFill />
                                                                </button> </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )
                                        }


                                    </>
                                }

                            </tbody>
                        </table>
                        {/* pagenition */}
                        {draftBlogs.length === 0 ? (
                            ''
                        ) : (
                            <div className='blogpagination'>
                                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                    Previus
                                </button>
                                {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length))
                                    .map(number => (
                                        <button key={number} onClick={() => paginate(number)} className={`${currentPage === number ? 'active' : ''}`}>
                                            Next
                                        </button>
                                    ))}

                                <button onClick={() => paginate(currentPage + 1)} disabled={currentBlog.length < perPage}>
                                    Next
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </>
        )
    }
}

export default page