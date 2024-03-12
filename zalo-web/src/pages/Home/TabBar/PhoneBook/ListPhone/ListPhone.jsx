import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DraftsIcon from "@mui/icons-material/Drafts";
import Typography from "@mui/material/Typography";
import Search from "~/components/Search/Search";

const ListPhone = () => {
  return (
    <Box
      sx={{
        width: (theme) => theme.zalo.asideChatWidth,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #dfe6e9",
      }}
    >
      <Search sx={{ height: (theme) => theme.zalo.heightSearch }} />

      <Box sx={{ height: (theme) => theme.zalo.heightList }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
            height: "56px",
            cursor: "pointer",
            borderRadius: "8px",
          }}
        >
          <PersonIcon />
          <Typography sx={{ marginLeft: "20px" }}>Danh sách bạn bè</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
            height: "56px",
            cursor: "pointer",
          }}
        >
          <PeopleAltIcon />
          <Typography sx={{ marginLeft: "20px" }}>Danh sách nhóm</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
            height: "56px",
            cursor: "pointer",
          }}
        >
          <DraftsIcon />
          <Typography sx={{ marginLeft: "20px" }}>Lời mời kết bạn</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ListPhone;
