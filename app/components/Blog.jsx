import React, { Children, useState } from 'react'
import '../globals.css'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import MarkdownEditor from 'react-markdown-editor-lite'
import ReactMarkdown from 'react-markdown'
import 'react-markdown-editor-lite/lib/index.css';
const Blog = ({
  _id, title: existingTitle, slug: existingSlug, blogCategory: existingBlogCategory, description: existingDescription, tags: existingTags, status: existingStatus
}) => {


  const [redirect, setRedirect] = useState(false)

  const [title, setTitle] = useState(existingTitle || '')
  const [blogCategory, setblogCategory] = useState(existingBlogCategory || '')
  const [slug, setSlug] = useState(existingSlug || '')
  const [description, setDescription] = useState(existingDescription || '')
  const [tags, setTags] = useState(existingTags || '')
  const [status, setStatus] = useState(existingStatus || '')

  const router = useRouter();

  const createProduct = async (e) => {
    const data = {title,tags,blogCategory,slug,status,description}
    console.log('check data',data);
    e.preventDefault()
    // return;
    try {
      if (data._id) {
        await axios.put('/api/blogapi', { ...data, _id: data._id });
      } else {
        await axios.post('/api/blogapi', data);
      }
      setRedirect(false);
    } catch (error) {
      console.error('Error creating or updating blog:', error);
    }
  };
  if(redirect){
    router.push('/admin')
    return null;
  }
const handleSlugChange = (ev) =>{
  const inputValue = ev.target.value;
  const newSlug = inputValue.replace(/\s+/g, '-')
  setSlug(newSlug)
}
  return (
    <>
      <form onSubmit={createProduct} className='addwebsiteform'>
        {/* // title  */}
        <div className='w-full d-flex flex-col flex-left mb-2' date-aos='fade-up'>
          <label htmlFor="title">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text" placeholder='Enter small title' />
        </div>
        {/* slug */}
        <div className="w-100 flex flex-col flex-left mb-2"  date-aos='fade-up'>
          <label htmlFor="slug">Slug</label>
          <input
            value={slug}
            onChange={handleSlugChange}
            type="text" id='slug' placeholder='Enter slug url' required />
        </div>
        {/* blog category */}
        <div className="w-100 flex flex-col flex-left mb-2"  date-aos='fade-up'>
          <label htmlFor="category">Category</label>
          <select
            value={blogCategory}
            onChange={(e) => setblogCategory(Array.from(e.target.selectedOptions, option => option.value))}
            name="category" id="category" multiple>
            <option value="htmlcssjs">Html,Css & JavaScript  </option>
            <option value="nextjs">Next js, React Js  </option>
            <option value="database">Database </option>
            <option value="deployment">Deployment </option>
          </select>
          <p className="existingcategory flex gap-1 mt-1 mb-1"  >
            Seletcted: <span>{blogCategory}</span>
          </p>
        </div>
        {/*  mark down description content */}
        <div className="description w-100 flex flex-col flex-left mb-2"  >
          <label htmlFor="description">Blog Content</label>
          <MarkdownEditor
      value={description}
      onChange={(ev) => setDescription(ev.text)}
      style={{ width: '100%', height: '400px' }}
      renderHTML={(text) => (
        <ReactMarkdown
          components={{
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '');
              if (inline) {
                return <code>{children}</code>;
              } else if (match) {
                return (
                  <div style={{ position: 'relative' }}>
                    <pre
                      style={{
                        padding: '0',
                        borderRadius: '5px',
                        overflowX: 'auto',
                        whiteSpace: 'pre-wrap',
                      }}
                      {...props}
                    >
                      <code>{children}</code>
                    </pre>
                    <button
                      onClick={() => navigator.clipboard.writeText(children)}
                      style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }}
                    >
                      Copy Code
                    </button>
                  </div>
                );
              } else {
                return <code {...props}>{children}</code>;
              }
            },
          }}
        >
          {text}
        </ReactMarkdown>
      )}
    />
         
        </div>

        {/* tags */}
        <div className="w-100 flex flex-col flex-left mb-2"  date-aos='fade-up'>
          <label htmlFor="tags">Tags</label>
          <select
            value={tags}
            onChange={(e) => setTags(Array.from(e.target.selectedOptions, option => option.value))}
            name="tags" id="tags" multiple>
            <option value="html">Html</option>
            <option value="css">CSS </option>
            <option value="javascript">JavaScript </option>
            <option value="reactjs">React js </option>
            <option value="nextjs">Next js </option>
            <option value="database">Database </option>
            <option value="reactjs">React js </option>
          </select>
          <p className="existingcategory flex gap-1 mt-1 mb-1"  date-aos='fade-up'>
            Seletcted: <span>{tags}</span>
          </p>
        </div>
        {/* status */}
        <div className="w-full flex flex-col flex-left mb-2"  >
          <label htmlFor="status">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            name="status" id="status" >
            <option value="">No Selected</option>
            <option value="draft">Draft</option>
            <option value="publish">Publish </option>
          </select>
          <p className="existingcategory flex gap-1 mt-1 mb-1" >
            Seletcted: <span>{status}</span>
          </p>
        </div>
        {/* button for save */}
        <div className='w-full mb-2'>
          <button type='submit' className='w-full addwebbtn flex-center'>Save Blog</button>
        </div>
      </form>
    </>
  )
}

export default Blog