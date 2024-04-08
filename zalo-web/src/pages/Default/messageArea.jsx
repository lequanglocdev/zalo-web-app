import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { api, baseURLOrigin, typeHTTP } from "../../utils/api";
import { globalContext } from "../../context/globalContext";
const socket = io.connect(baseURLOrigin);

const MessageArea = () => {
  const [message, setMessage] = useState("");
  const { data } = useContext(globalContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // api({
    //   method: typeHTTP.GET,
    //   url: `/message/get-by-room/${data.currentRoom?._id}`,
    // }).then((messages) => setMessages(messages));
    // console.log(data.currentRoom?._id);
    socket.on(data.currentRoom?._id, (messages) => {
      setMessages(messages);
    });
    return () => {
      socket.off(data.currentRoom?._id);
    };
  }, [data.currentRoom, socket]);

  const handleSendMessage = () => {
    const body = {
      room_id: data.currentRoom?._id,
      information: message,
      typeMessage: "text",
      user_id: data.user?._id,
      disabled: false,
    };

    socket.emit("send_message", body);
  };

  return (
    <div style={{ width: "100%", height: "90%" }}>
      <div style={{ width: "100%", height: "80%" }}>
        {messages.map((message, index) => (
          <div key={index}>{message.information + ""}</div>
        ))}
      </div>
      <div style={{ width: "100%", height: "20%" }}>
        <input onChange={(e) => setMessage(e.target.value)} value={message} />
        <button onClick={() => handleSendMessage()}>Gui</button>
      </div>
    </div>
  );
};

export default MessageArea;
