'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import useFetchData from '../hooks/useFetchData'
import axios from 'axios'
import { FaGithub, FaHtml5, FaInstagram, FaTwitter } from 'react-icons/fa'
import { FiDatabase } from 'react-icons/fi'
import { TbBrandNextjs } from 'react-icons/tb'
import { AiOutlineDeploymentUnit } from 'react-icons/ai'


const Home = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage] = useState(2)

  const { data: allData, loading, error } = useFetchData(true, 'api/getblog');
  // const { allData, setAllData } = useState([])
  // useEffect(()=>{
  //   axios.get('/api/getblog')
  //   .then(res=>{
  //     console.log('response',res);
  //   })
  // },[])
  console.log('all', allData);
  // pagination 
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  const indexOfLastBlog = currentPage * perPage;
  const indexOfFirstBlog = indexOfLastBlog - perPage;
  const currentBlogs = allData?.slice(indexOfFirstBlog, indexOfLastBlog);
  const allBlog = allData?.length;

  const publishedBlogs = currentBlogs?.filter(item => item.status === 'publish');
  console.log(publishedBlogs);
  const pageNumbers = [];
  for (let index = 1; index < Math.ceil(allBlog / perPage); index++) {
    pageNumbers.push(index);

  }
  const extractFirstImageUrl = (markdownContent) => {
    if (!markdownContent || typeof markdownContent !== 'string') {
      return null;
    }
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
  }
  return (
    <>
      <section className='header_data_section'>
        <div className="container flex flex-sb w-100">
          <div className="leftheader_info">
            <h1>Hi, I'm  <span> Kar Rakib</span>. <br />
              Web-Developer & Programmer
            </h1>
            <h3> Specialized in JavaScript and TypeScript</h3>
            <div className="flex gap-2">
              <Link href='/contact'> <button>Contact Me</button> </Link>
              <Link href='/about'><button> About Me </button> </Link>
            </div>
          </div>
          <div className="rightheader_img">
            <div className="image_bg_top"></div>
            <div className="image_bg_top2"></div>
            <img src="/Kar_Rakib.png" alt="kar_rakib" />
          </div>
        </div>

      </section>
      <section className='main_blog_section'>
        <div className="conatiner flex flex-sb flex-left flex-wrap">
          <div className="leftblog_sec">
            <h2>Recently Published</h2>
            <div className="blogs_sec">
              {loading ? <div className='wh_100 flex flex-center mt-2 pb-5'>
                <div className='loader'></div>
              </div> : <>  {
                publishedBlogs?.map((blog) => {
                  const firstImagUrl = extractFirstImageUrl(blog.description);
                  return <div className='blog' key={blog._id}>
                    <div className="blogimg">
                      <Link href={`/blog/${blog.slug}`}>
                        <img className='w-60 h-48' src={firstImagUrl || "/Kar_Rakib.png"} alt={blog.title} />
                      </Link>
                      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut vero cum sint eaque nulla expedita?</p>
                      <div className="blogauthor flex gap-1">
                        <div className="blogaimg">
                          <img src='/Kar_Rakib.png' className='w-24 h-20' alt="kar" />
                        </div>
                        <div className="flex flex-col flex-left gap-05">
                          <h4>Kar Rakib </h4>
                          <span> {new Date(blog.createdAt).toLocaleDateString('eng-US', { month: 'long', day: 'numeric', year: 'numeric' })} </span>
                        </div>
                      </div>
                    </div>
                  </div>
                })
              }
              </>
              }
            </div>
            <div className="blogpagination">
              <div className="blogpagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(
                  number => (
                    <button key={number} onClick={() => paginate(number)}
                      className={currentPage === number ? 'active' : ''}
                    > {number} </button>
                  )
                )}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage.length < perPage}>Next</button>
              </div>

            </div>
          </div>
          <div className="rightblog_info">
            <div className="topics_sec">
              <h2> Topics</h2>
              <div className="topics_list">
                <Link href='/topics/htmlcssjs'>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaHtml5 />
                    </div>
                    <h3> Html, Css & JavaScript</h3>
                  </div>
                </Link>
                <Link href='/topics/nextjs'>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <TbBrandNextjs />
                    </div>
                    <h3> Next Js,React Js</h3>
                  </div>
                </Link>
                <Link href='/topics/database'>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FiDatabase />
                    </div>
                    <h3> Database</h3>
                  </div>
                </Link>
                <Link href='/topics/deployment'>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <AiOutlineDeploymentUnit />
                    </div>
                    <h3> Deployment</h3>
                  </div>
                </Link>

              </div>
            </div>
            <div className="tags_sec mt-3">
              <h2>Tags</h2>
              <div className="tags_list">
                <Link href='/tag/html'> #html </Link>
                <Link href='/tag/css'> #css </Link>
                <Link href='/tag/javascript'> #javaScript </Link>
                <Link href='/tag/nextjs'> #nextjs </Link>
                <Link href='/tag/reactjs'> #reactjs </Link>
                <Link href='/tag/database'> #html </Link>
              </div>
            </div>
            <div className="letstalk_sec mt-3">
              <h2>Let's Talk</h2>
              <div className="talk_sec">
                <h4> Want to find out how i can solve problems specific to your business?  let't talk</h4>
                <div className="social_talk flex flex-center gap-1 mt-2">
                  <div className="st_icon">
                    <FaGithub />
                  </div>
                  <div className="st_icon">
                    <FaTwitter />
                  </div>
                  <div className="st_icon">
                    <FaInstagram />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home;