import "fontsource-roboto";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MiniDrawer from "./components/MiniDrawer";
import GlobalSnackBar from "./components/SnackBar";
import { LoginComponent } from "./LoginComponent";
import store from "./redux/store";
function App() {
  const [token, setToken] = React.useState<any>(
    sessionStorage.getItem("token") ? sessionStorage.getItem("token") : ""
  );

  const login = () => {};
  const logout = () => {};
  return (
    <Provider store={store}>
      <BrowserRouter>
        {token === "" ? (
          <LoginComponent></LoginComponent>
        ) : (
          <>
            <MiniDrawer></MiniDrawer>
            <GlobalSnackBar></GlobalSnackBar>
          </>
        )}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
