import Box from "@mui/material/Box";
import ContainerChat from "./ContainerChat/ContainerChat";
import ContainerPhone from "./ContainerPhone/ContainerPhone";
const Container = ({ message, selectedTabIndex }) => {
  return (
    <Box
      sx={{
        width: (theme) => theme.zalo.widthContainerChat,
        height: "100vh",
      }}
    >
      {selectedTabIndex === 1 && <ContainerChat />}
      {selectedTabIndex === 2 && <ContainerPhone />}
    </Box>
  );
};

export default Container;
