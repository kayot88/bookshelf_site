import React, { useContext, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useMutation, QueryCache, useQueryClient } from "react-query";
import * as colors from "../../styles/colors";
import { FireContext } from "../../utils/fireContext";
import { Tooltip } from "../../utils/lib";
import { useAsync } from "../hooks/useAsync";
import { Spinner } from "../search/SearchStyles";
import { CircleButton } from "./styles";

const TooltipButton = ({ label, highlight, icon, onClick }) => {
  const [isLoading, setisLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { firebase } = useContext(FireContext);
  console.log("isLoading", isLoading);
  const queryCache = new QueryCache({
    onError: (error) => {
      console.log(error);
    },
  });
  const { mutate } = useMutation(() => {
    setisLoading(true);
    new Promise((res) => seedListPlanet());
  });
  const queryClient = useQueryClient();
  queryClient.invalidateQueries("list_planet");
  function seedListPlanet() {
    firebase.firestore().collection("list_planet").add({
      planetId: "Tiger King",
    });
    setisLoading(false);
    return;
  }
  return (
    <Tooltip label={label} className="center">
      <CircleButton
        css={{
          backgroundColor: "white",
          position: "relative",
          "&:hover, :focus": {
            color: isLoading
              ? colors.gray80
              : isError
              ? colors.danger
              : highlight,
          },
        }}
        aria-label={label}
        onClick={() => mutate()}
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  );
};

export { TooltipButton };


