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

### 1 reducer を作成

reducer は state（状態）と action（type, payload）を引数に取り、action に応じて、state を更新する。

`src/reducers/index.js`

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

### 2 useReducer で reducer を実行

[useReducer](https://ja.reactjs.org/docs/hooks-reference.html#usereducer)を 1 で作成した reducer と state の初期値（空配列）を指定・実行し、state と dispatch メソッド を取得する。

dispatch の引数に action を指定することで 1 で作成した reducer の処理を実行可能。たとえば、CREATE_EVENT を実行したいなら`dispatch({ type: 'CREATE_EVENT', title: title, body: body })`。

`src/components/App.jsx`

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

### （オプション）3 コンポーネント化

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

### 4 redux（combineReducers）の導入

複数の状態を reducer で管理したい場合、redux が提供する [combineReducers](https://redux.js.org/api/combinereducers) を利用すると便利。

1 で`src/reducers/index.js` は events の状態のみを管理する reducer として作成したが、events 以外の状態も管理するために index.js から events.js へリネーム。index.js を新規作成し root の reducer として利用する。

`src/reducers/index.js`

```js
import { combineReducers } from 'redux';
import events from './events';
export default combineReducers({ events });
```

（上記では状態は events だけの状態。これに他の状態を追加することで combineReducers の意味がでてくる。）

combineReducers はオブジェクトで状態を管理している（combineReducers({ events })）ため

useReducer に指定する初期状態もオブジェクトで指定する必要がある。

```js
const App = () => {
  const initialState = {
    events: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
```

（combineReducers 導入前=events.js のみを useReducer に指定していた時は `const [state, dispatch] = useReducer(reducer, []);`）

また、state の参照箇所も`state.events`でイベント配列を参照する必要がある（combineReducers 導入前は`state`で events 配列が見えていた）。

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

### TODO あとで読む 非同期処理

react-hooks-101/learn/lecture/15049644#questions/12553000

> > Redux-thunk 的な機能は特にないのでしょうか？？
>
> 「Redux-thunk 的な機能」についてどのような機能を想定されているのかにもよるとは思いますが、 非同期の処理等を含む複雑なロジックを関数にしてまるっとコンポーネントから引き剥がすというのを redux-thunk はやってくれているかと思いますが、 これと同じようなことをやろうと思った時には、一旦、必要な処理を関数コンポーネント内に実装して、 ある塊になったらそれを別の hook として外に出すということをやるというのがオーソドックスなやり方だと思います。これは一般にカスタムフックと呼ばれている手法です。  
> https://ja.reactjs.org/docs/hooks-custom.html

## React Context

### Provider, Consumer

[createContext](https://ja.reactjs.org/docs/context.html#reactcreatecontext) でコンテクストオブジェクト（Provider, Consumer などをメンバーに持つオブジェクト）を作成。

`src/context/AppContext.js`

```js
import { createContext } from 'react';
const AppContext = createContext();
export default AppContext;
```

コンテクストオブジェクトのメンバー Provider（[Context.Provider](https://ja.reactjs.org/docs/context.html#contextprovider)）には value プロパティを指定できる。

`src/components/App.jsx`

```jsx
import AppContext from '../context/AppContext';
import Events from './Events';

const App = () => {
  return (
    <AppContext.Provider value={'Hello, I am a Provider.'}>
      <div className='container-fluid'>
        <Events state={state} dispatch={dispatch} />
      </div>
    </AppContext.Provider>
  );
};

export default App;
```

`AppContext.Provider` の子コンポーネントは、[useContext](https://ja.reactjs.org/docs/hooks-reference.html#usecontext)を介して [Consumer](https://ja.reactjs.org/docs/context.html#contextconsumer) として Provider の value にアクセス可能。

```jsx
import { useContext } from 'react';

import AppContext from '../context/AppContext';

const Events = (props) => {
  const { state, dispatch } = props;
  const value = useContext(AppContext);

  // Hello, I am a Provider.をレンダー
  return (
    <>
      <div>{value}</div>
    </>
  );
};

export default Events;
```
