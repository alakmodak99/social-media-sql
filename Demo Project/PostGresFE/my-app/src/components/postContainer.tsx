import React, { useContext, useEffect, useState } from "react";
import { UserDetailsContext } from "./Provider";

const PostContainer = ({
  data,
  socket,
  commentId,
  setCommentId = () => {},
  postId,
  setPostId = () => {},
}: {
  data?: any;
  socket?: any;
  commentId?: string;
  setCommentId?: Function;
  postId?: string;
  setPostId?: Function;
}) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  useEffect(()=>{
    for(let key of data?.likes){
      if(key?.user?.id===userDetails?.id){
        setLiked(true);
        return;
      }
    }
    setLiked(false);
  },[userDetails, data])
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        width: "250px",
        height: "200px",
        overflowX: "scroll",
        scrollBehavior: "smooth",
        margin: "auto",
        backgroundColor: "lightseagreen",
        padding: "20px",
        gap: "20px",
        textAlign: "center",
        border: "1px solid",
        borderRadius: "10px",
      }}
    >
      <div>UserName : {data?.created_by?.name}</div>
      <div
        style={{
          width: "180px",
          border: "1px solid",
          backgroundColor: "lightgray",
          textAlign: "center",
          padding: "5px",
          fontSize: "18px",
          textOverflow: "ellipsis",
          margin: "auto",
          borderRadius: "10px",
        }}
      >
        {data?.content}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "5px",
          height: "30px",
        }}
      >
        <div
          style={{
            border: `1px solid ${liked ? "white" : ""}`,
            padding: "3px 10px",
            borderRadius: "10px",
            cursor: "pointer",
            color: `${liked ? "white" : ""}`,
            backgroundColor: `${liked ? "black" : ""}`,
          }}
          onClick={() => {
            if (!userDetails?.id) {
              alert("Needs to be authenticated to react on a post");
              return;
            }
            socket?.emit("likePost", {
              postId: data?.id,
              userId: userDetails?.id,
            });
          }}
        >
          Likes : {data?.likes?.length}
        </div>
        <div
          style={{
            border: "1px solid",
            padding: "3px 10px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowComments(!showComments);
          }}
        >
          Comments :{" "}
          {
            data?.comments?.filter((e: { parentId: any }) => !e?.parentId)
              ?.length
          }
        </div>
      </div>
      {showComments && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          {data?.comments
            .sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            ?.filter((e: { parentId: any }) => !e?.parentId)
            ?.map((e: any, i: any) => {
              const commentID = e?.id;
              return (
                <div
                  style={{
                    marginLeft: "-10px",
                    border: "1px solid black",
                    textAlign: "left",
                    backgroundColor: "lightgreen",
                    borderRadius: "10px",
                    marginBottom: "10px",
                    padding: "10px",
                  }}
                  key={i}
                >
                  <div> Comment: {e?.user?.name}</div>
                  <div>{e?.comment}</div>
                  {e?.replies?.length > 0 && (
                    <div>
                      {e?.replies?.map((a: any, j: any) => {
                        return (
                          <div
                            style={{
                              border: "1px solid blue",
                              textAlign: "left",
                              backgroundColor: "lightcoral",
                              borderRadius: "10px",
                              margin: "10px 2px 5px 80px",
                              padding: "5px 0 5px 10px",
                            }}
                            key={j}
                          >
                            <div>Reply: {a?.user?.name}</div>
                            <div>{a?.comment}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div
                    style={{
                      textAlign: "right",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (!userDetails?.id) {
                        alert("Needs to be authenticated to react on a post");
                        return;
                      }
                      setPostId(data?.id);
                      setCommentId(commentID);
                    }}
                  >
                    Add Reply
                  </div>
                </div>
              );
            })}
          <div
            onClick={() => {
              if (!userDetails?.id) {
                alert("Needs to be authenticated to react on a post");
                return;
              }
              setPostId(data?.id);
            }}
            style={{
              textAlign: "right",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Add Comment
          </div>
        </div>
      )}
    </div>
  );
};

export default PostContainer;
