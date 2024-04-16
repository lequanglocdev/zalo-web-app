import { faker } from "@faker-js/faker";
const mockData = {
  message: {
    _id: "message-id-01",
    title: "lequanglocdev",
    listUsers: [
      {
        _id: "listUser-id-01",
        title: "message 01",

        users: [
          {
            _id: "user-id-01",
            name: "Le QuangLoc1",
            description: "Sinh viên khoa cntt",
          },
          {
            _id: "user-id-02",
            name: "Le QuangLoc2",
            description: "Sinh viên khoa cntt",
          },
          {
            _id: "user-id-03",
            name: "Le QuangLoc3",
            description: "Sinh viên khoa cntt",
          },
          {
            _id: "user-id-04",
            name: "Le QuangLoc4",
            description: "Sinh viên khoa cntt",
          },
          {
            _id: "user-id-04",
            name: "Le QuangLoc4",
            description: "Sinh viên khoa cntt",
          },
          {
            _id: "user-id-04",
            name: "Le QuangLoc4",
            description: "Sinh viên khoa cntt",
          },
          {
            _id: "user-id-04",
            name: "Le QuangLoc4",
            description: "Sinh viên khoa cntt",
          },
          {
            _id: "user-id-04",
            name: "Le QuangLoc4",
            description: "Sinh viên khoa cntt",
          },
          {
            _id: "user-id-04",
            name: "Le QuangLoc4",
            description: "Sinh viên khoa cntt",
          },
          {
            _id: "user-id-04",
            name: "Le QuangLoc4",
            description: "Sinh viên khoa cntt",
          },
        ],
      },
    ],
  },
};
const chatHistory = [
  {
    type: "msg",
    message: "Hi 👋🏻, How are ya ?",
    incoming: true,
    outgoing: false,
  },
  {
    type: "divider",
    text: "Today",
  },
  {
    type: "msg",
    message: "Hi 👋 Panda, not bad, u ?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Can you send me an abstarct image?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Ya sure, sending you a pic",
    incoming: true,
    outgoing: false,
  },

  {
    type: "msg",
    subtype: "img",
    message: "Here You Go",
    img: faker.image.animals(),
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    message: "Can you please send this in file format?",
    incoming: false,
    outgoing: true,
  },

  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "reply",
    reply: "This is a reply",
    message: "Yep, I can also do that",
    incoming: false,
    outgoing: true,
  },
];

const messageOption = [
  {
    title: "Reply",
  },
  {
    title: "React to message",
  },
  {
    title: "Forward message",
  },
  {
    title: "Start message",
  },
  {
    title: "Delete message",
  },
];
const ChatList = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "9:36",
    unread: 2,
    pinned: true,
    online: true,
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "12:02",
    unread: 2,
    pinned: true,
    online: false,
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "10:35",
    unread: 3,
    pinned: false,
    online: true,
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "04:00",
    unread: 0,
    pinned: false,
    online: true,
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 5,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 6,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 7,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
];

export { mockData, chatHistory, messageOption, ChatList };
