import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";

function SignIn(){
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [alert, setAlert] = useState({message: "", type: ""})

    const handleSignIn = async()=>{
        try{
            const response = await axios.post("http://localhost:3000/api/v1/users/signin",
                { email, password } )
                localStorage.setItem("token",response.data.token)
                setAlert({message: "Welcome Back!!", type: "success"})
                setTimeout(()=> navigate("/dashboard"),2000);
        }
        catch(err){
            setAlert({message: err?.response?.data?.msg || "Something went wrong, Please try again later!", type: "error"})
        }
    }

    return(
        <>
        <div className="bg-slate-300 h-screen flex justify-center items-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 px-4 shadow-2xl">
                    <Heading label={"Sign in"}/>
                    <SubHeading label={"Enter your credentials to access your account"}/>
                    <InputBox label={"Email"} placeholder={"John@gmail.com"}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <InputBox label={"Password"} placeholder={"12345678"}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <Button label={"Sign in"} onClick={handleSignIn}/>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
                </div>
        </div>
        {alert.message &&
            <CustomAlert
                message={alert.message}
                type={alert.type}
                onClose={() => setAlert({ message: "", type: "" })}
            />
        }
        </>
    );
}

export default SignIn;