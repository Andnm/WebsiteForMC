import React from "react";
import { signIn } from "@/src/redux/features/authSlice";
import { useAppDispatch } from "@/src/redux/store";

const EarliestProjectList = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(signIn({ email, password }));
  };

  return (
    <div>
      <div style={{ width: "1000px", color: "white" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Đăng nhập</button>
      </div>
    </div>
  );
};

export default EarliestProjectList;
