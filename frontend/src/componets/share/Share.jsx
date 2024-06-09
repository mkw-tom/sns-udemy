import { Image, Gif, Face, Analytics } from "@mui/icons-material";
import React, { useContext, useRef, useState } from "react";
import "./Share.css";
import { AuthContext } from "../../state/AuthContext";
import axios from "axios";
import { api } from "../../axios";

const Share = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if(file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await api.post("/api/upload", data);
      } catch (err) {
        console.log(err)
      }
    }
    try {
      await api.post("/api/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    desc.current.value = "";
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profiilePicture
                ? PUBLIC_FOLDER + user.profiilePicture
                : PUBLIC_FOLDER + "/person/noAvatar.png"
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            type="text"
            className="shareInput"
            placeholder="今何してるの？"
            ref={desc}
          />
        </div>
      </div>
      <hr className="shareHr" />

      <form className="shareButtons" onSubmit={(e) => handleSubmit(e)}>
        <div className="shareOptions">
          <label className="shareOption" htmlFor="file">
            <Image className="shareIcon" htmlColor="blue" />
            <span className="shareOptionText">写真</span>
            <input
              type="file"
              id="file"
              accept=".png, .jpeg, .jpg"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files
              [0])}
            ></input>
          </label>
          <div className="shareOption">
            <Gif className="shareIcon" htmlColor="hotpink" />
            <span className="shareOptionText">GIF</span>
          </div>
          <div className="shareOption">
            <Face className="shareIcon" htmlColor="green" />
            <span className="shareOptionText">気持ち</span>
          </div>
          <div className="shareOption">
            <Analytics className="shareIcon" htmlColor="red" />
            <span className="shareOptionText">投稿</span>
          </div>
        </div>
        <button className="shareButton" type="submit">
          投稿
        </button>
      </form>
    </div>
  );
};

export default Share;
