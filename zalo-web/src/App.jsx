import Home from "./pages/Home/TabBarHome";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth/_id";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="home" element={<Home />}>
        
        </Route>
      </Routes>
    </>
  );
}

export default App;
