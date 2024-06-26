import React, { useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(true);
  const [correct, setCorrect] = useState(false);
  const [value, setValue] = useState({
    email: "",
    password: "",
    passwordConforim: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (value.email == "") {
      alert("Provide Email");
      setLoading(false);
      return;
    }

    if (value.password !== value.passwordConforim) {
      alert("pasword shoul provode");
      setLoading(false);
      return;
    }

    createUserWithEmailAndPassword(auth, value.email, value.passwordConforim)
      .then((user) => {
        console.log(user);
      })
      .catch((erorr) => {
        console.log(erorr.message);
      });
    setCorrect(true);
    setLoading(false);
  };
  useEffect(() => {
    auth.authStateReady().finally(() => setTime(false));

    if (time && !correct) {
      console.log("loading...");
    } else {
      setTimeout(() => navigate("/libary"), 1200);
    }
  }, [correct]);

  const provider = new GoogleAuthProvider();
  const handleGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      credential?.accessToken;

      result.user;
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="flex justify-center items-center bg-[#f0f0f0]">
      <div className="w-[500px] mx-auto my-[25vh] py-4 px-6 rounded-[15px] bg-slate-100">
        <form onSubmit={(e) => handleSubmit(e)} className="felx flex-col">
          <div className="flex justify-between w-full items-center">
            <h3 className="font-bold  text-[24px] text-black mb-6">Sign Up</h3>
            <span
              onClick={handleGoogle}
              className="text-[#33333] text-[13px] font-[500] cursor-pointer"
            >
              Register with google email
            </span>
          </div>
          <label className="font-[500] text-[#33333]" htmlFor="email">
            Your e-mail
          </label>
          <input
            onChange={handleChange}
            name="email"
            id="email"
            type="email"
            required
            className="w-[100%] bg-white h-[35px] rounded-[5px] px-3 block mb-4"
            placeholder="Your email"
          />

          <label className="font-[500] text-[#33333]" htmlFor="pass">
            Pasword
          </label>
          <input
            onChange={handleChange}
            className="w-[100%] bg-white h-[35px] rounded-[5px] px-3 block mb-4"
            id="pass"
            required
            name="password"
            type="password"
          />

          <label className="font-[500] text-[#33333]" htmlFor="pass2">
            Confirm password
          </label>
          <input
            name="passwordConforim"
            onChange={handleChange}
            className="w-[100%] bg-white h-[35px] rounded-[5px] px-3 block mb-4"
            id="pass2"
            type="password"
            required
          />

          <button
            disabled={loading}
            className="bg-blue-400 mb-4 disabled:bg-blue-200 hover:bg-blue-300 rounded-[10px] font-bold text-[20px] text-white w-full py-3"
          >
            submit
          </button>

        </form>
      </div>
    </div>
  );
}

export default SignUp;
