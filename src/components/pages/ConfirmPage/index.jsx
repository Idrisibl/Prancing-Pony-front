import React from "react";
import { useParams } from "react-router-dom";
import Confirmation from "./Confirmation";

const ConfirmPage = () => {
  const {id} = useParams()

  return (
    <>
      <Confirmation id={id} />
    </>
  );
};

export default ConfirmPage;
