import { useTransition } from "react";

export default function Favourite({id, record}) {
  let [isPending, startTransition] = useTransition();

   return (
    <button formAction={() => startTransition(() => likeCat(id, record?.like))}>
      {record?.like}&nbsp;Like
    </button>
  );
}