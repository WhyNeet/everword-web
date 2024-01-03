import { type Flashcard as FlashcardType } from "@/lib/redux/features/flashcards/types";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "./ui/Input";
import { useRef, useState } from "react";
import { Text } from "./ui/Typography";

const contentVariants = {
  hidden: {
    scale: 1.5,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
  },
};

export const Flashcard = ({
  card: { word, defenitions },
  offset,
}: {
  card: FlashcardType;
  offset: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      style={{
        zIndex: 5 - offset,
      }}
      initial={{ scale: 0.9, y: 100, opacity: 0 }}
      animate={{
        scale: 1,
        y: -offset * 20,
        opacity: Math.max(0, 1 - offset * 0.25),
      }}
      exit={{ opacity: 0, scale: 1.2 }}
      className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-xl border border-black/10 backdrop-blur-xl transition-all ease-linear"
      onClick={() => setIsExpanded((prev) => !prev)}
    >
      {!isExpanded ? (
        <div
          // initial={{ opacity: 0, scale: 1.2 }}
          // animate={{ opacity: 1, scale: 1 }}
          // exit={{ opacity: 0, scale: 1.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {word}
        </div>
      ) : (
        <div
          // initial={{ opacity: 0, scale: 1.2 }}
          // animate={{ opacity: 1, scale: 1 }}
          // exit={{ opacity: 0, scale: 1.2 }}
          className="absolute inset-0 p-6 overflow-y-scroll scrollbar-none"
        >
          <Text.h3 className="mb-2">{word}</Text.h3>
          {defenitions ? (
            Object.keys(defenitions).length > 0 ? (
              Object.keys(defenitions).map((partOfSpeech) => (
                <div key={partOfSpeech}>
                  <Text.p variant="primary" className="font-bold">
                    {partOfSpeech}
                  </Text.p>
                  <ul className="list-disc">
                    {defenitions[partOfSpeech].map(({ examples, text }) => (
                      <li className="mb-2 ml-4">
                        <Text.p>{text}</Text.p>
                        <ol>
                          {examples.map((example) => (
                            <li className="ml-4 before:h-[1px] before:w-2 before:absolute before:-left-4 before:top-2.5 before:bg-black relative text-sm">
                              {example}
                            </li>
                          ))}
                        </ol>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <Text.p variant="tertiary">No defenitions.</Text.p>
            )
          ) : (
            <Text.p variant="tertiary">No defenitions fetched.</Text.p>
          )}
        </div>
      )}
    </motion.div>
  );
};
