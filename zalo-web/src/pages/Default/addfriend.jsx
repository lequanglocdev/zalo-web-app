import React, { useContext, useState } from "react";
import { globalContext } from "../../context/globalContext";
import { api, typeHTTP } from "../../utils/api";

const Addfriend = () => {
  const [name, setName] = useState("");
  const [results, setResult] = useState([]);
  const { data } = useContext(globalContext);

  const handleSearch = () => {
    setResult([]);
    api({ url: "/user/find", method: typeHTTP.GET }).then((res) => {
      const arr = [];
      res.forEach((item) => {
        if (item.username.toLowerCase().includes(name.toLowerCase())) {
          arr.push(item);
        }
      });
      setResult(arr);
    });
  };

  const handleSendRequestAddFriend = (toUser) => {
    const body = {
      fromUser: data.user,
      toUser,
    };
    api({
      body: body,
      url: "/user/send-request-add-friend",
      method: typeHTTP.POST,
    }).then((res) => {
      console.log(res);
    });
  };

  const handleRefuse = (toUser) => {
    const body = {
      fromUser: data.user,
      toUser,
    };
    api({
      body: body,
      url: "/user/refuse-request",
      method: typeHTTP.POST,
    }).then((res) => {
      console.log(res);
    });
  };

  const handleAccept = (toUser) => {
    const body = {
      fromUser: data.user,
      toUser,
    };
    api({
      body: body,
      url: "/user/accept-request",
      method: typeHTTP.POST,
    }).then((res) => {
      console.log(res);
    });
  };

  const checkRelationship = (otherUser) => {
    if (
      data.user.friends.map((item) => item.friendId).includes(otherUser._id)
    ) {
      const friend = data.user.friends.filter(
        (item) => item.friendId === otherUser._id
      )[0];
      if (friend.status === "pending") {
        return <button>Da gui loi mooi ket ban</button>;
      } else {
        if (friend.status === "request") {
          return (
            <>
              <button onClick={() => handleAccept(otherUser)}>Chap Nhan</button>
              <button onClick={() => handleRefuse(otherUser)}>Tu Choi</button>
            </>
          );
        } else {
          return <button>Ban be</button>;
        }
      }
    } else {
      return (
        <button onClick={() => handleSendRequestAddFriend(otherUser)}>
          Gui loi moi ket ban
        </button>
      );
    }
  };

  return (
    <div>
      <h1>{data.user?.username}</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => handleSearch()}>Search</button>
      <div>
        {results.map((result, index) => {
          return (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <img
                style={{ height: "40px" }}
                src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
              />
              <span>{result.username}</span>
              {checkRelationship(result)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Addfriend;
