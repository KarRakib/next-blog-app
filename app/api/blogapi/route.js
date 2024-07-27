import { mongooseConnect } from "@/app/lib/mongoose";
import { Blog } from "@/app/models/blog";
import { NextResponse } from "next/server";

const connectDB = async () => {
  await mongooseConnect();
};

export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();
    const { title, slug, description, blogCategory, tags, status } = body;
    console.log( blogCategory, tags, status );
    const blog = await Blog.create({ title, slug, description, blogCategory, tags, status });
    return new NextResponse(JSON.stringify(blog), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to create blog' }), { status: 500 });
  }
}

export async function GET(req) {
  console.log('from admin',req);
  await connectDB();
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (id) {
      const blog = await Blog.findById(id);
      if (blog) {
        return new NextResponse(JSON.stringify(blog), { status: 200 });
      } else {
        return new NextResponse(JSON.stringify({ error: 'Blog not found' }), { status: 404 });
      }
    } else {
      const blogs = await Blog.find().sort({ _id: -1 });
      return new NextResponse(JSON.stringify(blogs), { status: 200 });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch blogs' }), { status: 500 });
  }
}

export async function PUT(req) {
  await connectDB();
  try {
    const body = await req.json();
    const { _id, title, slug, description, blogcategory, tags, status } = body;
    const result = await Blog.updateOne({ _id }, { title, slug, description, blogcategory, tags, status });
    if (result.nModified > 0) {
      return new NextResponse(JSON.stringify(true), { status: 200 });
    } else {
      return new NextResponse(JSON.stringify({ error: 'Blog not found or no changes made' }), { status: 404 });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to update blog' }), { status: 500 });
  }
}

export async function DELETE(req) {
  await connectDB();
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (id) {
      const result = await Blog.deleteOne({ _id: id });
      if (result.deletedCount > 0) {
        return new NextResponse(JSON.stringify(true), { status: 200 });
      } else {
        return new NextResponse(JSON.stringify({ error: 'Blog not found' }), { status: 404 });
      }
    } else {
      return new NextResponse(JSON.stringify({ error: 'Missing blog ID' }), { status: 400 });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to delete blog' }), { status: 500 });
  }
}
