import React, { useContext, useEffect, useState } from "react";
import Button from "./button";
import Input from "./input";
import PostContainer from "./postContainer";
import { UserDetailsContext } from "./Provider";
import { getAPI } from "./utils/apirequests";
const AllPosts = ({ socket }: { socket?: any }) => {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [commentId, setCommentId] = useState<string>("");
  const [postId, setPostId] = useState<string>("");
  const [inputVal, setInputVal] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const getAllPosts = async () => {
    try {
      const data = await getAPI({
        url: "posts/all-posts",
      });
      setData(data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  useEffect(() => {
    socket.on("postLiked", (data: any) => {
      if (data?.success) {
        getAllPosts();
      }
    });
    socket.on("postCommented", (data: any) => {
      if (data?.success) {
        getAllPosts();
      }
    });
    socket.on("postCreated", (data: any) => {
      if (data?.success) {
        getAllPosts();
      }
    });
    // Remove event listener on component unmount
    return () => {
      socket.off("postLiked");
      socket.off("postCommented");
      socket.off("postCreated");
    };
  }, [socket]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
        width: "80%",
        height: "80vh",
        margin: "auto",
        padding: "5px",
      }}
    >
      {(postId || commentId) && (
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
                setCommentId("");
                setPostId("");
              }}
            >
              X
            </button>
            <Input
              inputType="text"
              placeHolder={`Write a ${
                postId && commentId ? "reply" : "comment"
              }`}
              autoFocus={true}
              onChange={(e: any) => {
                setInputVal(e);
              }}
              label={`Write your ${postId && commentId ? "reply" : "comment"}`}
              value={inputVal}
            />
            <Button
              onClick={() => {
                if (!inputVal) {
                  alert("Please write something to continue");
                  return;
                }
                socket?.emit("commentPost", {
                  postId: postId,
                  userId: userDetails?.id,
                  parentId: commentId,
                  comment: inputVal,
                });
                setPostId("");
                setInputVal("");
                setCommentId("");
              }}
              text="Submit"
            />
          </div>
        </div>
      )}
      {data?.length > 0 ? (
        <>
          {data
            .sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            ?.map((e: any, i: any) => {
              return (
                <PostContainer
                  socket={socket}
                  key={i}
                  data={e}
                  commentId={commentId}
                  setCommentId={setCommentId}
                  postId={postId}
                  setPostId={setPostId}
                />
              );
            })}
        </>
      ) : (
        <>Nothing to show !!</>
      )}
    </div>
  );
};

export default AllPosts;
