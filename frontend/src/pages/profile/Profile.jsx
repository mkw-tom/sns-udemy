import React, { useState, useEffect } from "react";
import Topbar from "../../componets/topbar/Topbar";
import Sidbar from "../../componets/sidebar/Sidbar";
import Timeline from "../../componets/timeline/Timeline";
import RightBar from "../../componets/rightbar/RightBar";
import "./Profile.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/api/users?username=${username}`);
      setUser(response.data);
    };
    // console.log(post)
    console.log(user);
    fetchUser();
  }, []);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidbar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={PUBLIC_FOLDER + "/post/3.jpeg"}
                alt=""
                className="profileCoverImg"
              />
              <img
                src={
                  PUBLIC_FOLDER + user.profiilePicture || PUBLIC_FOLDER + "/person/noAvatar.png"
                }
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Timeline username={username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
