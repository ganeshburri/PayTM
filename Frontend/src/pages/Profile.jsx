import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import CustomAlert from "../components/CustomAlert";

function Profile(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [alert, setAlert] = useState({message: "", type: ""})
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/signin");
        }
    }, [token, navigate]);

    useEffect(()=>{
        const info = async()=>{
            try {
                const response = await axios.get("http://localhost:3000/api/v1/users/me", {
                    headers: {
                    Authorization: "Bearer " + token,
                    },
                });
                setFirstName(response.data.user.firstName)
                setLastName(response.data.user.lastName)
                setEmail(response.data.user.email)
            } catch (err) {
                setAlert({ message: err.response?.data?.msg || "An error occurred. Please try again.", type: "error" });
            }
        }
        info()
    },[])

    const handleUpdate = async()=>{
        try{
            await axios.patch("http://localhost:3000/api/v1/users/me",{
                email,
                firstName,
                lastName,
                password
            },
            {
                headers: {
                Authorization: "Bearer " + token,
                },
            })
            setAlert({message: "Update Success", type: "success"})
            setTimeout(()=> navigate("/dashboard"),2000);
        }
        catch(err){
            setAlert({message: err?.response?.data?.msg || "Something went wrong, Please try again later!", type: "error"})
        }
    }

    return(
        <>
        { token && <>
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
                    <Button label={"Update Profile"} onClick={handleUpdate}/>
                </div>
        </div>
        </> || navigate("/signin")}
        {alert.message &&
            <CustomAlert
                message={alert.message}
                type={alert.type}
                onClose={() => setAlert({ message: "", type: "" })}
            />
        }
        </>
    )
}

export default Profile;