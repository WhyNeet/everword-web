import { Button } from "@/components/ui/Button";
import { StepFrame, StepProps } from "./common";
import { Text } from "@/components/ui/Typography";

export default function Welcome({ next }: StepProps) {
  return (
    <StepFrame>
      <div className="flex-1 flex items-center justify-center">
        <img src="/images/people-talking.png" className="w-[390px]" />
      </div>
      <Text.h1 className="mb-2">Welcome</Text.h1>
      <Text.p variant="primary" className="mb-8">
        Everword is an English vocabulary learning app with a built-in
        dictionary, flashcards and more.
      </Text.p>
      <Button onClick={next}>Get started</Button>
    </StepFrame>
  );
}
