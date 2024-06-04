import React from "react";
import Topbar from "../../componets/topbar/Topbar";
import Sidbar from "../../componets/sidebar/Sidbar";
import Timeline from "../../componets/timeline/Timeline";
import RightBar from "../../componets/rightbar/RightBar";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidbar />
        <Timeline />
        <RightBar />
      </div>
    </>
  );
};

export default Home;
