const { Schema, model, models } = require("mongoose");

const BlogSchema = new Schema({
    title: { type: String },
    slug: { type: String, require: true },
    description: { type: String },
    blogCategory: [{ type: String }],
    tags: [{ type: String }],
    status: { type: String },
},
    { timestamps: true }
);

export const Blog = models.Blog || model('Blog', BlogSchema)