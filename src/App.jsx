import { Route, Routes, Navigate } from "react-router-dom";
import {Clients} from "./views/Clients";
import {Product} from "./views/Product";
import 'bootstrap/dist/css/bootstrap.css';
import {Login} from "./views/Login";
import {Register} from "./views/Register";
import RouteGuard from "./components/Route/RouteGuard";
import RoutePublic from "./components/Route/RoutePublic";

function App() {
  return (
    <div className="App">
      {/*<ErrorMessage/>*/}
      <Routes>
        <Route path="*" element={<Navigate to="/client" />} />
        <Route path="/client" element={<RouteGuard><Clients/></RouteGuard>}/>
        <Route path="/product" element={<RouteGuard><Product/></RouteGuard>}/>
        <Route path="/sign-in" element={<RoutePublic><Login/></RoutePublic>}/>
        <Route path="/sign-up" element={<RoutePublic><Register/></RoutePublic>}/>
      </Routes>
    </div>
  );
}

export default App
