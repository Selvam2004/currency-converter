"use client";
import api from "@/utils/api";
import Data from "../../assets/option";
import {  useEffect, useState } from "react";

function History() {
  const options = Data;
  const [symbol, setSymbol] = useState("$");
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [conversionResult, setConversionResult] = useState(null); 
  const [conversion, setConversion] = useState([]);
  const [loading, setLoading] = useState(false);
 
  useEffect(()=>{
    const sym = options.filter(value=>value.code==fromCurrency);
    if(sym[0]){
      setSymbol(sym[0].symbol);
    }
    else{
      setSymbol("$");
    }
  },[fromCurrency])

  const handleSubmit = async () => {
    if (amount && fromCurrency && toCurrency && date) {
      setError("");
      if (amount <= 0) {
        setError("*Enter a valid amount");
      } else {
        setLoading(true);
        const endpoint = `/v3/historical?date=${date}&currencies=${toCurrency}&base_currency=${fromCurrency}`;
        await api
          .get(endpoint)
          .then((res) => {
            const data = res?.data?.data; 
            const value = data[toCurrency]?.value;
            setConversionResult(value);
            setConversion([fromCurrency, toCurrency]); 
            setLoading(false);
          })
          .catch((err) => {
            console.log(err.message);
            setError(err.message);
            setLoading(false);
          });
      }
    } else {
      setError("*Please enter all details");
    }
  };

  return (
    <div className=" h-full flex flex-col">

      <div className="w-4/6 h-auto m-auto shadow-2xl bg-white dark:bg-gray-950 dark:text-white rounded-3xl p-5">

        <div className="ms-3">

          <h2 className="text-3xl font-bold">Exchange Rate at specific Date</h2>
 
          <div className="mt-10 w-full flex flex-row">

            <div className="me-5 w-full">
              <label className="font-bold">Amount</label>
              <br />
              <div className="flex items-center mt-4 border-2 border-gray-500 rounded-lg">
                <span className="px-4 border-r border-gray-300">{symbol}</span>
                <input
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  className="p-1 rounded-lg mb-2 mt-2 dark:bg-gray-950  focus:outline-none w-full"
                  placeholder="Enter Amount"
                />
              </div>
            </div>

            <div className="me-5 w-full">
              <label className="font-bold">Date</label>
              <br />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className=" mt-4 p-3 bg-white w-full border-2 dark:bg-gray-950  border-gray-500 rounded-lg"
              />
            </div>
            
          </div>

          
          <div className="mt-5 w-full flex flex-row">

            <div className="me-5 w-full">
              <label className="font-bold">From</label>
              <br />
              <select
                value={fromCurrency}
                onChange={(e) => {
                  setFromCurrency(e.target.value)
                }}
                className="p-3.5 ps-5 bg-white mt-4 w-full border-2 dark:bg-gray-950  border-gray-500 rounded-lg"
                 
              >
                <option value="">Choose the country</option>
                {options.map((opt, i) => (
                  <option key={i} value={opt.code}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="me-5 w-full">
              <label className="font-bold">To</label>
              <br />
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="p-3.5 ps-5 bg-white mt-4 w-full border-2 dark:bg-gray-950  border-gray-500 rounded-lg"
                
              >
                <option value="">Choose the country</option>
                {options.map((opt, i) => (
                  <option key={i} value={opt.code}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

           
          {error && <span className="text-red-700 mt-3">{error}</span>}
 
          <div className="flex flex-row mt-10 justify-between">

            {loading ? (
              <div className="ms-8 mt-5">Loading...</div>
            ) : (
              <div
                className={`p-5 mb-10 bg-blue-100 rounded-lg text-blue-900 ps-14 pe-14 ${
                  conversionResult == null ? "invisible" : ""
                }`}
              >
                {amount} {conversion[0]} ={" "}
                <span className="font-bold text-2xl">
                  {amount * conversionResult} {conversion[1]}
                </span>
                <br />
                <span>
                  {amount} {conversion[1]} = {amount / conversionResult}{" "}
                  {conversion[0]}
                </span>
              </div>
            )}

            <div className="me-5">
              <button
                onClick={handleSubmit}
                className="bg-blue-800 text-white flex rounded-3xl text-lg p-1 items-center ps-10 pe-10 mb-3"
              >
                <span className="pe-2">Convert</span>
                <span className="text-5xl pb-2">&#8250;</span>
              </button> 
            </div>

          </div>

        </div>

      </div>
      
    </div>
  );
}

export default History;
