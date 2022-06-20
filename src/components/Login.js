// import css from 'Login.module.css';
import AuthContext from './../store/authContext';
import { useContext, useRef } from 'react';

const initValues = {
  username: '',
  password: '',
};

function Login() {
  // TODO: Login abu inputus valdom su vienu useReducer state

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
      <form onSubmit={handleLogin}>
        <input ref={userNameRef} type='text' placeholder='username' />
        <input type='password' placeholder='password' />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}
export default Login;
