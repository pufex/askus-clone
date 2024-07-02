import { Routes, Route } from "react-router-dom"

import Layout from "./components/Layout"

import Welcome from "./page/Welcome/Welcome"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Profiles from "./page/Profiles/Profiles"
import Profile from "./page/Profile/Profile"
import AnswerQuestions from "./page/AnswerQuestions/AnswerQuestions"

import AuthProvider from "./contexts/Auth"

import MakePrivate from "./auth/Private"
import MakeClosed from "./auth/Closed"

const App = () => {
  return <AuthProvider>
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        
        <Route index element={<Welcome />} />

        <Route element={<MakeClosed />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="profiles" >
          <Route index element={<Profiles />}/>
          <Route path=":id" element={<Profile />}/>
          <Route  element={<MakePrivate />}>
            <Route path="answer/:id" element={<AnswerQuestions />}/>
          </Route>
        </Route>

      </Route>
    </Routes>
  </AuthProvider>
}

export default App
