import { useEffect, useState } from "react";
import {AppBar} from "../components/AppBar";
import {Balance} from "../components/Balance";
import {Users} from "../components/Users";
import axios from "axios";

function DashBoard(){
    const [name, setName] = useState("");
    const [balance,setBalance] = useState("");
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token") 
            }
        })
            .then((response)=>{
                setBalance(response.data.balance)
                setName(response.data.name);
                localStorage.setItem("user",response.data.name)
            })
    },[])
    return(
        <div>
            <AppBar name={name.toUpperCase()}/>
            <div className="m-8">
            <Balance value={balance}/>
            <Users/>
            </div>
        </div>
    );
}
export default DashBoard;