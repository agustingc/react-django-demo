/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSelector, clearState, fetchUserByToken } from "./UserSlice";
import { Wrapper, Header, Body } from "../../styles/RegisterPage";
import Loader from "react-loader-spinner";
import { Button } from "semantic-ui-react";

function Dashboard() {
  // router
  const history = useHistory();

  // redux
  const dispatch = useDispatch();

  const { isFetching, isError, username } = useSelector(userSelector);

  // lifecycle: mount
  useEffect(() => {
    dispatch(fetchUserByToken({ token: localStorage.getItem("token") }));
  }, []);

  // lifecycle: update
  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      history.push("/login");
    }
  }, [isError]);

  // handler: logout
  function handleLogout() {
    localStorage.removeItem("token");
    history.push("/login");
  }

  // render component
  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <Wrapper>
          <Header>
            <h1>Dashboard</h1>
          </Header>
          <Body>
            <div>Welcome back</div>
            <h1>{username}</h1>
            <Button onClick={handleLogout}>Log out</Button>
          </Body>
        </Wrapper>
      )}
    </>
  );
}

export default Dashboard;
