"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAppDispatch } from "@/src/redux/store";
import { useInputChange } from "@/src/hook/useInputChange";
import "@/src/styles/auth/auth-style.scss";
import { register } from "@/src/redux/features/authSlice";

interface RegisterProps {
  actionClose: () => void;
}

const Register: React.FC<RegisterProps> = ({ actionClose }) => {
  const [formData, handleInputChange] = useInputChange({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRegister = () => {
    dispatch(register(formData)).then((result) => {
      if (register.rejected.match(result)) {
        //do something
        //test student 5 rồi
        console.log(result.payload);
      } else if (register.fulfilled.match(result)) {
        console.log(result.payload);
      }
    });
  };

  return (
    <>
      <div className="blur-bg-overlay"></div>

      <div className="flex justify-center items-center h-5/6">
        <div className={`form-container register-container`}>
          <IoIosCloseCircleOutline
            className="close-btn"
            onClick={actionClose}
          />

          <div className="form-box">
            <div className="form-details">
              <h2>Tạo tài khoản</h2>
              <p className="px-3 white-text">
                Để trở thành một phần của cộng đồng chúng tôi, vui lòng đăng ký
                bằng thông tin cá nhân của bạn
              </p>
            </div>

            <div className="form-content">
              <h2>ĐĂNG KÍ</h2>
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
                  <label>Nhập email của bạn</label>
                </div>

                <div className="input-field">
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(event) => handleInputChange(event, "password")}
                  />
                  <label>Tạo password</label>
                </div>

                <button onClick={handleRegister}>Đăng kí</button>
              </div>

              <div className="bottom-link">
                <span> Đã có sẵn tài khoản? </span>
                <p>Đăng nhập</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
