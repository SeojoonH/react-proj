// import { useEffect, useState } from "react";

// function Converter({ coin }) {
//   const [usd, setUSD] = useState(0);
//   const [disabled, setDisabled] = useState(true);

//   const onChange = (e) => {
//     setUSD(e.target.value);
//   };

//   const reset = () => {
//     setUSD(0);
//   };

//   const onClick = () => {
//     reset();
//     setDisabled((current) => !current);
//   };

//   return (
//     <>
//       <div>
//         <label htmlFor="USD">USD </label>
//         <input
//           id="USD"
//           value={disabled ? usd * coin.quotes.USD.price : usd}
//           type="number"
//           onChange={onChange}
//           disabled={disabled}
//         />
//       </div>
//       <div>
//         <label htmlFor="{coin.symbol}">{coin.symbol} </label>
//         <input
//           id={coin.symbol}
//           value={disabled ? usd : usd / coin.quote.USD.price}
//           type="number"
//           onChange={onChange}
//           disabled={disabled}
//         />
//       </div>
//       <button onClick={onClick}>변환</button>
//     </>
//   );
// }

// function CoinConverter() {
//   const [coins, setCoins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [index, setIndex] = useState("-1");
//   const [selected, setSelected] = useState([]);
//   useEffect(() => {
//     fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
//       .then((response) => response.json())
//       .then((json) => {
//         setCoins(json);
//         setLoading(false);
//       });
//   }, []);

//   const onSelect = (e) => {
//     setIndex(e.target.value);
//     if (e.target.value === "-1") {
//       setSelected([]);
//     } else {
//       setSelected(coins[e.target.value]);
//     }
//   };
//   return (
//     <>
//       <h1>코인 리스트 {loading ? "" : `(${coins.length})`}</h1>
//       {loading ? (
//         <strong>로딩 중...</strong>
//       ) : (
//         <div>
//           <select value={index} onChange={onSelect}>
//             <option key="-1" value="-1">
//               코인 선택
//             </option>
//             {coins.map((coin, idx) => (
//               <option key={idx} value={idx}>
//                 {coin.name}
//               </option>
//             ))}
//           </select>
//           <hr />
//           {index === "-1" ? (
//             "코인 리스트에서 코인을 선택해 주세요."
//           ) : (
//             <Converter coin={selected} />
//           )}
//         </div>
//       )}
//     </>
//   );
// }

// export default CoinConverter;

import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [cost, setCost] = useState("1");
  const [need, setNeed] = useState(0);
  const onChange = (e) => {
    setCost(e.target.value);
    setNeed(1);
  };
  const handleInput = (e) => {
    setNeed(e.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>코인{loading ? "" : ` 총 갯수 : ${coins.length}개`}</h1>
      {loading ? (
        <strong>로딩 중...</strong>
      ) : (
        <select onChange={onChange}>
          <option>원하는 코인을 선택하세요!</option>
          {coins.map((coin, index) => (
            <option
              key={index}
              value={coin.quotes.USD.price}
              id={coin.symbol}
              symbol={coin.symbol}
            >
              {coin.name}({coin.symbol}) : ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <h2>달러 당 코인 갯수를 알려 드립니다.</h2>
      <div>
        <input
          type="number"
          value={need}
          onChange={handleInput}
          placeholder="dollor"
        />
        $
      </div>
      <h2>{`해당 금액으로 교환 가능한 코인 수는 ${need / cost}개 입니다.`}</h2>
    </div>
  );
}
export default App;
