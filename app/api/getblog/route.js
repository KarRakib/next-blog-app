import { mongooseConnect } from "@/app/lib/mongoose";
import { Blog } from "@/app/models/blog";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('blogCategory');
    const id = searchParams.get('id');
    const tags = searchParams.get('tags');
    const slug = searchParams.get('slug');
    console.log('tags',tags, 'cate', category, 'slug', slug);

    await mongooseConnect();

    try {
        // const result = await Blog.find()
        let result;

        if (id) {
            result = await Blog.findById(id);
        } else if (category) {
            result = await Blog.find({ blogCategory: { $in: [category] } }).sort({ _id: -1 });
        } else if (tags) {
            result = await Blog.find({ tags: { $in: [tags] } }).sort({ _id: -1 });
        } else if (slug) {
            result = await Blog.find({ slug }).sort({ _id: -1 });
            // result = await Blog.findOne({ slug });
        } else {
            result = await Blog.find().sort({ _id: -1 });
        }

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal Server Error", error }), { status: 500 });
    }
}




// import { mongooseConnect } from "@/app/lib/mongoose";
// import { Blog } from "@/app/models/blog";

// export default async function handle(req,res){
//     const {method} = req;

//     await mongooseConnect();
//     if(method === 'GET'){
//         if(req.query?.id){
//             const blog = await Blog.findById(req.query.id);
//             res.json(blog)
//         }else if(req.query?.blogCategory){
//             const category = await Blog.find({blogCategory:req.query.blogCategory})
//             res.json(category.reverse());
//         }else if(req.query?.tags){
//             const tag = await Blog.find({tags:req.query.tags});
//             res.json(tag.reverse());
//         }else if(req.query?.slug){
//             const url = await Blog.find({slug:req.query.slug});
//             res.json(url.reverse());
//         }else{
//             const blogs = await Blog.find();
//             res.json(blogs.reverse())
//         }
//     }else{
//         res.status(405).json({message:"Method Not Allowed"})
//     }
// }