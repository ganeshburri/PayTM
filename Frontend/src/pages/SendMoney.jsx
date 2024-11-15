import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { AppBar } from "../components/AppBar";
import CustomAlert from "../components/CustomAlert";
const URL = import.meta.env.VITE_BACKEND_URL

export default function SendMoney() {
    const [searchParams] = useSearchParams();
    const [amount, setAmount] = useState("");
    const [alert, setAlert] = useState({ message: "", type: "" });
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/signin");
        }
    }, [token, navigate]);

    const handleTransfer = async () => {
        const amountInt = parseInt(amount);
        if (isNaN(amountInt) || amountInt <= 0) {
            setAlert({ message: "Please enter a valid amount.", type: "error" });
            return;
        }
        try {
            const response = await axios.post(`${URL}/account/transfer`, 
                { to: id, amount: amountInt }, 
                { headers: { Authorization: "Bearer " + token } }
            );
            setAlert({ message: response.data.msg, type: "success" });
            setTimeout(() => navigate("/dashboard"), 2000);
        } catch (err) {
            setAlert({ message: err.response?.data?.msg || "An error occurred. Please try again.", type: "error" });
        }
    };

    return (
        <>
            {token && (
                <>
                    <AppBar name={localStorage.getItem("user").toUpperCase()} />
                    <div className="flex justify-center h-screen items-center p-4 bg-gray-100">
                        <div className="border h-min max-w-md p-4 w-96 bg-white shadow-lg rounded-lg">
                            <div className="flex flex-col p-6">
                                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                        <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                                    </div>
                                    <h3 className="text-2xl font-semibold">{name}</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium" htmlFor="amount">
                                            Amount (in Rs)
                                        </label>
                                        <input
                                            type="number"
                                            onChange={e => setAmount(e.target.value)}
                                            className="flex h-10 w-full rounded-md border
                                            border-input px-3 py-2 text-sm"
                                            id="amount"
                                            placeholder="Enter amount"
                                            min="1"
                                        />
                                    </div>
                                    <button
                                        className="rounded-md text-sm font-medium 
                                        h-10 px-4 py-2 w-full bg-green-500 hover:bg-green-600
                                        focus:ring-4 focus:ring-green-300 text-white"
                                        onClick={handleTransfer}
                                    >
                                        Initiate Transfer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {alert.message && (
                        <CustomAlert
                            message={alert.message}
                            type={alert.type}
                            onClose={() => setAlert({ message: "", type: "" })}
                        />
                    )}
                </>
            )}
        </>
    );
}
