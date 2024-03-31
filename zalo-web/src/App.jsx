import Home from "./pages/Home/TabBarHome";
import { Route, Routes } from "react-router-dom";

import { GlobalContext } from "./context/globalContext";
import VerificationPage from "./pages/Auth/verificationPage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <GlobalContext>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="home" element={<Home />}/>
      </Routes>
    </GlobalContext>
  );
}

export default App;
