import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import LoadingPage from "./pages/Loading/LoadingPage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return loading ? <LoadingPage /> : <AppRoutes />;
}

export default App;