import { useEffect, useState } from "react";
import { Model } from "./Model";

export const useSearch = <T extends {}>(model: Model<T>, query: string) => {
  const [items, setItems] = useState<T[]>();

  useEffect(() => {
    load(query);
  }, [query]);

  const load = async (q = "") => {
    const result = await model.search(q);
    setItems(result);
  };

  return { items, load };
};
