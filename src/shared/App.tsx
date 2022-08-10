import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthRoute, NoAuthRoute } from "../routes/RouterContainer";
import { CommonRouter, NoAuth, RequiredAuth } from "../routes/routers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {CommonRouter.map((router) => {
          return (
            <Route
              key={router.path}
              path={router.path}
              element={router.element}
            />
          );
        })}

        <Route element={<AuthRoute />}>
          {RequiredAuth.map((router) => {
            return (
              <Route
                key={router.path}
                path={router.path}
                element={router.element}
              />
            );
          })}
        </Route>

        <Route element={<NoAuthRoute />}>
          {NoAuth.map((router) => {
            return (
              <Route
                key={router.path}
                path={router.path}
                element={router.element}
              />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
