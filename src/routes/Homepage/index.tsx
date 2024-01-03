import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { CreateSetDialog } from "./CreateSetDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  create as createSet,
  select as selectSets,
} from "@/lib/redux/features/flashcards/sets/setsSlice";

export default function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sets } = useSelector(selectSets);

  return (
    <div className="h-screen w-screen overflow-x-hidden bg-neutral-100">
      <Header />
      <div className="px-8 pt-24 pb-2">
        <Text.h2 className="mb-3">Flashcards</Text.h2>
        {/* <div className="flex mb-4">
          <div className="flex gap-2 flex-wrap">
            {["Recent words", "Physics", "Biology", "Maths"].map((tag) => (
              <button
                key={tag}
                className="px-4 py-1 rounded-full border-2 border-black/20 text-sm text-black min-w-fit"
              >
                {tag}
              </button>
            ))}
          </div>
          <Button variant="secondary" size="icon">
            <span className="icon scale-125">expand_more</span>
          </Button>
        </div> */}
      </div>
      <div className="w-full p-4 pt-0 grid grid-cols-1 md:grid-cols-2 gap-2">
        {Object.entries(sets).map(([id, { description, flashcards, name }]) => (
          <button
            key={id}
            onClick={() => navigate(`/flashcards/${id}/view`)}
            className="rounded-xl border border-black/10 p-4 bg-white w-full text-left relative"
          >
            <Text.h3>{name}</Text.h3>
            <Text.p variant="tertiary" className="mb-2">
              {description.length ? description : "No description."}
            </Text.p>
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/flashcards/${id}`);
              }}
              className="text-sm font-semibold"
            >
              View details
            </div>
            <div className="absolute top-4 right-4 text-sm text-neutral-600 px-3 py-1 rounded-full border border-black/20">
              {flashcards.length} cards
            </div>
          </button>
        ))}
      </div>
      <CreateSetDialog create={(name) => dispatch(createSet(name))} />
    </div>
  );
}
