import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import main from "../configs/gemini.js";
import { notifySubscribers } from "./newsletterController.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    console.log("🔍 Blog creation started:", { title, isPublished }); // Debug log

    // Check if all fields are present
    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload Image to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    const image = optimizedImageUrl;

    const newBlog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    console.log("✅ Blog created successfully:", newBlog._id); // Debug log

    // Only notify subscribers if the blog is published
    if (isPublished) {
      console.log("📧 Blog is published, attempting to notify subscribers..."); // Debug log
      try {
        await notifySubscribers(newBlog);
        console.log("✅ notifySubscribers function completed successfully");
      } catch (notificationError) {
        console.error("❌ Failed to notify subscribers:", notificationError);
      }
    } else {
      console.log("📝 Blog is not published, skipping notifications"); // Debug log
    }

    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    console.error("💥 Error in addBlog:", error);
    res.json({ success: false, message: error.message });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    const wasPublished = blog.isPublished;
    blog.isPublished = !blog.isPublished;
    await blog.save();

    // If blog was just published (changed from false to true), notify subscribers
    if (!wasPublished && blog.isPublished) {
      setImmediate(async () => {
        try {
          await notifySubscribers(blog);
          console.log(
            "📧 Subscribers notified for published blog:",
            blog.title
          );
        } catch (notificationError) {
          console.error("❌ Failed to notify subscribers:", notificationError);
        }
      });
    }

    const statusMessage = blog.isPublished
      ? "Blog published successfully"
      : "Blog unpublished successfully";
    res.json({ success: true, message: statusMessage });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Rest of your controller functions remain the same...
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);

    // Delete all comments associated with the blog
    await Comment.deleteMany({ blog: id });

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({ blog, name, content });
    res.json({ success: true, message: "Comment added for review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(
      prompt + " Generate a blog content for this topic in simple text format"
    );
    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
