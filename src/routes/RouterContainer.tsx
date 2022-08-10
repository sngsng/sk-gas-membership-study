import { Navigate, Outlet } from "react-router-dom";
import urls from "../constants/urls";
import { useAppSelector } from "../store/hook";
import { isLogin } from "../util/Auth";

// 토큰이 있을때만 접근 가능한 router
export function AuthRoute() {
  const isUser = useAppSelector((state) => state.user);

  if (!isLogin() && !isUser.isLogin) {
    return <Navigate to={urls.SignIn} replace />;
  }
  return <Outlet />;
}

// 토큰이 없을때 접근가능한 router
export function NoAuthRoute() {
  const isUser = useAppSelector((state) => state.user);

  if (isLogin() && isUser.isLogin) {
    return <Navigate to={urls.Main} replace />;
  }
  return <Outlet />;
}
