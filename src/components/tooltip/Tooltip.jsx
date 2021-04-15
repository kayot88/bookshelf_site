import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as colors from "../../styles/colors";
import { Tooltip } from "../../utils/lib";
import { useAsync } from "../hooks/useAsync";
import { Spinner } from "../search/SearchStyles";
import { CircleButton } from "./styles";

const TooltipButton = ({ label, highlight, icon, onClick }) => {
  const { run, error, isLoading, isError } = useAsync();
  const handleClick = () => {
    return;
    // return run(onClick());
  };

  return (
    <Tooltip label={label} className="center">
      <CircleButton
        css={{
          backgroundColor: "white",
          position: "relative",
          ":hover, :focus": {
            color: isLoading
              ? colors.gray80
              : isError
              ? colors.danger
              : highlight,
          },
        }}
        aria-label={label}
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  );
};

export { TooltipButton };
