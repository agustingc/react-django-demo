/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearState, userSelector } from "./UserSlice";
import { Button, Form } from "semantic-ui-react";
import { Wrapper, Header, Body } from "../../styles/RegisterPage";
import ErrorMessage from "./ErrorMessage";

/* component */
function LoginPage() {
  // access redux dispatch
  const dispatch = useDispatch();

  // access redux global state
  const { isSuccess, isError } = useSelector(userSelector);

  //router
  const history = useHistory();

  // local state for form validation
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // handler: form change
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  }

  // handler: form submit
  function handleSubmit(event) {
    event.preventDefault();

    if (validate()) {
      //   dispatch(loginUser(formData));
    }
  }

  // lifecycle : initial mount
  useEffect(() => {
    // cleanup
    return () => {
      dispatch(clearState);
    };
  }, []);

  // lifecycle: update
  useEffect(() => {
    if (isError) {
      // toast
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      history.push("/");
    }
  }, [isError, isSuccess]);

  // form validation
  function validate() {
    const input = formData;
    let err = {};
    let isValid = true;

    if (!input["username"] || input["username"] === "") {
      isValid = false;
      err["username"] = "Please enter your username";
    }

    if (!input["password"]) {
      isValid = false;
      err["password"] = "Please enter your password";
    }

    setErrors(err); // update state

    return isValid; // return value
  }

  // render
  return (
    <>
      <Wrapper>
        {/* Header */}
        <Header>
          <h1>Account Login</h1>
        </Header>

        {/* Body */}
        <Body>
          <h2>Welcome back!</h2>
          <p>Enter your credentials to log into your account.</p>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Enter Username</label>
              <input
                type="text"
                name="username" // form data
                onChange={handleChange} // update state
                value={formData.username} // controlled component
              />
              {errors.username && errors.username}
            </Form.Field>

            <Form.Field>
              <label>Enter Password</label>
              <input
                type="password"
                name="password" // form data
                onChange={handleChange} // update state
                value={formData.password} // controlled component
              />
              {errors.password && errors.password}
            </Form.Field>

            <Button
              type="submit" // submit action
            >
              Log in
            </Button>
          </Form>
          <div>
            <p>Don't have an account? </p>
            <Link to="signup">Sign up</Link>
          </div>
          <ErrorMessage />
        </Body>
      </Wrapper>
    </>
  );
}

export default LoginPage;
