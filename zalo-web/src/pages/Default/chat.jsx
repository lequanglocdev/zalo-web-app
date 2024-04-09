import React, { useContext, useEffect } from "react";
import { api, typeHTTP } from "../../utils/api";
import { globalContext } from "../../context/globalContext";
import { getRemainUserForSingleRoom } from "../../utils/getRemainUserForSingleRoom";
import MessageArea from "./messageArea";

const ChatPage = () => {
  const { data, handler } = useContext(globalContext);

  useEffect(() => {
    api({
      url: `/room/get-by-user/${data.user?._id}`,
      method: typeHTTP.GET,
    }).then((res) => {
      handler.setRooms(res);
    });
  }, [data.user]);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "25%",
          height: "100vh",
          borderRight: "2px solid black",
        }}
      >
        <h2>List Room cua {data.user?.username}</h2>
        {data.rooms.map((room, index) => (
          <div
            onClick={() => handler.setCurrentRoom(room)}
            key={index}
            style={{
              backgroundColor: "#999",
              display: "flex",
              alignItems: "center",
              paddingLeft: "10px",
              gap: "10px",
              cursor: "pointer",
            }}
          >
            <img
              style={{ height: "40px" }}
              src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
            />
            <span>
              {getRemainUserForSingleRoom(room, data.user?._id).username}
            </span>
          </div>
        ))}
      </div>
      <div style={{ width: "70%", height: "100vh" }}>
        {data.currentRoom ? (
          <div style={{ width: "100%", height: "100%", padding: "40px" }}>
            <div className="header" style={{ width: "100%", height: "10%" }}>
              {`Tro chuyen voi ${
                getRemainUserForSingleRoom(data.currentRoom, data.user?._id)
                  .username
              }`}
            </div>
            <MessageArea />
          </div>
        ) : (
          <div>Vui Long chon Room nhe {data.user?.username}</div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
