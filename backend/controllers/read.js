import pool from "../db.js";

export const read= async(req,res)=>{
    try{
        const result=await pool.query("select * from posts");
        res.json(result.rows);
    }catch(err){
        console.error(err);
    }
} 

export const post_read= async (req, res) => {
    const postId = req.params.id;
    try {
        const result = await pool.query(`
            SELECT posts.*, users.username 
            FROM posts 
            JOIN users ON posts.user_id = users.id
            WHERE posts.id = $1
        `, [postId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
