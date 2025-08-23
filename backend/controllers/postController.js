import pool from "../db.js";

export const deletePost =async (req,res)=>{
  const postId=req.params.id;
  const userId=req.user.id;

  const result = await pool.query("SELECT * FROM posts WHERE id=$1", [postId]);
  if (result.rows.length === 0) return res.status(404).json({ message: "Post not found" });

  if (result.rows[0].user_id !== userId)
    return res.status(403).json({ message: "You can delete only your own post" });

  await pool.query("DELETE FROM posts WHERE id=$1", [postId]);
  res.json({ message: "Post deleted successfully" });
} 

export const editPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    // Get existing post
    const result = await pool.query("SELECT * FROM posts WHERE id=$1", [postId]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Post not found" });
    if (result.rows[0].user_id !== userId)
      return res.status(403).json({ message: "You can edit only your own post" });

    // Use req.body and req.file
    const title = req.body.title || result.rows[0].title;
    const content = req.body.post || result.rows[0].content;
    const photo_url = req.file ? req.file.filename : result.rows[0].photo_url;

    const updated = await pool.query(
      "UPDATE posts SET title=$1, content=$2, photo_url=$3 WHERE id=$4 RETURNING *",
      [title, content, photo_url, postId]
    );

    res.json({ message: "Post updated successfully", post: updated.rows[0] });
  } catch (err) {
    console.error("Edit post error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const checkAuthor = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  try {
    const result = await pool.query("SELECT user_id FROM posts WHERE id=$1", [postId]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Post not found" });

    const isAuthor = result.rows[0].user_id === userId;
    res.json({ isAuthor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};