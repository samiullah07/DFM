import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig";


const OrderHistory = () => {

    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Use isReady to ensure router is fully initialized
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                fetchReceipts(user.email);
            }
        });
    }, []);

    const fetchReceipts = async (email) => { //this grabs the receipts matching to the email that the user is logged in with
        setLoading(true);
        const newReceipts = [];
        try {
            const querySnapshot = await getDocs(collection(db, "Receipts"));
            querySnapshot.forEach((doc) => {
                const receiptData = doc.data();
                if (receiptData.email === email) {
                    newReceipts.push({ id: doc.id, ...receiptData });
                }
            });
            setReceipts(newReceipts);
        } catch (error) {
            console.error("Error fetching receipts:", error);
        } finally {
            setLoading(false);
        }
    };

    const convertTimestampToDate = (timestamp) => { // this converts time stamp to normal readable date
        const date = new Date(timestamp);
        const options = { day: "numeric", month: "long", year: "numeric" };
        return date.toLocaleDateString(undefined, options);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={"orderHistoryWrapper"}> {/* Apply the scoped wrapper class */}
            <div className="bg-white">
                <div className="py-16 sm:py-24">
                    <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
                        <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                Order History
                            </h1>
                            <p className="mt-2 text-sm text-gray-500">
                                Check your recent orders.
                            </p>
                        </div>
                    </div>
                    <div className="mt-16">
                        <h2 className="sr-only">Recent orders</h2>
                        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
                            <div id="list" className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                                {receipts.length > 0 ? (
                                    receipts.map((receipt) => (
                                        <div
                                            key={receipt.id}
                                            className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                                        >
                                            <div
                                                className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                                                <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                                                    <div>
                                                        <dt className="font-medium text-gray-900">Order ID</dt>
                                                        <dd className="mt-1 text-gray-500">{receipt.id}</dd>
                                                    </div>
                                                    <div className="hidden sm:block">
                                                        <dt className="font-medium text-gray-900">Purchase Date</dt>
                                                        <dd className="mt-1 text-gray-500">
                                                            <time dateTime={convertTimestampToDate(receipt.time)}>
                                                                {convertTimestampToDate(receipt.time)}
                                                            </time>
                                                        </dd>
                                                    </div>
                                                    <div>
                                                        <dt className="font-medium text-gray-900">Total amount</dt>
                                                        <dd className="mt-1 font-medium text-gray-900">
                                                            £{receipt.total.toFixed(2)}
                                                        </dd>
                                                    </div>
                                                </dl>
                                                {/*<div
                                                    className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                                                    <a href="#"
                                                       className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                        <span>View Order</span>
                                                        <span className="sr-only">WU88191111</span>
                                                    </a>
                                                    <a href="#"
                                                       className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                        <span>View Invoice</span>
                                                        <span className="sr-only">for order WU88191111</span>
                                                    </a>
                                                </div>*/}
                                            </div>
                                            <ul role="list" className="divide-y divide-gray-200">
                                                {receipt.cart.map((item, i) => (
                                                    <li key={i} className="p-4 sm:p-6">
                                                        <div className="flex items-center sm:items-start">
                                                            <div
                                                                className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                                                                <img
                                                                    src={item.imageGallery[0]}
                                                                    alt={item.content}
                                                                    className="h-full w-full object-cover object-center"
                                                                />
                                                            </div>
                                                            <div className="ml-6 flex-1 text-sm">
                                                                <div
                                                                    className="font-medium text-gray-900 sm:flex sm:justify-between">
                                                                    <h5>{item.name}</h5>
                                                                    <p className="mt-2 sm:mt-0">£{item.price}</p>
                                                                </div>
                                                                <p className="hidden text-gray-500 sm:mt-2 sm:block">
                                                                    {item.content}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="ml-4 mb-8 flex items-center">
                                                <p className="ml-2 text-sm font-medium text-gray-500">
                                                    {receipt.status}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className=" orderHistoryText mt-2 text-md text-gray-500">You have no previous purchases on this account.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
