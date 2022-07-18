import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterUser, FrontPage, ErrorPage, ProtectedRoute } from "./pages";
import {
  AllJob,
  AddJob,
  Profile,
  Stats,
  SharedLayout,
  SchedulerComponent,
} from "./pages/dashboard";

//setting up the routes for different pages in the application

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="all-jobs" element={<AllJob />} />
          <Route index element={<Stats />} />
          <Route path="scheduler" element={<SchedulerComponent />} />
        </Route>
        <Route path="/RegisterUser" element={<RegisterUser></RegisterUser>} />
        <Route path="/FrontPage" element={<FrontPage></FrontPage>} />
        <Route path="*" element={<ErrorPage></ErrorPage>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
