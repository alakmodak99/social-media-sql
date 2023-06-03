import React, { useContext, useEffect, useState } from "react";
import Button from "./button";
import Input from "./input";
import { UserDetailsContext } from "./Provider";
import { getAPI, postAPI } from "./utils/apirequests";

const SignUp = ({
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
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    try {
      const res = await postAPI({
        url: "user/sign-up",
        data,
      });
      localStorage.setItem("userData", JSON.stringify(res?.data?.refreshToken));
      alert(res?.data?.message);
      await getUserProfile();
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <p style={{ fontSize: "22px", margin: "5px" }}> SignUp</p>
      <div>
        <Input
          inputType="text"
          onChange={(e: any) => {
            setFormData({
              ...formData,
              name: e,
            });
          }}
          autoFocus={true}
          label={"Enter your name"}
          value={formData["name"]}
        />
        <Input
          inputType="email"
          onChange={(e: any) => {
            setFormData({
              ...formData,
              email: e,
            });
          }}
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
        <Input
          inputType="password"
          onChange={(e: any) => {
            setFormData({
              ...formData,
              confirmPassword: e,
            });
          }}
          label={"Confirm your password"}
          value={formData["confirmPassword"]}
        />
      </div>
      <div
        style={{
          fontSize: "16px",
          textAlign: "center",
          marginBottom: "10px",
          cursor: "pointer",
        }}
      >
        Already Have Account{" "}
        <a
          style={{ color: "blue", textDecoration: "underline" }}
          onClick={() => {
            setStep("signIn");
          }}
        >
          Sign In
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

export default SignUp;
