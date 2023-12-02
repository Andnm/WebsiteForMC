"use client";

import Link from "next/link";
import React from "react";
import "@/src/styles/auth/login-style.scss";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface LoginProps {
  actionClose: () => void;
}

const Login: React.FC<LoginProps> = ({ actionClose }) => {
  return (
    <>
      <div className="blur-bg-overlay"></div>

      <div className="flex justify-center items-center h-5/6">
        <div className={`form-login`}>
          <IoIosCloseCircleOutline
            className="close-btn"
            onClick={actionClose}
          />

          <div className="form-box">
            <div className="form-details">
              <h2>Chào mừng bạn quay lại</h2>
              <p className="px-3 white-text">
                Vui lòng đăng nhập bằng thông tin cá nhân của bạn để duy trì kết
                nối với chúng tôi
              </p>
            </div>

            <div className="form-content">
              <h2>ĐĂNG NHẬP</h2>
              <div className="form">
                <div className="">
                  <GoogleOAuthProvider
                    clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
                  >
                    <GoogleLogin
                      onSuccess={(credentialResponse) =>
                        console.log(credentialResponse)
                      }
                    />
                  </GoogleOAuthProvider>
                </div>

                <div className="break-line my-6">
                  <hr />
                  <div className="text">
                    <p>Hoặc</p>
                  </div>
                </div>

                <div className="input-field">
                  <input type="text" required />
                  <label>Email</label>
                </div>

                <div className="input-field">
                  <input type="password" required />
                  <label>Password</label>
                </div>

                <Link href="#" className="forgot-pass">
                  Quên mật khẩu?
                </Link>

                <button>Đăng nhập</button>
              </div>

              <div className="bottom-link">
                <span> Bạn chưa có tài khoản? </span>
                <Link href="/register">Đăng kí</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
