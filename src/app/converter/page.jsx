"use client"
import api from "@/utils/api"
import Data from '../../assets/option'
import { useEffect, useState } from "react";
function Converter() {
  const options = Data;
  const [symbol, setSymbol] = useState("$");
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [error, setError] = useState('');
  const [conversionResult, setConversionResult] = useState(null);
  const [time, setTime] = useState(null);
  const [conversion, setConversion] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sym = options.filter(value => value.code == fromCurrency);
    if (sym[0]) {
      setSymbol(sym[0].symbol);
    }
    else {
      setSymbol("$");
    }
  }, [fromCurrency])

  const handleSubmit = async () => {
    if (amount && fromCurrency && toCurrency) {
      setError("");
      if (amount <= 0) {
        setError("*Enter valid amount");
      }
      else {
        setLoading(true);
        await api.get(`/v3/latest?currencies=${toCurrency}&base_currency=${fromCurrency}`)
          .then(res => {
            const data = res?.data?.data;
            const time = res?.data?.meta?.last_updated_at;
            const value = data[toCurrency]?.value;
            setConversionResult(value);
            setConversion([fromCurrency, toCurrency]);
            setTime(time);
            setLoading(false);
          })
          .catch(err => {
            console.log(err.message);
            setError(err.message);
            setLoading(false);
          })
      }
    }
    else {
      setError("*Please enter all details");
    }
  }
  return (
    <div className=' mt-20 h-full flex flex-col'>

      <div className='w-4/6 h-96 m-auto shadow-2xl bg-white dark:bg-gray-950 dark:text-white rounded-3xl p-5 '>

        <div className="ms-3">
          
          <h2 className='text-3xl font-bold '>Exchange Rate Today</h2>

          <div className='mt-10 w-full flex flex-row'>

            <div className="me-5 w-full">
              <label className='font-bold'>Amount</label><br />
              <div className="flex items-center mt-4 border-2 border-gray-500 rounded-lg ">
                <span className="px-4 border-r border-gray-300">
                  {symbol}
                </span>
                <input type='number' onChange={e => setAmount(e.target.value)} value={amount} className=' p-1 dark:bg-gray-950 rounded-lg mb-2 mt-2 focus:outline-none' placeholder='Enter Amount' />
              </div>
            </div>

            <div className='me-5 w-full'>
              <label className='font-bold'>From</label><br />
              <select value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)} className='p-3.5 ps-5 dark:bg-gray-950 bg-white mt-4 pe-5 w-full border-2 border-gray-500 rounded-lg me-5 ' placeholder="Country from">
                <option value="">Choose the country</option>
                {options.map((opt, i) => {
                  return (
                    <option key={i} value={opt.code}>{opt.name}</option>
                  )
                })}
              </select>
              <span className="text-red-700">{error}</span>
            </div>

            <div className='me-5 w-full'>
              <label className='font-bold'>To</label><br />
              <select value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)} className='p-3.5 ps-5 bg-white dark:bg-gray-950 mt-4 pe-5 w-full border-2 border-gray-500 rounded-lg me-5' placeholder="Country from">
                <option value="">Choose the country</option>
                {options.map((opt, i) => {
                  return (
                    <option key={i} value={opt.code}>{opt.name}</option>
                  )
                })}
              </select>
            </div>

          </div>

          <div className='flex flex-row mt-10 me-14 justify-between ms-2'>

            {loading ? <div className="ms-8 mt-5">Loading...</div> : <div className={`p-5  mb-10 bg-blue-100 rounded-lg text-blue-900 ps-14 pe-14 ${conversionResult == null ? "invisible" : ""} `}>
              {amount} {conversion[0]} = <span className='font-bold text-2xl'>{amount * conversionResult} {conversion[1]}</span><br />
              <span>
                {amount} {conversion[1]} = {amount / conversionResult} {conversion[0]}
              </span>
            </div>}

            <div className="flex flex-col items-end">
              <button onClick={handleSubmit} className='bg-blue-800 text-white flex rounded-3xl text-lg p-1 items-center ps-10 pe-10  mb-3'><span className="pe-2">Covert</span> <span className="text-5xl pb-2">&#8250;</span></button><br />
              <span className={` ms-3 font-thin text-sm text-gray-500 ${conversionResult == null ? "invisible" : ""} `}>last updated: {time} </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Converter