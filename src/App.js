import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { ModalProvider } from "./context/ModalContext";
import { MusicProvider } from "./context/MusicContext";
import Layout from "./components/Shared/Layout";
import routes from "./routes/routes";

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ModalProvider>
          <MusicProvider>
            <Router>
              <Layout>
                <Routes>
                  {routes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={<route.component />}
                    />
                  ))}
                  <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                  />
                </Routes>
              </Layout>
            </Router>
          </MusicProvider>
        </ModalProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
