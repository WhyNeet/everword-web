import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Typography";
import { StepFrame, StepProps } from "./common";
import { useSelector, useDispatch } from "react-redux";
import { selectProviders } from "@/lib/redux/features/settings/provider/selector";
import { Select } from "@/components/ui/Select";
import { AppDispatch } from "@/lib/redux/store";
import { setProviderByName } from "@/lib/redux/features/settings/provider/providerSlice";
import { useEffect } from "react";
import { fetchProvidersThunk } from "@/lib/redux/features/settings/provider/fetchProvidersThunk";

export default function SelectProvider({ next }: StepProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { currentProvider, availableProviders } = useSelector(selectProviders);

  useEffect(() => {
    dispatch(fetchProvidersThunk());
  }, []);

  const onProviderChange = (provider: string) =>
    dispatch(setProviderByName(provider));

  return (
    <StepFrame>
      <Text.h1 className="mb-2">Select a dictionary</Text.h1>
      <Text.p variant="primary" className="text-balance mb-8">
        Select a dictionary to fetch defenitions from. This can be changed
        later.
      </Text.p>
      {availableProviders ? (
        <Select
          onSelectionChange={onProviderChange}
          initialItem={currentProvider!.name}
          items={availableProviders.map((it) => it.name)}
        />
      ) : (
        <div>loading providers...</div>
      )}
      <span className="flex-1" />
      <Button onClick={next}>Finish</Button>
    </StepFrame>
  );
}
