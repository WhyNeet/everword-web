import { Button, buttonVaraints } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Typography";
import { useState } from "react";

export const CreateSetDialog = ({
  create,
}: {
  create: (name: string) => void;
}) => {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = () => {
    create(name.trim());
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className={buttonVaraints({
          size: "icon",
          className: "fixed right-4 bottom-4 h-14",
        })}
      >
        <span className="icon text-xl">edit</span>
      </DialogTrigger>
      <DialogContent>
        <Text.h3>Create a new set.</Text.h3>
        <Input
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Set name..."
        />
        <Button disabled={!name.trim().length} onClick={handleCreate} size="sm">
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};
