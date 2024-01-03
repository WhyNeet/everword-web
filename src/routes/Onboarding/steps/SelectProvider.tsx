import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Typography";
import { StepFrame, StepProps } from "./common";
import { useSelector, useDispatch } from "react-redux";
import { selectProviders } from "@/lib/redux/features/settings/provider/providerSlice";
import { Select } from "@/components/ui/Select";
import { AppDispatch } from "@/lib/redux/store";
import { setProviderByName } from "@/lib/redux/features/settings/provider/providerSlice";
import { useDiscoverQuery } from "@/lib/redux/backendApi";

export default function SelectProvider({ next }: StepProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { isFetching, isError, data: availableProviders } = useDiscoverQuery();
  const { currentProvider } = useSelector(selectProviders);

  const onProviderChange = (provider: string) =>
    dispatch(setProviderByName(provider));

  return (
    <StepFrame>
      <Text.h1 className="mb-2">Select a dictionary</Text.h1>
      <Text.p variant="primary" className="text-balance mb-8">
        Select a dictionary to fetch defenitions from. This can be changed
        later.
      </Text.p>
      {isFetching ? (
        <div>loading providers...</div>
      ) : isError ? (
        <div>An error occured.</div>
      ) : (
        <Select
          onSelectionChange={onProviderChange}
          initialItem={currentProvider!.name}
          items={availableProviders!.map((it) => it.name)}
        />
      )}
      <span className="flex-1" />
      <Button onClick={next}>Finish</Button>
    </StepFrame>
  );
}
