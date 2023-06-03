import React, { useState } from "react";
import Button from "../button";
import LogIn from "../login";
import SignUp from "../signup";

const Auth = ({
  open,
  setOpen = () => {},
}: {
  open?: boolean;
  setOpen?: Function;
}) => {
  const [currStep, setCurrStep] = useState<string>("signIn");
  return (
    <div
      style={{
        backgroundColor: "rgb(108, 106, 104, 0.1)",
        backdropFilter: "blur(5px)",
        width: "100%",
        height: "100vh",
        top: 0,
        position: "fixed",
      }}
    >
      <div
        style={{
          width: "400px",
          border: "1px solid",
          padding: "10px",
          margin: "auto",
          borderRadius: "10px",
          backgroundColor: "antiquewhite",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <button
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            padding: "5px 10px",
            fontSize: "18px",
            borderRadius: "30px",
            cursor: "pointer",
          }}
          onClick={() => {
            setOpen(false);
          }}
        >
          X
        </button>
        {currStep === "signIn" ? (
          <LogIn
            step={currStep}
            setStep={setCurrStep}
            open={open}
            setOpen={setOpen}
          />
        ) : (
          <SignUp
            step={currStep}
            setStep={setCurrStep}
            open={open}
            setOpen={setOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;
