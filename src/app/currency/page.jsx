"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";  
import Data from "../../assets/option"; 
import Card from "@/components/currency/Card";

function Currency() {
  
  const [baseCurrency, setBaseCurrency] = useState("INR");
  const [currenciesData, setCurrenciesData] = useState([]);
  const [page,setPage] = useState(1);
  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const total = Math.floor(currenciesData.length/9);
  useEffect(()=>{
    const initial = localStorage.getItem('initial');
    if(initial){
      setBaseCurrency(initial);
    }
  },[])
  useEffect(() => {
    const fetchCurrencies = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/v3/latest?base_currency=${baseCurrency}`);
        const data = res?.data?.data;
        if (data) {
          const formattedData = Data.map((country) => ({
            ...country,
            value: data[country.code]?.value ,
          }));
          setCurrenciesData(formattedData); 
          localStorage.setItem('initial',baseCurrency);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching currency data:", err.message);
        setLoading(false);
      }  
    };

    fetchCurrencies();
  }, [baseCurrency]);

  useEffect(()=>{
    const data=currenciesData?.slice(page*9,(page*9)+9); 
    setData(data);
  },[baseCurrency,page,currenciesData]);

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-950 dark:text-white min-h-screen rounded-2xl">

      <div className="flex items-center justify-between mb-6">

        <h1 className="text-3xl font-bold">Currency Dashboard</h1>

        <select
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
          className="p-3 rounded-lg border-2 border-gray-500 dark:bg-gray-950 "
        >
          {Data.map((country,i) => (
            <option key={i} value={country.code}>
              {country.name} ({country.code})
            </option>
          ))}

        </select>

      </div>

      {loading ? (
        <p className="text-center text-lg">Loading currency data...</p>
      ) : (
        <div className="flex flex-wrap  ">
          {data.map((currency, index) => (
             <Card key={index} currency={currency}/>
          ))}
        </div>
      )}
      {!loading && <div className="text-center">
      <button className="p-2 text-white rounded-lg ps-3 pe-4 bg-blue-700 me-16" onClick={()=>setPage(page-1)} disabled={page<=1}>Previous</button>
      <p className="inline">{page} of {total}</p>
      <button className="p-2 text-white rounded-lg ps-8 pe-8 bg-blue-700 ms-16" onClick={()=>setPage(page+1)} disabled={page>=total}>Next</button>
      </div>}
      

    </div>
  );
}

export default Currency;
