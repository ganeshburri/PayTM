import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SendMoney from "./pages/SendMoney";
import DashBoard from "./pages/DashBoard";
import useIsSignedIn from "./components/useIsSignedIn";
import Loading from "./components/Loading";

function App(){
  const { isSignedIn, loading } = useIsSignedIn();
  if(loading){
    return<Loading/>
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            isSignedIn?<Navigate to={"/dashboard"}/>:<Navigate to={"/signin"}/>}
          />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={
            isAuth()?<Navigate to={"/dashboard"}/>:<SignIn/>}
          />
          <Route path="/dashboard" element={
            isAuth()?<DashBoard/>:<Navigate to={"/signin"}/>}
          />
          <Route path="/send" element={
            isAuth()?<SendMoney/>:<Navigate to={"/signin"}/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function isAuth(){
  const token = localStorage.getItem("token");
  if(token){
    return true;
  }
  else{
    return false;
  }
}

export default App;