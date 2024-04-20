import React, { useContext } from "react";
import { Container as MuiContainer } from "@mui/material";
import TabBar from "./TabBar/TabBar";
import Container from "./Container/Container";
import { mockData } from "../../apis/mock-data";
import { useState } from "react";
import { globalContext } from "../../context/globalContext";

const Home = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(1);

  return (
    <MuiContainer disableGutters maxWidth={false}>
      <TabBar
        message={mockData?.message}
        selectedTabIndex={selectedTabIndex}
        onTabChange={(index) => setSelectedTabIndex(index)}
      />
    </MuiContainer>
  );
};

export default Home;
