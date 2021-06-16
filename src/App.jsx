import React, { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  const increment2 = () => setCount((previousCount) => previousCount + 1);
  const decrement2 = () => setCount((previousCount) => previousCount - 1);

  /* count表示を囲むdivタグにはid={Date.now()}を設定。setCountによりcountが更新されたとき再描画されていることを確認。
     3の倍数のときだけ3で割るで、3の倍数でないとき（setCount(count)のとき）はidが変わらないことを確認。 */
  return (
    <>
      <div id={Date.now()}>count: {count}</div>
      <div>
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
      </div>
      <div>
        <button onClick={increment2}>+1</button>
        <button onClick={decrement2}>-1</button>
      </div>
      <div>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
      <div>
        <button onClick={() => setCount(count * 2)}>*2</button>
        <button onClick={() => setCount(count / 2)}>/2</button>
      </div>
      <div>
        <button
          onClick={() =>
            count % 3 === 0 ? setCount(count / 3) : setCount(count)
          }
        >
          3の倍数のときだけ3で割る
        </button>
      </div>
    </>
  );
};

export default App;
