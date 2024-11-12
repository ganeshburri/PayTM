import {Heading} from "../components/Heading";
import {SubHeading} from "../components/SubHeading";
import {InputBox} from "../components/InputBox";
import {Button} from "../components/Button";
import {BottomWarning} from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return(
        <div className="bg-slate-300 h-screen flex justify-center items-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 px-4 shadow-2xl">
                    <Heading label={"Sign up"}/>
                    <SubHeading label={"Enter your information to create an account"}/>
                    <InputBox label={"First Name"} 
                        placeholder={"John"} 
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <InputBox label={"Last Name"}
                        placeholder={"Doe"} 
                        onChange={e => setLastName(e.target.value)}
                    />
                    <InputBox label={"Email"} 
                        placeholder={"John@gmail.com"} 
                        onChange={e => setEmail(e.target.value)}
                    />
                    <InputBox label={"Password"} 
                        placeholder={"12345678"} 
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button label={"Sign up"} onClick={async()=>{
                        try{
                            const response = await axios.post("http://localhost:3000/api/v1/users/signup",{
                                email,
                                firstName,
                                lastName,
                                password
                            })
                            localStorage.setItem("token",response.data.token)
                            navigate("/dashboard")
                        }
                        catch(err){
                            alert(err.response.data.msg)
                        }
                    }}/>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
                </div>
        </div>
    );
}
export default SignUp;