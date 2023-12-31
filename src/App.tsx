import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./routes/Homepage";
import Onboarding from "./routes/Onboarding";

const router = createBrowserRouter([
  {
    path: "",
    Component: Homepage,
  },
  {
    path: "/get-started",
    Component: Onboarding,
  },
]);

function App() {
  return (
    <main className="h-screen w-screen">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
