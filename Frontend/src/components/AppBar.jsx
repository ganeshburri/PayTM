import DropDown from "./DropDown.jsx";
import { Link } from "react-router-dom";

export function AppBar({name}){
    return(
        <div className="shadow h-14 flex justify-between font-bold">
            <div className="flex flex-col justify-center h-full ml-4">
                <Link to="/dashboard">PayTM App</Link>
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello
                </div>
                <DropDown name={name}/>
            </div>
        </div>
    )
}