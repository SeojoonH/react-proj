import { useState, useEffect } from "react";

function Converter({ coin }) {
  const [usd, setUsd] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const onChange = (e) => {
    setUSD(e.target.value);
  };

  const reset = () => {
    setUSD(0);
  };

  const onClick = () => {
    reset();
    setDisabled((current) => !current);
  };

  return (
    <>
      <div>
        <label htmlFor="USD">USD </label>
        <input
          id="USD"
          value={disabled ? use * coin.quotes["USD"].price : usd}
          type="number"
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      <div>
        <label htmlFor="{coin.symbol}">{coin.symbol}</label>
        <input
          id={coin.symbol}
          value={disabled ? usd : usd / coin.quote["USD"].price}
          type="number"
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      <button onClick={onClick}>변환</button>
    </>
  );
}
