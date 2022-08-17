import {
  NavigateOptions,
  To,
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    push: navigate,
    goBack: () => navigate(-1),
    replace: (to: To, options?: NavigateOptions) =>
      navigate(to, { replace: true, ...options }),
    pathname: location.pathname,
    state: location.state,
    location,
  };
}
