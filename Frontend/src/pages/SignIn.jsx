import {Heading} from "../components/Heading";
import {SubHeading} from "../components/SubHeading";
import {InputBox} from "../components/InputBox";
import {Button} from "../components/Button";
import {BottomWarning} from "../components/BottomWarning";

function SignIn(){
    return(
        <div className="bg-slate-300 h-screen flex justify-center items-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 px-4 shadow-2xl">
                    <Heading label={"Sign in"}/>
                    <SubHeading label={"Enter your credentials to access your account"}/>
                    <InputBox label={"Email"} placeholder={"John@gmail.com"}/>
                    <InputBox label={"Password"} placeholder={"12345678"}/>
                    <Button label={"Sign in"}/>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
                </div>
        </div>
    );
}
export default SignIn;