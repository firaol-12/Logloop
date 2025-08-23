import pool from "../db.js";

export const write = async (req, res) => {
  try {
    // Currently, you might have: const userId = 1;
    // Change it to use logged-in user from JWT:
    const userId = req.user.id; // <-- this is the fix
    const { title, post: content } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const result = await pool.query(
      "INSERT INTO posts (user_id, title, content, photo_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, title, content, image]
    );
    console.log("req.user =", req.user);

    res.status(201).json({
      message: "Post created successfully",
      post: result.rows[0],
    });
  } catch (error) {
    console.error("Write controller error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
