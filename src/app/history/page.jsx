"use client";
import api from "@/utils/api";
import Data from "../../assets/option";
import { useEffect, useState } from "react";
import { useTheme } from "@/utils/themeProvider";

function History() {
  const {theme} = useTheme();
  const options = Data;
  const [convert,setConvert] = useState({
    symbol : "$",
    amount : "",
    fromCurrency : "",
    toCurrency : "",
    date : "",
    error : "",
    conversionResult : [], 
    conversion : [],
    loading : false
  });  

  useEffect(() => {
    const sym = options.filter(value => value.code == convert.fromCurrency);
    if (sym[0]) {
      setConvert({...convert,symbol:sym[0].symbol});
    }
    else {
      setConvert({...convert,symbol:"$"});
    }
  }, [convert.fromCurrency])

  const handleChange =(e)=>{
    setConvert({
      ...convert,
      [e.target.name] : e.target.value,
    })
  }

  const handleSubmit = async () => {
    if (convert.amount && convert.fromCurrency && convert.toCurrency && convert.date) {
      setConvert({...convert,error:""});
      if (convert.amount <= 0) {
        setConvert({...convert,error:"*Enter valid amount"});
      } else {
        
        setConvert({...convert,loading:true});
        const endpoint = `/v3/historical?date=${convert.date}&currencies=${convert.toCurrency}&base_currency=${convert.fromCurrency}`;
        await api
          .get(endpoint)
          .then((res) => {
            const data = res?.data?.data;
            const value = data[convert.toCurrency]?.value;  
            setConvert({...convert,conversionResult:[value,convert.amount],conversion:[convert.fromCurrency,convert.toCurrency],loading:false,error:""});
          })
          .catch((err) => {
            setConvert({...convert,error:err.message,loading:false});
          });
      }
    } else {
      setConvert({...convert,error:"*Please enter all details"});
    }
  };

  return (
    <div className=" h-full flex flex-col">

      <div className={`${theme=="light"?"bg-white":"bg-gray-950 text-white"} w-4/6 h-auto m-auto shadow-2xl rounded-3xl p-5`}>

        <div className="ms-3">

          <h2 className="text-3xl font-bold">Exchange Rate at specific Date</h2>

          <div className="mt-10 w-full flex flex-row">

            <div className="me-5 w-full">
              <label className="font-bold">Amount</label>
              <br />
              <div className="flex items-center mt-4 border-2 border-gray-500 rounded-lg">
                <span className="px-4 border-r border-gray-300">{convert.symbol}</span>
                <input
                  type="number"
                  name="amount"
                  onChange={handleChange}
                  value={convert.amount}
                  className={`${theme=="light"?"":"bg-gray-950  text-white"} p-1 rounded-lg mb-2 mt-2 focus:outline-none w-full`}
                  placeholder="Enter Amount"
                />
              </div>
            </div>

            <div className="me-5 w-full">
              <label className="font-bold">Date</label>
              <br />
              <input
                type="date"
                name="date"
                value={convert.date}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className={`${theme=="light"?"bg-white":"bg-gray-950  text-white"} mt-4 p-3  w-full border-2 border-gray-500 rounded-lg`}
              />
            </div>

          </div>


          <div className="mt-5 w-full flex flex-row">

            <div className="me-5 w-full">
              <label className="font-bold">From</label>
              <br />
              <select
                value={convert.fromCurrency}
                onChange={handleChange}
                name="fromCurrency"
                className={`${theme=="light"?"bg-white":"bg-gray-950  text-white"} p-3.5 ps-5 mt-4 w-full border-2 border-gray-500 rounded-lg`}

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
                value={convert.toCurrency}
                onChange={handleChange}
                name="toCurrency"
                className={`${theme=="light"?"bg-white":"bg-gray-950 text-white"} p-3.5 ps-5 mt-4 w-full border-2 border-gray-500 rounded-lg`}

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


          {convert.error && <span className="text-red-700 mt-3">{convert.error}</span>}

          <div className="flex flex-row mt-10 justify-between">

            {convert.loading ? (
              <div className="ms-8  mb-10 p-5">Loading...</div>
            ) : (
              <div
                className={`p-5 mb-2 bg-blue-100 rounded-lg text-blue-900 ps-14 pe-14 ${convert.conversionResult[0] == null ? "invisible" : ""
                  }`}
              >
                {convert.conversionResult[1]} {convert.conversion[0]} ={" "}
                <span className="font-bold text-2xl">
                  {convert.conversionResult[1] * convert.conversionResult[0]} {convert.conversion[1]}
                </span>
                <br />
                <span>
                  {convert.conversionResult[1]} {convert.conversion[1]} = {convert.conversionResult[1] / convert.conversionResult[0]}{" "}
                  {convert.conversion[0]}
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
