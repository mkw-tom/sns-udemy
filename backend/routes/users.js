const User = require("../models/User");
const router = require("express").Router();

//CRUD

//ユーザー情報の更新
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      return res.status(200).json("更新できました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("他人の情報は更新できません");
  }
});


//ユーザー削除
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("削除できました。");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("削除不可能です");
  }
});


//ユーザー取得
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...ather } = user._doc;
    return res.status(200).json(ather);
  } catch (err) {
    return res.status(500).json(err);
  }
});


router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username= req.query.username;
  try {
    const user = userId
     ? await User.findById(userId)
     : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});


//ユーザーのフォロー
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      //相手ユーザー
      const user = await User.findById(req.params.id);
      //自分
      const currentUser = await User.findById(req.body.userId);

      //フォロワーに自分がいなかったら
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $push: {
            followers: req.body.userId,
          },
        });
        await currentUser.updateOne({
          $push: {
            followings: req.params.id,
          },
        });
      } else {
        return res.status(403).json("既にフォローしています");
      }
      return res.status(200).json("フォローできました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("自分自身をフォローできません");
  }
});


//ユーザーのフォロー解除
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $pull: {
            followers: req.body.userId,
          },
        });
        await currentUser.updateOne({
          $pull: {
            followings: req.params.id,
          },
        });
      } else {
        return res.status(403).json("フォローされていません");
      }
      return res.status(200).json("フォローを解除しました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("この操作はできないことになっています。");
  }
});

module.exports = router;
