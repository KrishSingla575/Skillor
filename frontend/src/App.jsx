import Mainlayout from "./Mainlayout/mainlayout";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Mainlayout/>
    </AuthProvider>
  );
}

export default App;