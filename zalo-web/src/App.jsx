import Home from "./pages/Home/_id";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth/_id";
import ListUser from "./pages/Home/TabBar/Chat/ListUser/ListUser";
import User from "./pages/Home/TabBar/Chat/ListUser/User/User";
import ContainerChat from "./pages/Home/Container/ContainerChat/ContainerChat";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="home" element={<Home />}>
          {/* <Route path="/" exact component={ListUser} />
          <Route path="/user/:userId" component={User} />
          <Route path="/chat" component={ContainerChat} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
