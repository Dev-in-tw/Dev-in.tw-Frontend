"use client";

// component
import { Input } from "@nextui-org/react";

export default function Home() {
  return (
    <div>

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
    </div>
  );
}
