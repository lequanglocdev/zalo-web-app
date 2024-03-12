import React from "react";
import { Container as MuiContainer } from "@mui/material";
import TabBar from "./TabBar/TabBar";
import Container from "./Container/Container";
import { mockData } from "../../apis/mock-data";
import { useState } from "react";

const Home = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(1);
  return (
    <MuiContainer
      disableGutters
      maxWidth={false}
      sx={{ height: "100vh", display: "flex" }}
    >
      <TabBar
        message={mockData?.message}
        selectedTabIndex={selectedTabIndex}
        onTabChange={(index) => setSelectedTabIndex(index)}
      />
      <Container
        message={mockData?.message}
        selectedTabIndex={selectedTabIndex}
      />
    </MuiContainer>
  );
};

export default Home;
