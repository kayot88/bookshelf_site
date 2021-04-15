import React, { Fragment } from "react";
import { FaBook, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import * as colors from "../../styles/colors";
import "../tooltip/styles/tooltip.css";
import { TooltipButton } from "../tooltip/Tooltip";

const StatusButton = () => {
  const listItem = null;
  return (
    <Fragment>
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          className="center"
          icon={<FaBook />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          className="center"
          highlight={colors.indigo}
          icon={<FaPlusCircle />}
        />
      )}
    </Fragment>
  );
};

export { StatusButton };

