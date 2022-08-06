/* eslint-disable */
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Main from "../pages/Main";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import AcceptTerms from "../pages/AcceptTerms";
import Mypage from "../pages/Mypage";
import urls from "../constants/urls";
import SignUpPart1 from "../pages/signUp/SignUpPart1";
import SignUpPart2 from "../pages/signUp/SignUpPart2";
import SignUpPart3 from "../pages/signUp/SignUpPart3";
import SignUpPart4 from "../pages/signUp/SignUpPart4";
import SignUpPart5 from "../pages/signUp/SignUpPart5";
import FindId2 from "../pages/findId/FindId2";
import FindId3 from "../pages/findId/FindId3";
import FindId4 from "../pages/findId/FindId4";
import FindId5 from "../pages/findId/FindId5";
import FindIdResult from "../pages/findId/FindIdResult";
import FindId1 from "../pages/findId/FindId1";
import Modal from "./Modal";
import { useAppSelector } from "../store/hook";
import { isLogin } from "../util/Auth";
// import Permit from "./Permit";

function AuthRoute() {
  const isUser = useAppSelector((state) => state.user);

  if (!isLogin() && !isUser) {
    return <Navigate to={urls.SignIn} replace />;
  }

  return <Outlet />;
}

function NoAuthRoute() {
  const isUser = useAppSelector((state) => state.user);

  if (isLogin() && isUser) {
    return <Navigate to={urls.Main} replace />;
  }

  return <Outlet />;
}

function App() {
  // useEffect(() => {}, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={urls.Main} element={<Main />} />

        <Route element={<AuthRoute />}>
          <Route path={urls.Mypage} element={<Mypage />} />
          <Route path={urls.Home} element={<Home />} />
        </Route>

        <Route element={<NoAuthRoute />}>
          <Route path={urls.Login} element={<Login />} />
          <Route path={urls.SignIn} element={<SignIn />} />
          <Route path={urls.AccepTerms} element={<AcceptTerms />} />
          <Route path={urls.SignUpPart1} element={<SignUpPart1 />} />
          <Route path={urls.SignUpPart2} element={<SignUpPart2 />} />
          <Route path={urls.SignUpPart3} element={<SignUpPart3 />} />
          <Route path={urls.SignUpPart4} element={<SignUpPart4 />} />
          <Route path={urls.SignUpPart5} element={<SignUpPart5 />} />
          <Route path={urls.FindId1} element={<FindId1 />} />
          <Route path={urls.FindId2} element={<FindId2 />} />
          <Route path={urls.FindId3} element={<FindId3 />} />
          <Route path={urls.FindId4} element={<FindId4 />} />
          <Route path={urls.FindId5} element={<FindId5 />} />
          <Route path={urls.FindIdResult} element={<FindIdResult />} />
        </Route>

        <Route path={urls.NotFound} element={<NotFound />} />
      </Routes>
      <Modal />
    </BrowserRouter>
  );
}

export default App;
