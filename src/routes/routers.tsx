import urls from "../constants/urls";
import AcceptTerms from "../pages/AcceptTerms";
import AcceptTermsDetail from "../pages/AcceptTermsDetail";
import FindId1 from "../pages/findId/FindId1";
import FindId2 from "../pages/findId/FindId2";
import FindId3 from "../pages/findId/FindId3";
import FindId4 from "../pages/findId/FindId4";
import FindId5 from "../pages/findId/FindId5";
import FindIdResult from "../pages/findId/FindIdResult";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Mypage from "../pages/Mypage";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import SignUpPart1 from "../pages/signUp/SignUpPart1";
import SignUpPart2 from "../pages/signUp/SignUpPart2";
import SignUpPart3 from "../pages/signUp/SignUpPart3";
import SignUpPart4 from "../pages/signUp/SignUpPart4";
import SignUpPart5 from "../pages/signUp/SignUpPart5";

export const CommonRouter = [
  {
    path: urls.Main,
    element: <Main />,
  },
  {
    path: urls.NotFound,
    element: <NotFound />,
  },
];

export const RequiredAuth = [
  {
    path: urls.Mypage,
    element: <Mypage />,
  },
  {
    path: urls.Home,
    element: <Home />,
  },
];

export const NoAuth = [
  {
    path: urls.Login,
    element: <Login />,
  },
  {
    path: urls.SignIn,
    element: <SignIn />,
  },
  {
    path: urls.AcceptTerms,
    element: <AcceptTerms />,
  },
  {
    path: urls.AcceptTermsDetail,
    element: <AcceptTermsDetail />,
  },
  {
    path: urls.SignUpPart1,
    element: <SignUpPart1 />,
  },
  {
    path: urls.SignUpPart2,
    element: <SignUpPart2 />,
  },
  {
    path: urls.SignUpPart3,
    element: <SignUpPart3 />,
  },
  {
    path: urls.SignUpPart4,
    element: <SignUpPart4 />,
  },
  {
    path: urls.SignUpPart5,
    element: <SignUpPart5 />,
  },
  {
    path: urls.FindId1,
    element: <FindId1 />,
  },
  {
    path: urls.FindId2,
    element: <FindId2 />,
  },
  {
    path: urls.FindId3,
    element: <FindId3 />,
  },
  {
    path: urls.FindId4,
    element: <FindId4 />,
  },
  {
    path: urls.FindId5,
    element: <FindId5 />,
  },
  {
    path: urls.FindIdResult,
    element: <FindIdResult />,
  },
];
