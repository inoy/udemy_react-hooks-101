# [Udemy - React Hooks 入門 - Hooks と Redux を組み合わせて最新のフロントエンド状態管理手法を習得](https://www.udemy.com/course/react-hooks-101/)

## useState

### 複数の状態を 1 つのオブジェクトで管理

2 つの state `name, price` があるとき。

```jsx
const App = (props) => {
  const [name, setName] = useState(props.name);
  const [price, setPrice] = useState(props.price);

  const reset = () => {
    setName(props.name);
    setPrice(props.price);
  };

  return (
    <>
      <p>
        現在の{name}は、{price}円です。
      </p>
      <button onClick={() => setPrice(price + 1)}>+1</button>
      <button onClick={() => setPrice(price - 1)}>-1</button>
      <button onClick={reset}>Reset</button>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </>
  );
```

useState にオブジェクトを指定することで `name, price` 2 つの状態を 1 つの state で扱うことができる。

```jsx
const App = (props) => {
  const [state, setState] = useState(props);

  const { name, price } = state;
  return (
    <>
      <p>
        現在の{name}は、{price}円です。
      </p>
      <button onClick={() => setState({ ...state, price: price + 1 })}>
        +1
      </button>
      <button onClick={() => setState({ ...state, price: price - 1 })}>
        -1
      </button>
      <button onClick={() => setState(props)}>Reset</button>
      <input
        value={name}
        onChange={(e) => setState({ ...state, name: e.target.value })}
      />
    </>
  );
};
```

## useEffect

### componentDidMount、componentDidUpdate っぽいタイミング

初回レンダー または 再レンダー 時

```jsx
useEffect(() => {
  console.log('This is like componentDidMount or componentDidUpdate.');
});
```

### componentDidMount なタイミング

初回レンダー時

```jsx
useEffect(() => {
  console.log('This is like componentDidMount.');
}, []);
```

### 特定の状態（ステータス）変更時

状態 name の変更時

```jsx
useEffect(() => {
  console.log('This callback is for name only.');
}, [name]);
```

## [useReducer](https://ja.reactjs.org/docs/hooks-reference.html#usereducer)

### TODO あとで読む

learn/lecture/15158680#questions/8280808

> そこで登場するのがカスタムフックです。
> https://reactjs.org/docs/hooks-custom.html

> 1. 外部からデータを取得する処理をコンポーネント内部に実装した例 issues/8280808/before というブランチをご確認ください。
> 2. 1 で実装した処理をカスタムフックに分離し、そのカスタムフックを利用した例 issues/8280808/after というブランチをご確認ください。
