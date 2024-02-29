// Components
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";

function SearchInput() {
  const router = useRouter();
  return (
    <Input
      type="url"
      // placeholder="lazco"
      labelPlacement="outside"
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          router.push(`/find?sub=${e.currentTarget.value}`);
        }
      }}
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-500 text-small">https://</span>
        </div>
      }
      endContent={
        <div className="pointer-events-none flex-none items-center w-auto">
          <span className="text-default-500 text-small">.dev-in.tw</span>
        </div>
      }
    />
  );
}

export default SearchInput;
