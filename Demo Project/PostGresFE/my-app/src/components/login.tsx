import React, { useContext, useEffect, useState } from "react";
import Button from "./button";
import Input from "./input";
import { UserDetailsContext } from "./Provider";
import { getAPI, postAPI } from "./utils/apirequests";

const LogIn = ({
  step,
  setStep = () => {},
  open,
  setOpen = () => {},
}: {
  step?: string;
  setStep?: Function;
  open?: boolean;
  setOpen?: Function;
}) => {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });
  const getUserProfile = async () => {
    try {
      const res = await getAPI({
        url: "user/profile",
      });
      localStorage.setItem("UserDetails", JSON.stringify(res?.data));
      setUserDetails(res?.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleSubmit = async (data: any) => {
    for (let key in data) {
      if (!data[key]) return alert("All fields are mandatory");
    }
    console.log(data);
    try {
      const res = await postAPI({
        url: "user/sign-in",
        data,
      });
      alert(res?.data?.message);
      localStorage.setItem("userData", JSON.stringify(res?.data?.refreshToken));
     await getUserProfile();
     setOpen(false)
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <p style={{ fontSize: "22px", margin: "5px" }}> SignIn</p>
      <div>
        <Input
          inputType="email"
          onChange={(e: any) => {
            setFormData({
              ...formData,
              email: e,
            });
          }}
          autoFocus={true}
          label={"Enter your email"}
          value={formData["email"]}
        />
        <Input
          inputType="password"
          onChange={(e: any) => {
            setFormData({
              ...formData,
              password: e,
            });
          }}
          label={"Enter your password"}
          value={formData["password"]}
        />
      </div>
      <div
        style={{
          fontSize: "16px",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        Don't Have Account{" "}
        <a
          style={{
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => {
            setStep("signUp");
          }}
        >
          Sign Up
        </a>
      </div>
      <Button
        onClick={() => {
          handleSubmit(formData);
        }}
        text={"Submit"}
      />
    </div>
  );
};

export default LogIn;
