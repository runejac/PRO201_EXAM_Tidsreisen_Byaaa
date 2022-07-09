import React from "react";
import { MyFindingsCard } from "../components/MyFindingsCard.jsx";
import { Loading } from "../components/Loading.jsx";
import { ErrorModal } from "../components/ErrorModal.jsx";

export function MyFindings({ loading, error }) {
  // loading and error from user fetch
  return (
    <div id={"container"}>
      {loading && <Loading />}
      {error && <ErrorModal error={error} />}
      <MyFindingsCard />
    </div>
  );
}
