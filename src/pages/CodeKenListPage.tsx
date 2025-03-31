import useGetKens from "../hooks/useGetKens";

export default function CodeKenListPage() {
  const { data: kens, isLoading: isLoadingKens } = useGetKens();

  return <div>CodeKenListPage</div>;
}
