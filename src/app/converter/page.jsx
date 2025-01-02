"use client"
import api from "@/utils/api"
import Data from '../../assets/option'
import { useEffect, useState } from "react";
import { useTheme } from "@/utils/themeProvider";
function Converter() {
  const options = Data;
  const {theme} = useTheme();
  const [convert,setConvert] = useState({
    symbol : "$",
    amount : "",
    fromCurrency : "",
    toCurrency : "",
    error : "",
    conversionResult : null,
    time : null,
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
    if (convert.amount && convert.fromCurrency && convert.toCurrency) {
      setConvert({...convert,error:""});
      if (convert.amount <= 0) {
        setConvert({...convert,error:"*Enter valid amount"});
      }
      else {
        setConvert({...convert,loading:true});
        await api.get(`/v3/latest?currencies=${convert.toCurrency}&base_currency=${convert.fromCurrency}`)
          .then(res => {
            const data = res?.data?.data;
            const value = data[convert.toCurrency]?.value; 
            const time = res?.data?.meta?.last_updated_at;

            setConvert({...convert,conversionResult:value,conversion:[convert.fromCurrency,convert.toCurrency],time:time,loading:false});
          })
          .catch(err => { 
            setConvert({...convert,error:err.message,loading:false});
          })
      }
    }
    else {
      setConvert({...convert,error:"*Please enter all details"});
    }
  }
  return (

    <div className=' mt-20 h-full flex flex-col'>

      <div className={`${theme=="light"?'bg-white ':'bg-gray-950 text-white'} w-4/6 h-96 m-auto shadow-2xl rounded-3xl p-5 `}>

        <div className="ms-3">
          
          <h2 className='text-3xl font-bold '>Exchange Rate Today</h2>

          <div className='mt-10 w-full flex flex-row'>

            <div className="me-5 w-full">
              <label className='font-bold'>Amount</label><br />
              <div className="flex items-center mt-4 border-2 border-gray-500 rounded-lg ">
                <span className="px-4 border-r border-gray-300">
                  {convert.symbol}
                </span>
                <input type='number' name="amount" onChange={handleChange} value={convert.amount} className={`${theme=="light"?"":"bg-gray-950"} rounded-lg p-1.5 mb-1 mt-2 focus:outline-none`} placeholder='Enter Amount' />
              </div>
            </div>

            <div className='me-5 w-full'>
              <label className='font-bold'>From</label><br />
              <select value={convert.fromCurrency} name="fromCurrency"
                onChange={handleChange} className={`${theme=="light"?"bg-white":"bg-gray-950"} p-3.5 ps-5 mt-4 pe-5 w-full border-2 border-gray-500 rounded-lg me-5 `}>
                <option value="">Choose the country</option>
                {options.map((opt, i) => {
                  return (
                    <option key={i} value={opt.code}>{opt.name}</option>
                  )
                })}
              </select>
              <span className="text-red-700">{convert.error}</span>
            </div>

            <div className='me-5 w-full'>
              <label className='font-bold'>To</label><br />
              <select value={convert.toCurrency} name="toCurrency"
                onChange={handleChange} className={`${theme=="light"?"bg-white":"bg-gray-950"} p-3.5 ps-5 mt-4 pe-5 w-full border-2 border-gray-500 rounded-lg me-5`} placeholder="Country from">
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

            {convert.loading ? <div className="ms-8 mt-5">Loading...</div> : <div className={`p-5  mb-10 bg-blue-100 rounded-lg text-blue-900 ps-14 pe-14 ${convert.conversionResult == null ? "invisible" : ""} `}>
              {convert.amount} {convert.conversion[0]} = <span className='font-bold text-2xl'>{convert.amount * convert.conversionResult} {convert.conversion[1]}</span><br />
              <span>
                {convert.amount} {convert.conversion[1]} = {convert.amount / convert.conversionResult} {convert.conversion[0]}
              </span>
            </div>}

            <div className="flex flex-col items-end">
              <button onClick={handleSubmit} className='bg-blue-800 text-white flex rounded-3xl text-lg p-1 items-center ps-10 pe-10  mb-3'><span className="pe-2">Covert</span> <span className="text-5xl pb-2">&#8250;</span></button><br />
              <span className={` ms-3 font-thin text-sm text-gray-500 ${convert.conversionResult == null ? "invisible" : ""} `}>last updated: {convert.time} </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Converter