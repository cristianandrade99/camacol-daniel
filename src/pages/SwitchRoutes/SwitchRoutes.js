import { Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense } from "react";

const SwitchRoutes = ({ routes, redirect }) => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        {routes.map(({ path, Component }) => {
          return <Route key={path} path={path} element={<Component />} />;
        })}
        <Route path="*" element={<Navigate replace to={redirect} />} />
      </Routes>{" "}
    </Suspense>
  );
};

export default SwitchRoutes;
