import { Button, buttonVaraints } from "@/components/ui/Button";
import { Text } from "@/components/ui/Typography";
import { useSet } from "@/lib/redux/features/flashcards/sets/setsSlice";
import { Link, useParams } from "react-router-dom";
import { FlashcardHeader } from "../FlashcardHeader";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { useDispatch } from "react-redux";
import { edit as editSet } from "@/lib/redux/features/flashcards/sets/setsSlice";

export default function FlashcardDetails() {
  const { setId } = useParams();
  const set = useSet(setId!);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(set.name);
  const [description, setDescription] = useState(set.description);

  useEffect(() => {
    if (isEditing) return;
    if (!name.length) return;

    dispatch(
      editSet({
        setId: setId!,
        name,
        description,
      })
    );
  }, [isEditing]);

  return (
    <div className="h-screen w-screen p-4 bg-neutral-100">
      <FlashcardHeader set={set} />
      <div className="w-full h-72 mt-14 border border-black/10 rounded-xl flex items-center justify-center mb-4">
        {!set.flashcards.length ? (
          <Text.p variant="tertiary">No flashcards created here. Yet.</Text.p>
        ) : (
          <div className="flex flex-wrap gap-2 h-full w-full p-6">
            {set.flashcards.map(({ word }, idx) => (
              <Link
                to={`view?start=${idx}`}
                key={idx}
                className="px-4 py-2 rounded-xl bg-white border border-black/10 h-fit"
              >
                {word}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="relative flex flex-col pr-12">
        {!isEditing ? (
          <>
            <Text.h2>{set.name}</Text.h2>
            <Text.p>
              {set.description.length ? set.description : "No description."}
            </Text.p>
          </>
        ) : (
          <>
            <Input
              className="mb-2"
              placeholder="Name..."
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <Input
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              placeholder="Description..."
            />
          </>
        )}
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          variant="ghost"
          size="icon"
          className="absolute top-0 right-0"
        >
          <span className="icon">{isEditing ? "check" : "edit"}</span>
        </Button>
      </div>
      <div className="flex gap-2 fixed bottom-0 inset-x-0 p-4 border-t border-t-black/10 rounded-xl">
        <Link to="view" className={buttonVaraints({ className: "w-full" })}>
          View
        </Link>
        <Link to="edit" className={buttonVaraints({ variant: "secondary" })}>
          <span className="icon scale-125">edit</span>
        </Link>
      </div>
    </div>
  );
}
