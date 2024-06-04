const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// 投稿を追加
router.post("/", async(req, res) => {
  const newPost = new Post(req.body);
  try {
    const saveedPost = await newPost.save();
    return res.status(200).json(saveedPost);
  } catch (err) {
    return res.status(500).json(err)
  }
});

// 投稿を更新
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
      await post.updateOne({
        $set: req.body,
      })
      return res.status(200).json("投稿の編集に成功しました！")
    } else {
      return res.status(400).json("他人の投稿を編集できません。")
    }
  } catch (err) {
    return res.status(403).json(err)
  }
})

//投稿を削除する
router.delete("/:id", async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json("投稿を削除しました。")
    } else {
      return res.status(403).json("他人の投稿は削除できません。")
    }
  } catch (err) {
    return res.status(500).json(err)
  }
})

//特定の投稿を取得
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err)
  }
})

//特定の投稿にいいね
router.put("/:id/like", async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //いいねが押されていなかったら
    if(!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $push: {
          likes: req.body.userId
        }
      })
      return res.status(200).json("投稿にいいねしました！")
    
    //いいねが押されいたら、
    } else {
      await post.updateOne({
        $pull: {
          likes: req.body.userId
        }
      })
      return res.status(200).json("投稿にいいねを外しました。")
    }

  } catch (err) {{
    return res.status(500).json(err);
  }}
})

//タイムラインの投稿取得
router.get("/timeline/:userId", async(req, res) => {
  try{
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    //フォロー中のユーザーの投稿内容を取得
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId })
      })
    );
    return res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    return res.status(500).json(err);
  }
})

//プロフィール専用タイムライン　
router.get("/profile/:username", async(req, res) => {
  try{
    const user = await User.findOne({username: req.params.username});
    const Posts = await Post.find({ userId: user._id });
    return res.status(200).json(Posts);
  } catch (err) {
    return res.status(500).json(err);
  }
})



module.exports = router;