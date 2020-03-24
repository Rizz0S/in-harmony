import React, { useState } from 'react';

const Form = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleSubmit({username: username, password: password})
  }

  const handleChange = (e) => {
    let {name, value} = e.target
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  return (
      <form className="login-register-form" onSubmit={handleSubmit}>
        <h1>{props.formName === "login" ? "Hello again." : "Welcome."}</h1>
        <label htmlFor="username">Username:
        <input type="text" autoComplete="off" name="username" value={username} onChange={handleChange}/>
        </label>
        <label htmlFor="password">Password:
        <input type="password" autoComplete="off" name="password" value={password} onChange={handleChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    );

}

export default Form;