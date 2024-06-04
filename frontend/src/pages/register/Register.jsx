import React, { useRef } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmationPassword = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //パスワードと確認用パスワードが一致しているか確認する
    if (password.current.value !== confirmationPassword.current.value) {
      confirmationPassword.current.setCustomValidity("パスワードが違います。");
    } else {
      try {
        //registerAPIを叩く
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Real SNS</h3>
          <span className="loginDesc">本格的なSNSを自分で。</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
            <p className="loginMessage">新規登録はこちら</p>
            <input
              type="text"
              className="loginInput"
              placeholder="ユーザー名"
              required
              min={5}
              max={5}
              ref={username}
            />
            <input
              type="email"
              className="loginInput"
              placeholder="Eメール"
              required
              ref={email}
            />
            <input
              type="password"
              className="loginInput"
              placeholder="パスワード"
              required
              minLength={6}
              ref={password}
            />
            <input
              type="password"
              className="loginInput"
              placeholder="確認用パスワード"
              required
              minLength={6}
              ref={confirmationPassword}
            />
            <button className="loginButton">サインアップ</button>
          <button className="loginRegisterButton">
            <Link to="/login" className="loginRegisterButtonLink">
              ログイン
            </Link>
          </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
