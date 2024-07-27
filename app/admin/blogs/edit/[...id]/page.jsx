import Blog from '@/app/components/Blog';
import Loader from '@/app/components/Loader';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

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
    const {id} = router.query;
    const [productInfo, setProductInfo] = useState(null)
    useEffect(() => {
      if(!id){
        return;
      }else{
        axios.get('api/blogapi?id=' + id).then(res=>(
            setProductInfo(res.data)
        ))
      }
    }, [id])
    
    if (session) {
        return (
            < >
                <Head>
                    <title> Update Blog</title>
                </Head>
                <div className="blogpage">
                    <div className="titledashboard flex flex-sb">
                        <div >
                            <h2>Edit <span>Blogs</span></h2>
                            <h3>Admin PANEl</h3>
                        </div>
                        <div className="breadcrumb">
                            <BsPostcard /> <span>/</span> <span>Edit Page</span>
                        </div>
                    </div>
                    <div className="mt-3">
                        {
                            productInfo && (
                                <Blog {...productInfo} />
                            )
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default page