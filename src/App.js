import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { DeviceProvider } from "./contexts/DeviceContext";
import ClubHome from "./pages/Homes/ClubHome";
import NewMember from "./pages/members/NewMember";
import ListMember from "./pages/members/ListMember";
import NewCoach from "./pages/coaches/NewCoach";
import ListCoach from "./pages/coaches/ListCoach";
import ViewMember from "./pages/members/ViewMember";
import ListClasses from "./pages/classes/ListClasses";

const App = () => {
  sessionStorage.setItem("userGroup", "admin");
  return (
    <DeviceProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ClubHome />} />
          <Route
            path="/club-members/new-member"
            element={<ClubHome children={<NewMember />} />}
          />
          <Route
            path="/club-members/list-member"
            element={<ClubHome children={<ListMember />} />}
          />
          <Route
            path="/club-members/view-member"
            element={<ClubHome children={<ViewMember />} />}
          />
          <Route
            path="/club-coaches/new-coach"
            element={<ClubHome children={<NewCoach />} />}
          />
          <Route
            path="/club-coaches/list-coach"
            element={<ClubHome children={<ListCoach />} />}
          />
          <Route
            path="/club-classes/list-classes"
            element={<ClubHome children={<ListClasses />} />}
          />
        </Routes>
      </Router>
    </DeviceProvider>
  );
};

export default App;
