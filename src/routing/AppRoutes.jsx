import React from "react";
import { Route, Routes } from "react-router-dom";
import NewMember from "../pages/members/NewMember";

const AppRoutes = () => (
  <Routes>
    <Route path="/newmember" element={<NewMember />} />
  </Routes>
);

export default AppRoutes;
