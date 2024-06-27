import {
  createBrowserRouter,
  Navigate,
  Route,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import Register from "./components/Register";
import SellerHome from "./components/SellerHome";
import CustomerHome from "./components/CustomerHome";
import { useSelector } from "react-redux";




function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

//console.log("isLoggedIn",isLoggedIn);

  return (

    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
    <Route path='/register' element={<Register/>} />
    {isLoggedIn ? (
          <>
               <Route path="/customerHome" element={<CustomerHome/>} />
               <Route path="/sellerHome" element={<SellerHome/>} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
  </Routes>

    )

    const PrivateRoute = ({ children, isLoggedIn, userType, ...rest }) => {
      return (
        <Route
          {...rest}
          render={({ location }) =>
            isLoggedIn ? (
              // Check userType if needed (optional)
              children
            ) : (
              <Navigate
                to={{
                  pathname: '/register',
                  state: { from: location }
                }}
              />
            )
          }
        />
      );
    };
  
}

export default App;
