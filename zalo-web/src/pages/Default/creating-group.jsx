import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { api, typeHTTP } from "../../utils/api";
import { globalContext } from "../../context/globalContext";

const CreatingGroup = () => {
  const { data } = useContext(globalContext);
  const [result, setResult] = useState([]);
  const [phone, setPhone] = useState("");
  const [groupName, setGroupName] = useState("");
  const [participants, setParticipants] = useState([]);
  const [image, setImage] = useState();

  useEffect(() => setParticipants([data.user]), [data.user]);

  const handleSearch = () => {
    setResult([]);
    api({ url: "/user/find", method: typeHTTP.GET }).then((res) => {
      const arr = [];
      res.forEach((item) => {
        if (item.phone.includes(phone.toLowerCase())) {
          arr.push(item);
        }
      });
      setResult(arr);
    });
  };

  const handleFile = (e) => {
    const files = e.target.files;
    setImage(files[0]);
  };

  const handleCreateGroup = () => {
    if (image) {
      const formData = new FormData();
      formData.append("name", groupName);
      formData.append("type", "group");
      formData.append("image", image);
      participants.forEach((item) => {
        formData.append("users", item._id);
      });
      api({
        url: "/room/create-group",
        method: typeHTTP.POST,
        body: formData,
      }).then((res) => {
        alert("Create group successfully");
      });
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        className="users"
        style={{ padding: 20, minWidth: "30%", borderRight: "2px solid #999" }}
      >
        <h1>Create Group</h1>
        <input type="file" accept="image/" onChange={(e) => handleFile(e)} />
        <input
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        {participants.map((user, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              margin: "10px 0",
            }}
          >
            <img
              src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
              height={"40px"}
              width={"40px"}
              style={{ borderRadius: "50%" }}
            />
            <span>{user?.username}</span>
          </div>
        ))}
        {participants.length >= 3 && groupName !== "" && image && (
          <button onClick={() => handleCreateGroup()}>Create</button>
        )}
      </div>
      <div style={{ padding: 20, minWidth: "30%" }}>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button onClick={() => handleSearch()}>Search</button>
        <div
          className="users"
          style={{
            padding: 20,
            minWidth: "30%",
          }}
        >
          <h1>Users Found</h1>
          {result.map((user, index) => (
            <div
              key={index}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <img
                src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                height={"40px"}
                width={"40px"}
                style={{ borderRadius: "50%" }}
              />
              <span>{user?.username}</span>
              {participants.map((item) => item._id).includes(user._id) ? (
                "Da trong nhom"
              ) : (
                <button
                  onClick={() => setParticipants([...participants, user])}
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatingGroup;
