import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SendMoney from "./pages/SendMoney";
import DashBoard from "./pages/DashBoard";
import useIsSignedIn from "./components/useIsSignedIn";
import Loading from "./components/Loading";
import Profile from "./pages/Profile";

function App(){
  const { isSignedIn, loading } = useIsSignedIn();

  if(loading){
    return <Loading/>
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            isSignedIn?<Navigate to={"/dashboard"}/>:<Navigate to={"/signin"}/>}
          />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/dashboard" element={<DashBoard/>}/>
          <Route path="/send" element={<SendMoney/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;