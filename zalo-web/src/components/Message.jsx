import { Box, Stack } from "@mui/material";
import React from "react";
import { chatHistory } from "../apis/mock-data";
import {
  Timeline,
  TextMessage,
  MediaMessage,
  ReplyMessage,
  DocMessage,
} from "./MessageType";
const Message = () => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {chatHistory.map((el) => {
          switch (el.type) {
            case "divider":
              // Timeline
              return <Timeline el={el} />;

            case "msg":
              switch (el.subtype) {
                case "img":
                  return <MediaMessage el={el} />;

                case "doc":
                  return <DocMessage el={el} />;

                case "link":
                  // img
                  break;
                case "reply":
                  return <ReplyMessage el={el} />;

                default:
                  return <TextMessage el={el} />;
              }
              break;
            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
