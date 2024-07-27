'use client'
import axios from 'axios'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const CagegoryPage = () => {
    const [loading, setLoading] = React.useState(true)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [perPage] = React.useState(5)
    const [blog, setBlog] = React.useState([])
    const router = useRouter();
    const pathname = usePathname();
    const tags = pathname.split('/').pop();
    console.log(tags);

    useEffect(() => {
        const fetchBlogData = async () => {
            if (!tags) {
                router.push('/404');
                return;
            }

            try {
                const res = await axios.get(`/api/getblog?tags=${tags}`);
                const allData = res.data;
                setBlog(allData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog data:', error);
                setLoading(false);
            }
        };

        fetchBlogData();
    }, [tags, router]);

// const res = await axios.get(`api/getblog?tags=${tags}`);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const indexOfLastBlog = currentPage * perPage;
    const indexOfFirstBlog = indexOfLastBlog - perPage;
    const currentBlogs = blog?.slice(indexOfFirstBlog, indexOfLastBlog);
    const allBlog = blog?.length;

    const pageNumbers = [];
    for (let index = 1; index < Math.ceil(allBlog / perPage); index++) {
        pageNumbers.push(index);
    }
    const publishedBlogs = blog.filter(item => item.status === 'publish')
    const extractFirstImageUrl = (markdownContent) => {
        if (!markdownContent || typeof markdownContent !== 'string') {
            return null;
        }
        const regex = /!\[.*?\]\((.*?)\)/;
        const match = markdownContent.match(regex);
        return match ? match[1] : null;
    }
    return (
        <div className='blogpage'>
            <div className="category_slug">
                <div className="container">
                    <div className="category_title">
                        <div className="flex gap-1">
                            <h1>{loading ? <div> loading ...</div>: publishedBlogs?
                        publishedBlogs && publishedBlogs[0]?.tags: publishedBlogs &&
                        publishedBlogs.tags}</h1>
                            <span>{loading ? <div>0</div>: publishedBlogs.filter(blog=>blog.tags).length}</span>
                        </div>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores velit eos pariatur itaque, expedita animi, ullam molestias natus, voluptatum aliquam atque.</p>
                    </div>
                    <div className="category_blos mt-3">
                        {loading ? <>
                            <div className="wh-100 flex flex-center mt-2 pb-5">
                                <div className="loader"></div>
                            </div>
                        </> : <>
                            {
                                publishedBlogs?.map((blog) => {
                                    const firstImagUrl = extractFirstImageUrl(blog.description);
                                    return <div className='cate_blog' key={blog._id}>
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

                                })}
                        </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CagegoryPage