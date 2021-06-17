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

### 1 `src/reducers/index.js`

```jsx
const newId = (state) => {
  // 省略
};

const events = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_EVENT':
      const event = { title: action.title, body: action.body };
      return [...state, { ...event, id: newId(state) }];
      return [];
    default:
      return state;
  }
};

export default events;
```

### 2 `src/components/App.jsx`

```jsx
import React, { useState, useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import reducer from '../reducers';

const App = (props) => {
  const [event, setEvent] = useState(props);
  const { title, body } = event;
  const [state, dispatch] = useReducer(reducer, []);

  const addEvent = (e) => {
    e.preventDefault();
    dispatch({ type: 'CREATE_EVENT', title: title, body: body });

    console.log(state);

    setEvent(props);
  };

  console.log(state);

  return (
    <div className='container-fluid'>
      <h4>イベント作成フォーム</h4>
      <form>
        <div className='form-group'>
          <label htmlFor='formEventTitle'>タイトル</label>
          <input
            className='form-control'
            id='formEventTitle'
            value={title}
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='formEventBody'>ボディー</label>
          <textarea
            className='form-control'
            id='formEventBody'
            value={body}
            onChange={(e) => setEvent({ ...event, body: e.target.value })}
          />
        </div>

        <button className='btn btn-primary' onClick={addEvent}>
          イベントを作成する
        </button>
      </form>
    </div>
  );
};

App.defaultProps = {
  title: '',
  body: '',
};

export default App;
```

### 3 コンポーネント化

dispatch を利用する処理をコンポーネント化した場合、親（dispatch 生成コンポ）から子コンポ props として dispatch を渡す。

`App.jsx` Event コンポーネントを呼び出す。Event コンポーネントの props に useReducer で生成した dispatch を渡す。

```jsx
import React, { useState, useReducer } from 'react';
const App = (props) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <div className='container-fluid'>
      <h4>イベント一覧</h4>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>ID</th>
            <th>タイトル</th>
            <th>ボディー</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.map((event) => (
            <Event key={event.id} event={event} dispatch={dispatch} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

`Event.jsx` props として親（App）から受け取った dispatch を利用する。

```jsx
const Event = ({ event, dispatch }) => {
  const id = event.id;
  const handleClickDeleteButton = (e) => {
    dispatch({ type: 'DELETE_EVENT', id });
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{event.title}</td>
      <td>{event.body}</td>
      <td>
        <button className='btn btn-danger' onClick={handleClickDeleteButton}>
          削除
        </button>
      </td>
    </tr>
  );
};
```

### TODO あとで読む

learn/lecture/15158680#questions/8280808

> そこで登場するのがカスタムフックです。
> https://reactjs.org/docs/hooks-custom.html

> 1. 外部からデータを取得する処理をコンポーネント内部に実装した例 issues/8280808/before というブランチをご確認ください。
> 2. 1 で実装した処理をカスタムフックに分離し、そのカスタムフックを利用した例 issues/8280808/after というブランチをご確認ください。

## Redux

### React Hooks vs Redux

course/react-hooks-101/learn/lecture/15049610#questions/12741241

### TODO Redux Toolkit がなにか調べる

Redux 採用するなら一緒に採用すると楽になるらしい？  
まったくなにか分からないから一から調べる。

### TODO あとで読む Redux の examples

単に参考になることあるかなーくらい。  
https://github.com/reduxjs/redux/tree/master/examples

## React Context

[createcontext](https://ja.reactjs.org/docs/context.html#reactcreatecontext)
