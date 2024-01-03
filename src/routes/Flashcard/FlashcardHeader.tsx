import { buttonVaraints } from "@/components/ui/Button";
import { Set } from "@/lib/redux/features/flashcards/sets/types";
import { Link } from "react-router-dom";

export const FlashcardHeader = ({
  set: { name },
  setId,
}: {
  set: Set;
  setId?: string;
}) => (
  <header className="fixed top-0 inset-x-0 p-4 backdrop-blur flex items-center gap-4">
    <Link
      to={setId ? `/flashcards/${setId}` : "/"}
      className={buttonVaraints({ variant: "secondary", size: "icon" })}
    >
      <span className="icon text-xl">arrow_back</span>
    </Link>
    <div className="font-semibold">{name}</div>
  </header>
);
