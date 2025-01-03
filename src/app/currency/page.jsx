"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import Data from "../../assets/option";
import Card from "@/components/currency/Card";
import { useTheme } from "@/utils/themeProvider";

function Currency() {
  const {theme} = useTheme();
  const [currency,setCurrency] = useState({
    baseCurrency : "INR",
    currenciesData : [],
    page : 1,
    data : [],
    error:"",
    loading : false,
  })

  const total = Math.floor(currency.currenciesData.length / 9);

  useEffect(() => {
    const initial = localStorage.getItem('initial');
    if (initial) {
      setCurrency({...currency,baseCurrency : initial});
    }
  }, []);
  
  useEffect(() => {
    const fetchCurrencies = async () => {
      setCurrency((prev)=>({...prev,loading:true}));
      try {
        const endPoint=`/v3/latest?base_currency=${currency.baseCurrency}`; 
        const res = await api.get(endPoint);
        const data = res?.data?.data;
        if (data) {
          const formattedData = Data.map((country) => ({
            ...country,
            value: data[country.code]?.value,
          })); 
          setCurrency((prev)=>({...prev,currenciesData : formattedData}));
          localStorage.setItem('initial', currency.baseCurrency);
        }
        setCurrency((prev)=>({...prev,loading:false}));
      } catch (err) {
        console.error("Error fetching currency data:", err.message);
        setCurrency((prev)=>({...prev,loading:false,error:err.message}));
      }
    };

    fetchCurrencies();
  }, [currency.baseCurrency]);

  useEffect(() => {
    const data = currency.currenciesData?.slice(currency.page * 9, (currency.page * 9) + 9);
    setCurrency((prev) => ({ ...prev, data }));
  }, [currency.baseCurrency, currency.page, currency.currenciesData]);

  return (
    <div className={`${theme=="light"?"bg-gray-100":"bg-gray-950 text-white" } p-8  min-h-screen rounded-2xl`}>

      <div className="flex items-center justify-between mb-6">

        <h1 className="text-3xl font-bold">Currency Dashboard</h1>

        <select
          value={currency.baseCurrency}
          onChange={(e) => setCurrency((prev)=>({...prev,baseCurrency:e.target.value}))}
          className={`p-3 rounded-lg border-2 border-gray-500  ${theme=="light"?"":"bg-gray-950"} `}
        >
          {Data.map((country, i) => (
            <option key={i} value={country.code}>
              {country.name} ({country.code})
            </option>
          ))}

        </select>

      </div>

      {currency.loading ? (
        <p className="text-center text-lg">Loading currency data...</p>
      ) : currency.error ? <p className="text-center text-lg">{currency.error}</p> : (
        <div className="flex flex-wrap  ">
          {currency.data.map((currency, index) => (
            <Card key={index} currency={currency} />
          ))}
        </div>
      )}
      {!currency.loading && !currency.error &&
      <div className="text-center">
        <button className="p-2 text-white rounded-lg ps-3 pe-4 bg-blue-700 me-16" onClick={() => setCurrency((currency)=>({...currency,page:currency.page-1}))} disabled={currency.page <= 1}>Previous</button>
        <p className="inline">{currency.page} of {total}</p>
        <button className="p-2 text-white rounded-lg ps-8 pe-8 bg-blue-700 ms-16" onClick={() => setCurrency((currency)=>({...currency,page:currency.page+1}))} disabled={currency.page ==total}>Next</button>
      </div>}


    </div>
  );
}

export default Currency;
