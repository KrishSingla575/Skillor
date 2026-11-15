import Mainlayout from "./Mainlayout/mainlayout";
import { AuthProvider } from "./context/AuthContext";
import { RouterProvider } from "./router/Router";

function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <Mainlayout />
      </AuthProvider>
    </RouterProvider>
  );
}

export default App;
