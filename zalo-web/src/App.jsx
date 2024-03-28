import Home from "./pages/Home/TabBarHome";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth/_id";
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
        <Route path="home" element={<Home />}></Route>
      </Routes>
    </GlobalContext>
  );
}

export default App;
