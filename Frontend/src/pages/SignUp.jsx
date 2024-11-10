import {Heading} from "../components/Heading";
import {SubHeading} from "../components/SubHeading";
import {InputBox} from "../components/InputBox";
import {Button} from "../components/Button";
import {BottomWarning} from "../components/BottomWarning";

function SignUp(){
    return(
        <div className="bg-slate-300 h-screen flex justify-center items-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 px-4 shadow-2xl">
                    <Heading label={"Sign up"}/>
                    <SubHeading label={"Enter your information to create an account"}/>
                    <InputBox label={"First Name"} placeholder={"John"}/>
                    <InputBox label={"Last Name"} placeholder={"Doe"}/>
                    <InputBox label={"Email"} placeholder={"John@gmail.com"}/>
                    <InputBox label={"Password"} placeholder={"12345678"}/>
                    <Button label={"Sign up"}/>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
                </div>
        </div>
    );
}
export default SignUp;