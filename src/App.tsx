import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "@/routes/Homepage";
import Onboarding from "@/routes/Onboarding";
import FlashcardDetails from "@/routes/Flashcard/FlashcardDetails";
import FlashcardEditor from "@/routes/Flashcard/FlashcardEditor";
import FlashcardView from "./routes/Flashcard/FlashcardView";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "",
        Component: Homepage,
      },
      {
        path: "/flashcards/:setId",
        Component: FlashcardDetails,
      },
      {
        path: "/flashcards/:setId/edit",
        Component: FlashcardEditor,
      },
      {
        path: "/flashcards/:setId/view",
        Component: FlashcardView,
      },
    ],
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
