
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MultiStepForm from "./components/MultiStepForm";
import Posts from "./components/Post";
import { FormProvider } from "./context/FormContext";

const App = () => (
  <Router>
    <FormProvider>
      <Routes>
        <Route path="/" element={<MultiStepForm />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </FormProvider>
  </Router>
);

export default App;
