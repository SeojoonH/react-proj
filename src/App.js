import { useEffect, useState } from "react";

function Converter({ coin }) {
  const [usd, setUsd] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const onChange = (e) => {
    setUsd(e.target.value);
  };

  const reset = () => {
    setUsd(0);
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
          value={disabled ? usd * coin.quotes["USD"].price : usd}
          type="number"
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      <div>
        <label htmlFor="{coin.symbol}">{coin.symbol} </label>
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

function CoinConverter() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState("-1");
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const onSelect = (e) => {
    setIndex(e.target.value);
    if (e.target.value === "-1") {
      setSelected([]);
    } else {
      setSelected(coins[e.target.value]);
    }
  };
  return (
    <>
      <h1>코인 리스트 {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>로딩 중...</strong>
      ) : (
        <div>
          <select value={index} onChange={onSelect}>
            <option key="-1" value="-1">
              코인 선택
            </option>
            {coins.map((coin, idx) => (
              <option key={idx} value={idx}>
                {coin.name}
              </option>
            ))}
          </select>
          <hr />
          {index === "-1" ? (
            "코인 리스트에서 코인을 선택해 주세요."
          ) : (
            <Converter coin={selected} />
          )}
        </div>
      )}
    </>
  );
}

export default CoinConverter;
