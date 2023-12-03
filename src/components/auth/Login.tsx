"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAppDispatch } from "@/src/redux/store";
import { login } from "@/src/redux/features/authSlice";
import "@/src/styles/auth/auth-style.scss";
import { useInputChange } from "@/src/hook/useInputChange";

interface LoginProps {
  actionClose: () => void;
}

const Login: React.FC<LoginProps> = ({ actionClose }) => {
  const [formData, handleInputChange] = useInputChange({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogin = () => {
    dispatch(login(formData)).then((result) => {
      if (login.rejected.match(result)) {
        //do something
        console.log(result.payload);

      } else if (login.fulfilled.match(result)) {
        const user = result.payload;
        switch (user?.role_name) {
          case "Admin":
            router.push("/dashboard");
            break;
          case "Business":
            router.push("/business-board");
            break;
          case "Student":
            router.push("/student-board");
            break;
          default:
            router.push("/");
            break;
        }
      }
    });
  };

  return (
    <>
      <div className="blur-bg-overlay"></div>

      <div className="flex justify-center items-center h-5/6">
        <div className={`form-container`}>
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
                  <input
                    type="text"
                    required
                    value={formData.email}
                    onChange={(event) => handleInputChange(event, "email")}
                  />
                  <label>Email</label>
                </div>

                <div className="input-field">
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(event) => handleInputChange(event, "password")}
                  />
                  <label>Password</label>
                </div>

                <Link href="#" className="forgot-pass">
                  Quên mật khẩu?
                </Link>

                <button onClick={handleLogin}>Đăng nhập</button>
              </div>

              <div className="bottom-link">
                <span> Bạn chưa có tài khoản? </span>
                <p>Đăng kí</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
