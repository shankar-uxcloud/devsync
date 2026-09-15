import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import LoadingPage from "./pages/Loading/LoadingPage";

function App() {
  const [loading, setLoading] = useState(true);

  return loading ? (
    <LoadingPage onComplete={() => setLoading(false)} />
  ) : (
    <AppRoutes />
  );
}

export default App;