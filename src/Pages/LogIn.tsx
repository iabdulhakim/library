import React, { useState, useEffect } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [time, setTime] = useState(true);
  const [correct, setCorrect] = useState(false);
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, value.email, value.password)
      .then(() => {
        setCorrect(true);
      })
      .catch(() => alert("Your data has mistake move to  SignUp"));
  };
  useEffect(() => {
    auth.authStateReady().finally(() => setTime(false));

    if (time && !correct) {
    } else {
      setTimeout(() => navigate("/libary"), 1200);
    }
  }, [correct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="flex justify-center items-center bg-[#f0f0f0]">
      <div className="w-[500px] mx-auto my-[30vh] py-4 px-6 rounded-[15px] bg-slate-100">
        <form onSubmit={(e) => handleSubmit(e)} className="felx flex-col">
          <div className="flex justify-between w-full items-center">
            <h3 className="font-bold  text-[24px] text-black mb-6">Log In</h3>
          </div>
          <label className="font-[500] text-[#33333]" htmlFor="email">
            Your e-mail
          </label>
          <input
            onChange={handleChange}
            name="email"
            id="email"
            required
            type="email"
            className="w-[100%] bg-white h-[35px] rounded-[5px] px-3 block mb-4"
            placeholder="enter your email"
          />

          <label className="font-[500] text-[#33333]" htmlFor="pass">
            Pasword
          </label>
          <input
            onChange={handleChange}
            className="w-[100%] bg-white h-[35px] rounded-[5px] px-3 block mb-4"
            id="pass"
            required
            placeholder="enter password password"
            name="password"
            type="password"
          />

          <button className="bg-blue-400 mb-4 disabled:bg-blue-200 hover:bg-blue-300 rounded-[10px] font-bold text-[20px] text-white w-full py-1">
            submit
          </button>

          <span className="text-[#33333]  font-[300] ">
            If you don not have acount  {"  "}
            <span
              onClick={() => navigate("/signUp")}
              className="text-red-400 cursor-pointer"
            >
              SignUp?
            </span>
          </span>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
