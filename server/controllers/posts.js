import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

// fetch posts
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// fetch a post
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// fetch posts by search
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, 'i');

    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(',') } }],
    });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// create a post
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({ ...post, creator: req.userId });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// update post
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('no post with that id');

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );
  res.json(updatedPost);
};

// delete post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('no post with that id');

  await PostMessage.findByIdAndRemove(id);
  console.log('delete');

  res.json({ message: 'Post deleted successfully' });
};

// like a post
export const likePost = async (req, res) => {
  const { id } = req.params;

  // check if user is authenticated
  if (!req.userId) return res.json({ message: 'Unauthenticated' });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('no post with that id');

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    // like a post
    post.likes.push(req.userId);
  } else {
    // dislike a post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.status(200).json(updatedPost);
};
