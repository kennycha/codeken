import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AuthProvider } from "./store/AuthContext";
import { GlobalStyle } from "./styles/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
