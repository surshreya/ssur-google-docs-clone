import React from "react";
import Editor from "./components/Editor";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { v4 as uuid } from "uuid";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate replace to={`/docs/${uuid()}`} />}
          />
          <Route path={`/docs/:id`} element={<Editor />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default App;
