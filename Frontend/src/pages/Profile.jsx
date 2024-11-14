import {Heading} from "../components/Heading";
import {InputBox} from "../components/InputBox";
import {Button} from "../components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {AppBar} from "../components/AppBar";

function Profile(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const info = async()=>{
            try {
                const response = await axios.get("http://localhost:3000/api/v1/users/me", {
                    headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                setFirstName(response.data.user.firstName)
                setLastName(response.data.user.lastName)
                setEmail(response.data.user.email)
            } catch (error) {
                alert(error.response.data.msg)
                navigate("/signin")
            }
        }
        info()
    },[])
    
    return(
        <>
        { localStorage.getItem("token") && <>
        <AppBar name={localStorage.getItem("user").toUpperCase()}/>
        <div className="h-screen flex justify-center items-center">
                <div className="rounded-lg bg-grey-700 w-80 text-center p-2 px-4 shadow-2xl">
                    <Heading label={"Your Profile"}/>
                    <InputBox label={"First Name"} 
                        placeholder={"John"} value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <InputBox label={"Last Name"}
                        placeholder={"Doe"} value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                    <InputBox label={"Email"} 
                        placeholder={"John@gmail.com"} value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <InputBox label={"New Password"} 
                        placeholder={"12345678"} 
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button label={"Update Profile"} onClick={async()=>{
                        try{
                            await axios.patch("http://localhost:3000/api/v1/users/me",{
                                email,
                                firstName,
                                lastName,
                                password
                            },
                            {
                                headers: {
                                Authorization: "Bearer " + localStorage.getItem("token"),
                                },
                            })
                            navigate("/dashboard")
                        }
                        catch(err){
                            alert(err.response.data.msg)
                        }
                    }}/>
                </div>
        </div>
        </> || navigate("/signin")}
        </>
    )
}

export default Profile;