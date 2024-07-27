'use client'
import axios from 'axios';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiOutlineDeploymentUnit } from 'react-icons/ai';
import { FaFacebook, FaGithub, FaHtml5, FaInstagram } from 'react-icons/fa';
import { FiDatabase } from 'react-icons/fi';
import { TbBrandNextjs } from 'react-icons/tb';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { allyDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm'

const BlogSlug = () => {
    const pathname = usePathname();
    const slug = pathname.split('/').pop();
    console.log(slug);
    const [blog, setBlog] = React.useState([]); // Change initial state to null
    const [loader, setLoader] = React.useState(true);

    React.useEffect(() => {
        if (slug) {
            axios.get(`/api/getblog?slug=${slug}`)
                .then(res => {
                    const allData = res.data;
                    setBlog(allData);
                    setLoader(false);
                })
                .catch(error => {
                    console.log('error fetching slug data', error);
                    setLoader(false); // Ensure loader is turned off even on error
                });
        }
    }, [slug]);

    const Code = ({ node, inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');
        const [copied, setCopied] = React.useState();

        const handleCopy = () => {
            navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => {
                setCopied(false)
            }, 3000)
        }
        if (inline) {
            return <code> {children}</code>
        } else if (match) {
            return (
                <div style={{ position: 'relative' }}>
                    <SyntaxHighlighter 
                        language={match}
                        PreTag='pre'
                        {...props}
                        codeTagProps={{ style: { padding: '0', borderRadius: '5px', overflowX: 'auto', whiteSpace: 'pre-wrap' } }}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                    <button style={{
                        position: 'absolute', top: '0', right: '0', zIndex: '1',
                        background: '#3d3d3d', color: '#fff', padding: '10px'
                    }} onClick={handleCopy}>
                        {copied ? 'Copied' : 'Cope code'}
                    </button>
                </div>
            )
        } else {
            return (
                <code className='md-post-code' {...props}>
                    {children}
                </code>
            )
        }
    }
    return (
        <div className='slugpage'>
            <div className="container">
                <div className="topslug_titles">
                    <h1 className="slugtitle">
                        {loader ? <div> loading...</div> : blog && blog[0]?.title}
                    </h1>
                    <h5> By  <span>Programer code </span> . Published in <span>{loader ? <div> loading...</div> :
                        blog && blog[0]?.blogCategory} </span> .
                        {blog && new Date(blog[0]?.createdAt).toLocaleDateString('eng-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        <span> . 1 min read</span>
                    </h5>
                </div>
                <div className="flex flex-sb flex-left pb-5 flex-wrap">
                    <div className="leftblog_data_markdown">
                        {loader ? <div className='wh-100 flex flex-center mt-3'> <div className="loader"></div>
                        </div> : <>
                            <div className="w-100 blogcontent">
                                {/* <ReactMarkdown
                                    remarkPlugins={{ remarkGfm }}
                                    components={{
                                        code: Code,
                                    }}
                                >
                                    {blog[0]?.description}
                                </ReactMarkdown> */}
                             {blog[0]?.description}
                            </div>

                        </>

                        }
                    </div>
                    <div className="rightslug_data">
                        <div className="slug_profile_info">
                            <div className="slugprofile_sec">
                                <div className="profile_imgbg"></div>
                                <div className="slug_profile_img">
                                    <div className="image_bg_top0"></div>
                                    <div className="image_bg_top1"></div>
                                    <img src="/Kar_Rakib.png" alt="kar ra kib" />
                                </div>
                                <h3>Use Name</h3>
                                <h4>About author</h4>
                                <div className="socail_talks flex flex-center gap-1 mt-2">
                                    <div className="st_icon">
                                        <FaGithub />
                                    </div>
                                    <div className="st_icon">
                                        <FaFacebook />
                                    </div>
                                    <div className="st_icon">
                                        <FaInstagram/>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogSlug