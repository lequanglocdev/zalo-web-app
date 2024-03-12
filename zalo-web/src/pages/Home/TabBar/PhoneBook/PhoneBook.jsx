import Box from "@mui/material/Box";
import ListPhone from "./ListPhone/ListPhone";

const PhoneBook = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        // width: (theme) => theme.zalo.asideChatWidth,
        width:"100%",
      }}
    >
      <Box>
        <ListPhone />
      </Box>
    </Box>
  );
};

export default PhoneBook;
