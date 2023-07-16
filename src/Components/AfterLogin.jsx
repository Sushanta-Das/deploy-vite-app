import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  Router,
  Routes,
  RouterProvider,
  NavLink,
} from "react-router-dom";
import Register from "./Dashboard/Register";
import { Vote } from "./Dashboard/Vote";
import { Result } from "./Dashboard/Result";
import { Default } from "./Dashboard/default";
import { Link } from "react-router-dom";
import "./Dashboard/dashboard.css";

export const AfterLogin = (props) => {
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/" element={<Root />}>
  //       <Route index element={<Default />} />
  //       <Route
  //         path="/Auth"
  //         element={<Authorize authorize={props.authorize} />}
  //       />

  //       <Route
  //         path="/Vote"
  //         element={
  //           <Vote
  //             getCandidates={props.getCandidates}
  //             Candidates={props.Candidates}
  //             CanVote={props.CanVote}
  //             vote={props.vote}
  //             voted={props.voted}
  //           />
  //         }
  //       />
  //       <Route
  //         path="/getResult"
  //         element={<Result Candidates={props.Candidates} />}
  //       />
  //     </Route>
  //   )
  // );

  return (
    <div className="loginContainer">
      <h1>You have Connected to MetaMask</h1>
      {/* <button className='loginButton' onClick={props.connectAccount}></button> */}
      <div>Metamask Account: {props.account}</div>
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter basename={import.meta.env.DEV ? "/" : "/deploy-vite-app/"}>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Default />} />
            <Route
              path="/Auth"
              element={<Register authorize={props.authorize} />}
            />

            <Route
              path="/Vote"
              element={
                <Vote
                  getCandidates={props.getCandidates}
                  Candidates={props.Candidates}
                  CanVote={props.CanVote}
                  vote={props.vote}
                  voted={props.voted}
                  aadhar={props.aadhar}
                />
              }
            />
            <Route
              path="/getResult"
              element={<Result Candidates={props.Candidates} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
const Root = () => {
  return (
    <>
      <div className="container">
        <div className="sidepanel">
          <div className="options">
            <NavLink to="/Auth">Authorize</NavLink>
          </div>
          <div className="options">
            <NavLink to="/Vote">Vote</NavLink>
          </div>
          <div className="options">
            <NavLink to="/getResult">Result</NavLink>
          </div>
        </div>
        <div id="rightSide">
          <Outlet />
        </div>
      </div>
    </>
  );
};
