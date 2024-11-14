import DropDown from "./DropDown.jsx";

export function AppBar({name}){
    return(
        <div className="shadow h-14 flex justify-between font-bold">
            <div className="flex flex-col justify-center h-full ml-4">
                <a href="/dashboard">PayTM App</a>
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