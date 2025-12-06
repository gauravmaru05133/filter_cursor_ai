import { useState } from "react";

export const useShipmentsViewModal = () => {
  const [search, setSearch] = useState<string>();

  return {
    search,
    setSearch,
  };
};
