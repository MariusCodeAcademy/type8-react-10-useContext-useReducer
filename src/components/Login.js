// import css from 'Login.module.css';
import AuthContext from './../store/authContext';
import { useContext, useRef, useReducer } from 'react';

const initValues = {
  username: '',
  password: '',
  usernameErr: '',
  passwordErr: '',
};

function loginReducerFn(state, action) {
  switch (action.type) {
    case 'password':
      if (state.username.length === 0) {
        return { ...state, password: action.payload, usernameErr: 'Privalomas laukas' };
      }
      return { ...state, password: action.payload };
    case 'username':
      return { ...state, username: action.payload, usernameErr: '' };
    default:
      throw new Error('Invalid action type: ' + action.type);
  }
}

function Login() {
  // TODO: Login abu inputus valdom su vienu useReducer state
  const [state, dispatch] = useReducer(loginReducerFn, initValues);

  const ctx = useContext(AuthContext);

  const userNameRef = useRef();

  function handleLogin(e) {
    e.preventDefault();
    console.log('react is in control');
    const name = userNameRef.current.value;
    // console.log('name ===', name);
    ctx.login(name);
  }

  if (ctx.isLoggedIn) return <h2>Prisiloginai Sveikinmai</h2>;

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin} autoComplete={'off'}>
        <input
          onChange={(e) => dispatch({ type: 'username', payload: e.target.value })}
          value={state.username}
          ref={userNameRef}
          type='text'
          placeholder='username'
        />
        {state.usernameErr && <p className='error'>{state.usernameErr}</p>}
        <input
          onChange={(e) => dispatch({ type: 'password', payload: e.target.value })}
          value={state.password}
          type='password'
          placeholder='password'
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}
export default Login;
