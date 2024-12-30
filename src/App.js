import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const arr = ["USD", "EUR", "GBP", "CNY", "JPY"];
  const [currency, setCurrency] = useState(0);
  const [selectCurrency, setSelectedCorrency] = useState("USD");
  const [convertedCurrency, setConvertedCurrency] = useState(0);
  const [isUp, setIsUp] = useState(true);
  const [diff, setDiff] = useState(0);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setCurrency(val);
  };

  const handleCurrencyType = (e) => {
    const type = e.target.value;
    setSelectedCorrency(type);
  };

  async function fetchCurrencyInfo() {
    const url = `https://api.frontendeval.com/fake/crypto/${selectCurrency}`;
    const data = await fetch(url);
    const json = await data.json();
    const val = json.value;
    const showCurrency = currency * val;
    setConvertedCurrency(showCurrency.toFixed(2));
    const prevVal = window.localStorage.getItem("prevVal");
    const diff = showCurrency.toFixed(2) - prevVal;
    diff < 0 ? setIsUp(false) : setIsUp(true);
    setDiff(diff.toFixed(2));

    window.localStorage.setItem("prevVal", showCurrency.toFixed(2));
  }

  useEffect(() => {
    let intervalTimeId = setInterval(() => {
      fetchCurrencyInfo();
    }, 3000);
    return () => clearInterval(intervalTimeId);
  }, [currency, selectCurrency]);

  return (
    <div className="App">
      <h1>Crypto Converter</h1>
      <div className="wrapper">
        <input type="number" value={currency} onChange={handleInputChange} />
        <select
          onChange={handleCurrencyType}
          name="currency"
          value={selectCurrency}
        >
          {arr.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="curr-info">
        <div>{convertedCurrency}</div>
        <div>WUC</div>
        <div className={isUp ? "green" : "red"}>
          <span>{isUp ? "⬆" : "⬇"}</span>
          <span>{diff}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
