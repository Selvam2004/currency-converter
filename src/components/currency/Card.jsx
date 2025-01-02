import { useTheme } from '@/utils/themeProvider';
import React from 'react'

function Card({currency}) { 
  const {theme} = useTheme();
  return (
    <div className="w-4/12">

      <div className={`${theme=="light"?"bg-white":"bg-gray-950 text-white" } me-3 ms-3 mb-3  shadow-md p-5 rounded-lg border border-gray-300`}>
        
        <h2 className="text-xl font-semibold mb-2">{currency.name}</h2>
        <p className="text-gray-500">Symbol: {currency.symbol}</p>
        <p className="text-gray-500">Code: {currency.code}</p>
        <p className="mt-4 text-lg">
          Value:{" "}
          <span className="font-bold">
            {currency.value ? `${currency.value} ${currency.symbol} ` : "N/A"}
          </span>
        </p>

      </div>

    </div>
  )
}

export default Card