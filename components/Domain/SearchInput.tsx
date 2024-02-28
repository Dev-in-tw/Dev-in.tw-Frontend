// Components
import { Input } from "@nextui-org/react";

function SearchInput() {
  return (
    <Input
      type="url"
      placeholder="lazco"
      labelPlacement="outside"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-small">https://</span>
        </div>
      }
      endContent={
        <div className="pointer-events-none flex-none items-center w-auto">
          <span className="text-default-400 text-small">.dev-in.tw</span>
        </div>
      }
    />
  );
}

export default SearchInput;
