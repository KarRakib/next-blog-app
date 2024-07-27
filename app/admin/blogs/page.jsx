
"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader';
import { BsPostcard } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import {FaEdit} from 'react-icons/fa'
import {RiDeleteBackFill} from 'react-icons/ri'
import Link from 'next/link';
import useFetchData from '../../hooks/useFetchData';
import DataLoader from '../../components/DataLoader';
import axios from 'axios';

const page = () => {
  const [searchQuery, setSearchQuery] = useState('')
  console.log(searchQuery);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const fetchBlogData = async () => {
      

      try {
          const res = await axios.get('/api/blogapi');
          const allData = res.data;
          setAllData(allData);
          setLoading(false);
      } catch (error) {
          console.error('Error fetching blog data:', error);
          setLoading(false);
      }
  };

  fetchBlogData();
  },[])

  // const [allData, loading] = useFetchData('/api/blogapi');
  // const { data: allData, loading, error } = useFetchData(true, 'api/blogapi');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(4);

  const paginate = (pageNumber) => {
      setCurrentPage(pageNumber)
  }
  const indexOfLastBlog = currentPage * perPage;
  const indexOfFirstBlog = indexOfLastBlog - perPage;
  const currentBlog = allData.slice(indexOfFirstBlog, indexOfLastBlog);
  const publishBlogs = currentBlog.filter(item => item.status === 'publish')
  const allBlog = allData.length;
  const pageNumbers = [];
  for (let index = 1; index <= Math.ceil(allBlog / perPage); index++) {
      pageNumbers.push(index);

  }
  const { data: session, status } = useSession();
  const router = useRouter();
  // useEffect(() => {
  //   if (!session) {
  //     router.push('/login');
  //   }
  // }, [session, router]);



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
            <div date-aos='fade-right'>
              <h2>All Published <span>Blogs</span></h2>
              <h3>Admin PANEl</h3>
            </div>
            <div className="breadcrumb" date-aos='fade-left'>
              <BsPostcard /> <span>/</span> <span>Blogs</span>
            </div>
          </div>
          <div className="blogstable" date-aos='fade-up'>
            <div className='flex gap-2 mb-1'>
              <h2>Search Blogs:</h2>
              <input value={searchQuery} type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='search by title ...'
              />
            </div>
            <table className='table table-styling'>
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
                                            publishBlogs.length === 0 ? (
                                                <tr>
                                                    <td colSpan={4} className='text-center'>
                                                        No Publish Blog
                                                    </td>
                                                </tr>
                                            ) : (
                                                publishBlogs.map((blog, i) => (
                                                    <tr key={blog._id}>
                                                        <td>{indexOfFirstBlog + i +1}</td>
                                                        <td>{blog.title}</td>
                                                        <td>{blog.slug}</td>
                                                        <td>
                                                            <div className='flex gap-2 flex-center'>
                                                                <Link href='/blog/edit/id' ><button title='edit' ><FaEdit /> </button> </Link>
                                                                <Link href='/blog/delete/id' ><button title='edit' ><RiDeleteBackFill />
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
            {publishBlogs.length === 0 ? (
                            ''
                        ) : (
                            <div className='blogpagination'>
                                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                    Previus
                                </button>
                                {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length))
                                    .map(number => (
                                        <button key={number} onClick={() => paginate(number)} className={`${currentPage === number ? 'active' : ''}`}>
                                          {number}
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