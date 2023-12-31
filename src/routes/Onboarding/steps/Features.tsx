import { Button } from "@/components/ui/Button";
import { StepFrame, StepProps } from "./common";
import { Text } from "@/components/ui/Typography";

const features: { name: string; description: string }[] = [
  {
    name: "Flashcards",
    description: "Study words with flashcard sets you create.",
  },
  {
    name: "Dictionary",
    description:
      "A dictionary is built-in. Search any words and get results from multiple sources.",
  },
];

export default function Features({ next }: StepProps) {
  return (
    <StepFrame>
      <Text.h1 className="mb-2">Features</Text.h1>
      <Text.p variant="primary" className="mb-16">
        Explore the features of this app to get the best experience with it.
      </Text.p>
      {features.map(({ description, name }) => (
        <div key={name} className="mb-6">
          <h2 className="font-sans text-2xl font-bold">{name}</h2>
          <Text.p variant="default">{description}</Text.p>
        </div>
      ))}
      <span className="flex-1" />
      <Button onClick={next}>Next</Button>
    </StepFrame>
  );
}
