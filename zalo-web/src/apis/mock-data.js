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

export { mockData ,chatHistory };
