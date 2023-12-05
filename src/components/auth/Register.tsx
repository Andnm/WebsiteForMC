"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { useInputChange } from "@/src/hook/useInputChange";
import "@/src/styles/auth/auth-style.scss";
import {
  login,
  register,
  sendOtpRegister,
  verifyOtp,
} from "@/src/redux/features/authSlice";
import SpinnerLoading from "../loading/SpinnerLoading";
import OtpRegister from "./OtpRegister";

interface RegisterProps {
  actionClose: () => void;
}

const Register: React.FC<RegisterProps> = ({ actionClose }) => {
  const [formData, handleInputChange] = useInputChange({
    email: "",
    password: "",
  });

  const [errorOtp, setErrorOtp] = React.useState("");

  const inputsOtpRef: React.RefObject<HTMLInputElement[]> = React.useRef([]);

  const [openOtpForm, setOpenOtpForm] = React.useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading, error } = useAppSelector((state) => state.auth);

  const handleRegister = () => {
    dispatch(register(formData)).then((result) => {
      if (register.rejected.match(result)) {
        //do something
      } else if (register.fulfilled.match(result)) {
        dispatch(sendOtpRegister({ email: formData.email })).then((result) => {
          if (sendOtpRegister.rejected.match(result)) {
            //do something
          } else if (sendOtpRegister.fulfilled.match(result)) {
            setOpenOtpForm(true);
          }
        });
      }
    });
  };

  const confirmOTP = async () => {
    const otp = [
      inputsOtpRef.current![0].value,
      ...inputsOtpRef.current!.slice(1).map((input) => input.value),
    ].join("");

    const data = {
      otp: parseInt(otp, 10),
      email: formData.email,
    };

    dispatch(verifyOtp(data)).then((result) => {
      if (verifyOtp.rejected.match(result)) {
        setErrorOtp(result.payload as string);
      } else if (verifyOtp.fulfilled.match(result)) {
        setOpenOtpForm(false);

        router.push("/student-board");

        dispatch(login(formData)).then((result) => {
          if (login.rejected.match(result)) {
            //do something
          } else if (login.fulfilled.match(result)) {
            router.push("/student-board");
          }
        });
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
              {!openOtpForm ? (
                <>
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
                        onChange={(event) =>
                          handleInputChange(event, "password")
                        }
                      />
                      <label>Tạo password</label>
                    </div>

                    {error && <span className="text-red-500">{error}</span>}

                    <button onClick={handleRegister}>Đăng kí</button>
                  </div>

                  <div className="bottom-link">
                    <span> Đã có sẵn tài khoản? </span>
                    <p>Đăng nhập</p>
                  </div>
                </>
              ) : (
                <OtpRegister
                  verifyAction={confirmOTP}
                  inputsRef={inputsOtpRef}
                  error={errorOtp}
                  setError={() => setErrorOtp("")}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {loading && <SpinnerLoading />}
    </>
  );
};

export default Register;
