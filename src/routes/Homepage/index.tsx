import { Header } from "@/components/Header";
import { Link, useNavigate } from "react-router-dom";
import { Text } from "@/components/ui/Typography";
import { CreateSetDialog } from "./CreateSetDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  create as createSet,
  select as selectSets,
} from "@/lib/redux/features/flashcards/sets/setsSlice";
import {
  pass,
  select as selectOnboarding,
} from "@/lib/redux/features/settings/onboarding/onboardingSlice";
import { Button, buttonVaraints } from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";

export default function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sets } = useSelector(selectSets);
  const { isPassed } = useSelector(selectOnboarding);

  return (
    <div className="h-screen w-screen overflow-x-hidden bg-neutral-100">
      <Header />
      <div className="px-8 pt-24 pb-2">
        <Text.h2 className="mb-3">Flashcards</Text.h2>
      </div>
      <AnimatePresence>
        {!isPassed ? (
          <motion.div
            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
            animate={{ height: 56, opacity: 1, marginBottom: 16 }}
            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
            className="px-2 h-14 pl-4 rounded-xl border border-black/10 bg-white mx-4 flex items-center font-medium"
          >
            Get started with Everword.
            <span className="flex-1" />
            <Button
              variant="secondary"
              size="icon"
              onClick={() => dispatch(pass())}
              className="mr-2"
            >
              <span className="icon">close</span>
            </Button>
            <Link
              to="/get-started"
              className={buttonVaraints({ size: "icon" })}
            >
              <span className="icon">arrow_forward</span>
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
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
