export default function SendMoney(){
    return <div className="flex justify-center h-screen items-center p-4 bg-gray-100">
            <div className="border h-min max-w-md p-4 w-96 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col p-6">
                    <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-green-500
                                flex items-center justify-center">
                        <span className="text-2xl text-white">A</span>
                        </div>
                        <h3 className="text-2xl font-semibold">Friend's Name</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="amount">
                                Amount (in Rs)
                            </label>
                            <input
                                type="number"
                                className="flex h-10 w-full rounded-md border 
                                    border-input px-3 py-2 text-sm"
                                id="amount"
                                placeholder="Enter amount"
                            />
                        </div>
                        <button className="rounded-md text-sm font-medium h-10
                            px-4 py-2 w-full bg-green-500 hover:bg-green-600
                            focus:ring-4 focus:ring-green-300 text-white">
                            Initiate Transfer
                        </button>
                    </div>
                </div>
            </div>
    </div>
}

