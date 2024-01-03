import { Flashcard } from "@/components/Flashcard";
import { Button } from "@/components/ui/Button";
import { useSet } from "@/lib/redux/features/flashcards/sets/setsSlice";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Text } from "@/components/ui/Typography";
import { FlashcardHeader } from "../FlashcardHeader";

export default function FlashcardView() {
  const { setId } = useParams();
  const set = useSet(setId!);

  const [currentIdx, setCurrentIdx] = useState(
    Number(new URL(window.location.href).searchParams.get("start") ?? 0)
  );

  return (
    <div className="h-screen w-screen p-4 bg-neutral-100 overflow-hidden">
      <FlashcardHeader set={set} setId={setId!} />
      <div className="h-full w-full flex items-center justify-center flex-col">
        <div className="w-5/6 h-1/2 rounded-xl flex items-center justify-center mb-2 relative">
          {!set.flashcards.length ? (
            <Text.p>No flashcards created here. Yet.</Text.p>
          ) : (
            <AnimatePresence>
              {set.flashcards.slice(currentIdx, 5).map((card, idx) => (
                <Flashcard key={card.word} card={card} offset={idx} />
              ))}
            </AnimatePresence>
          )}
        </div>
        <div className="flex items-center justify-center gap-2 w-5/6">
          <div className="flex items-center gap-4">
            {set.flashcards.length ? (
              <>
                <Button
                  disabled={currentIdx === 0}
                  size="icon"
                  variant="secondary"
                  onClick={() => setCurrentIdx((prev) => prev - 1)}
                >
                  <span className="icon">arrow_back</span>
                </Button>
                <span>
                  {currentIdx + 1} of {set.flashcards.length}
                </span>
                <Button
                  disabled={currentIdx === set.flashcards.length - 1}
                  size="icon"
                  variant="secondary"
                  onClick={() => setCurrentIdx((prev) => prev + 1)}
                >
                  <span className="icon">arrow_forward</span>
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
