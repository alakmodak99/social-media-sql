import React, { useContext, useState } from "react";
import Button from "./button";
import Input from "./input";
import { UserDetailsContext } from "./Provider";

const NavBar = ({
  onClick,
  socket,
}: {
  onClick?: () => void;
  socket?: any;
}) => {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [createPost, setCreatePost] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>("");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "70%",
        margin: "auto",
        marginTop: "10px",
      }}
    >
      {createPost && (
        <div
          style={{
            backgroundColor: "rgb(108, 106, 104, 0.1)",
            backdropFilter: "blur(5px)",
            width: "100%",
            height: "100vh",
            top: 0,
            left: 0,
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
                setCreatePost(false);
                setInputVal("");
              }}
            >
              X
            </button>
            <Input
              inputType="text"
              placeHolder={"Write something to post"}
              onChange={(e: any) => {
                setInputVal(e);
              }}
              autoFocus={true}
              label={`What you wanna post?`}
              value={inputVal}
            />
            <Button
              onClick={() => {
                if (!inputVal) {
                  alert("Please write something to continue");
                  return;
                }
                if (!userDetails?.id) {
                  alert("Needs to be authenticated to react on a post");
                  return;
                }
                socket?.emit("createPost", {
                  userId: userDetails?.id,
                  content: inputVal,
                });
                setCreatePost(false);
                setInputVal("");
              }}
              text="Submit"
            />
          </div>
        </div>
      )}
      <Button
        onClick={() => {
          console.log("Clicked1");
        }}
        text={"All Posts"}
      />
      {!userDetails?.id && <Button onClick={onClick} text={"Sign In"} />}
      {userDetails?.id && (
        <>
          <Button
            onClick={() => {
              setCreatePost(true);
            }}
            text={"Create Post"}
          />
          {/* <Button
            onClick={() => {
              return;
            }}
            text={"My Posts"}
          /> */}
          <div>
            <Button
              onClick={() => {
                return;
              }}
              text={`User: ${userDetails?.name}`}
            />
            <div
              style={{
                textAlign: "right",
                fontSize: "18px",
                fontWeight: "600",
                cursor: "pointer",
              }}
              onClick={() => {
                localStorage.removeItem("UserDetails");
                setUserDetails({});
              }}
            >
              Log out
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
