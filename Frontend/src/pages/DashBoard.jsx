import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";

function DashBoard(){
    const [name, setName] = useState("");
    const [balance,setBalance] = useState("");
    const navigate = useNavigate();
    const [alert, setAlert] = useState({ message: "", type: "" });
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/signin");
        }
    }, [token, navigate]);

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((response)=>{
            setBalance(response.data.balance)
            setName(response.data.name);
            localStorage.setItem("user",response.data.name)
        }).catch((err)=>{
            setAlert({ message: err.response?.data?.msg || "An error occurred. Please try again.", type: "error" });
        })
    },[])

    return(
        <>
        {token && 
        <div>
            <AppBar name={name.toUpperCase()}/>
            <div className="m-8">
                <Balance value={balance}/>
                <Users/>
            </div>
        </div> || navigate("/signin")}
        {alert.message && (
            <CustomAlert
                message={alert.message}
                type={alert.type}
                onClose={() => setAlert({ message: "", type: "" })}
            />
        )}
        </>
    );
}

export default DashBoard;