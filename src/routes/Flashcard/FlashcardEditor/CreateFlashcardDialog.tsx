import { ActivityIndicator } from "@/components/ui/ActivityIndicator";
import { Button, buttonVaraints } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Typography";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useLazyAutocompleteQuery } from "@/lib/redux/autocompleteApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFlashcard as createFlashcard } from "@/lib/redux/features/flashcards/sets/setsSlice";
import { useLazyDefineQuery } from "@/lib/redux/backendApi";
import { Switch } from "@/components/ui/Switch";
import { select as selectProviders } from "@/lib/redux/features/settings/provider/providerSlice";

export const CreateFlashcardDialog = ({ setId }: { setId: string }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [word, setWord] = useState("");
  const [define, setDefine] = useState(true);

  const dispatch = useDispatch();

  const [trigger, { data: autocomplete, isFetching }] =
    useLazyAutocompleteQuery();

  const [triggerDefine, { isFetching: isFetchingDefenitions }] =
    useLazyDefineQuery();

  const { currentProvider } = useSelector(selectProviders);

  const debouncedWord = useDebounce(word, 100);

  useEffect(() => {
    if (debouncedWord.trim().length < 2) return;

    trigger(debouncedWord);
  }, [debouncedWord]);

  const addFlashcard = async (word: string) => {
    if (!word.trim().length) return;

    if (!define)
      return dispatch(
        createFlashcard({
          setId,
          flashcard: { word: word.trim(), defenitions: null },
        })
      );

    setIsCreating(true);
    const { data, isError } = await triggerDefine({
      provider: currentProvider?.id ?? "cambridge",
      word: word.trim(),
    });

    if (isError) return;

    dispatch(
      createFlashcard({
        setId,
        flashcard: { word: word.trim(), defenitions: data! },
      })
    );
    setIsCreating(false);
    setWord("");
  };

  return (
    <Dialog open={isCreating} onOpenChange={setIsCreating}>
      <DialogTrigger className={buttonVaraints()}>
        <span className="icon scale-125">add_circle</span>
      </DialogTrigger>
      <DialogContent>
        <Text.h3>Create a flashcard.</Text.h3>
        <div className="relative flex items-center w-full">
          <Input
            value={word}
            onChange={(e) => setWord(e.currentTarget.value)}
            placeholder="Enter a word..."
            className="w-full"
          />
          {isFetching ? (
            <div className="absolute right-4">
              <ActivityIndicator className="text-black h-5 w-5" />
            </div>
          ) : null}
        </div>
        <Switch isChecked={define} setIsChecked={setDefine}>
          Define
        </Switch>
        {word.trim().length > 1 ? (
          <div className="max-h-[50vh] flex flex-col items-stretch overflow-y-scroll">
            {autocomplete?.map(({ word }, idx) => (
              <button
                onClick={() => addFlashcard(word)}
                key={idx}
                className="px-4 py-2 font-semibold rounded-xl hover:bg-black hover:text-white text-left flex items-center justify-between group"
              >
                {word}
                <span className="icon text-lg opacity-0 group-hover:opacity-100">
                  chevron_right
                </span>
              </button>
            ))}
          </div>
        ) : null}
        <Button
          disabled={isFetchingDefenitions || word.trim().length === 0}
          onClick={() => addFlashcard(word)}
          variant="ghost"
          size="sm"
        >
          {isFetchingDefenitions ? (
            <>
              <ActivityIndicator className="text-black h-5 w-5" />
              Defining...
            </>
          ) : (
            "Continue as is."
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
