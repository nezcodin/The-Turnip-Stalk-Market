import { Link } from "react-router-dom"

export const ProfitCalculator = () => {
  return (
    <div className="flex items-center justify-center flex-col p-11">
      <p className="font-motivasansbold text-2xl m-6">Choose one of the options below:</p>
      <Link to='desired-profit'>
        <button className="m-6 bg-vividorange text-white p-3 rounded-lg text-xl hover:bg-orangehover">Calculate Turnip Price Needed for Desired Profit</button>
      </Link>
      <Link to='minimum-profit'>
        <button className="m-6 bg-vividorange text-white p-3 rounded-lg text-xl hover:bg-orangehover">Calculate Minimum Turnip Price Needed for Profit</button>
      </Link>
    </div>
  )
}