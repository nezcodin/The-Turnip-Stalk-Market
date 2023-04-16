import { useState } from "react";

export const DesiredProfit = () => {
  const [numberOfTurnips, setNumberOfTurnips] = useState();
  const [totalCost, setTotalCost] = useState();
  const [desiredProfit, setDesiredProfit] = useState();
  const [minimumSellingPrice, setMinimumSellingPrice] = useState(null);

  const calculateMinimumPrice = () => {
    // Perform the calculations
    const profit = desiredProfit - totalCost;
    const profitPerTurnip = profit / numberOfTurnips;
    const purchasePricePerTurnip = totalCost / numberOfTurnips;
    const minimumSellingPrice = purchasePricePerTurnip + profitPerTurnip;

    // Update the state with the minimum selling price
    setMinimumSellingPrice(minimumSellingPrice);
  };

  return (
    <div className="flex font-motivasansmedium items-center justify-center flex-col p-10 text-xl">
      <p className="p-6">
        I bought
        <input
          type="number"
          value={numberOfTurnips}
          onChange={(e) => setNumberOfTurnips(parseInt(e.target.value))}
          className="w-20 mx-2 rounded-lg text-center pl-3"
        ></input>{" "}
        turnips for a total of
        <input
          type="number"
          value={totalCost}
          onChange={(e) => setTotalCost(parseInt(e.target.value))}
          className="w-32 mx-2 rounded-lg text-center pl-3"
        ></input>{" "}
        bells.
      </p>
      <p className="p-6">
        I want to make at least
        <input
          type="number"
          value={desiredProfit}
          onChange={(e) => setDesiredProfit(parseInt(e.target.value))}
          className="w-36 mx-2 rounded-lg text-center pl-3"
        ></input>{" "}
        bells.
      </p>
      <button
        className="m-6 font-finkheavy bg-vividorange text-white p-3 rounded-lg text-2xl hover:bg-orangehover"
        onClick={calculateMinimumPrice}
      >
        Calculate
      </button>
      {minimumSellingPrice !== null && (
        <p className="p-6">
          You need to find a turnip price of at least {minimumSellingPrice} bells
          to achieve your goal.
        </p>
      )}
    </div>
  );
};
