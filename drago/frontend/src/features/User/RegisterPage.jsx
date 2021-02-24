/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, userSelector, clearState } from "./UserSlice";
import { Link, useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { Button, Form } from "semantic-ui-react";

import { Body, Wrapper, Header } from "../../styles/RegisterPage";

/* component */
function RegisterPage() {
  // local state for form control & validation
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});

  // redux (global state) for login validation
  const dispatch = useDispatch();
  const { isSuccess, isError, errorMessage } = useSelector(userSelector);

  // router
  const history = useHistory();

  // lifecycle: on initial mount
  useEffect(() => {
    // cleanup
    return () => {
      dispatch(clearState());
    };
  }, []);

  // lifecycle: update
  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      history.push("/");
    }

    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  // helper function for submitting form data
  function handleSubmit(event) {
    event.preventDefault();

    if (validate()) {
      dispatch(signupUser(user));
    } else {
      // form errors: needs rework
      for (const e in errors) {
        toast.error(e);
      }
    }
  }

  // helper function for updating local state
  function handleChange(event) {
    const { name, value } = event.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  // helper function to validate form

  function validate() {
    let input = user;
    let err = {};
    let isValid = true;

    if (!input["username"] || input["username"] === "") {
      isValid = false;
      err["username"] = "Please enter your username.";
    }

    if (!input["email"] || input["username"] === "") {
      isValid = false;
      errors["email"] = "Please enter your email Address.";
    }

    if (typeof input["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }

    if (!input["password"]) {
      isValid = false;
      err["password"] = "Please enter your password.";
    }

    if (!input["confirm_password"]) {
      isValid = false;
      err["confirm_password"] = "Please enter your confirm password.";
    }

    if (
      typeof input["password"] !== "undefined" &&
      typeof input["confirm_password"] !== "undefined"
    ) {
      if (input["password"] !== input["confirm_password"]) {
        isValid = false;
        err["password"] = "Passwords don't match.";
      }
    }

    // update state
    setErrors(err);

    //return
    return isValid;
  }

  // render
  return (
    <>
      <Wrapper>
        {/* Header */}
        <Header>
          <h1>Create Account</h1>
        </Header>

        {/* Body */}
        <Body>
          <h2>Get started with your free account</h2>
          <p>Fill in the registration formto create your account.</p>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Enter Username</label>
              <input
                type="text"
                name="username" // form data
                onChange={handleChange} // update state
                value={user.username} // controlled component
              />
            </Form.Field>
            <Form.Field>
              <label>Enter Email</label>
              <input
                type="email"
                name="email" // form data
                onChange={handleChange} // update state
                value={user.email} // controlled component
              />
            </Form.Field>

            <Form.Field>
              <label>Create Password</label>
              <input
                type="password"
                name="password" // form data
                onChange={handleChange} // update state
                value={user.password} // controlled component
              />
            </Form.Field>

            <Form.Field>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirm_password" // form data
                onChange={handleChange} // update state
                value={user.confirm_password} // controlled component
              />
            </Form.Field>
            <Button
              type="submit" // submit action
            >
              Submit
            </Button>
          </Form>
          <Toaster />
          <div>
            <p>Already have an account? </p>
            <Link to="login">Login</Link>
          </div>
        </Body>
      </Wrapper>
    </>
  );
}

/* export */
export default RegisterPage;
