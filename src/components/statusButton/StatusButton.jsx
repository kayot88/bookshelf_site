import React, { Fragment, useContext, useEffect } from "react";
import {
  FaBook,
  FaCaretDown,
  FaCheckCircle,
  FaMinusCircle,
  FaPlusCircle,
} from "react-icons/fa";
import { useQuery, useQuey } from "react-query";
import * as colors from "../../styles/colors";
import { FireContext } from "../../utils/fireContext";
import { seedListPlanet } from "../../utils/seed";
import { useAsync } from "../hooks/useAsync";
import "../tooltip/styles/tooltip.css";
import { TooltipButton } from "../tooltip/Tooltip";

const StatusButton = () => {
  const { firebase } = useContext(FireContext);

  const { data: listItems } = useQuery({
    queryKey: "list_planet",
    queryFn: () =>
      firebase
        .firestore()
        .collection("list_planet")
        .get()
        .then((snapshot) => {
          console.log(snapshot);
          const allContent = snapshot.docs.map((contentObj) => ({
            ...contentObj.data(),
            docId: contentObj.id,
          }));
          return allContent;
        }),
  });


  const listItem = listItems?.find((i) => i) ?? null;
  return (
    <Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            label="Unmark as read"
            highlight={colors.yellow}
            // 🐨 add an onClick here that calls update with the data we want to update
            // 💰 to mark a list item as unread, set the finishDate to null
            // {id: listItem.id, finishDate: null}
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight={colors.green}
            // 🐨 add an onClick here that calls update with the data we want to update
            // 💰 to mark a list item as read, set the finishDate
            // {id: listItem.id, finishDate: Date.now()}
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          // 🐨 add an onClick here that calls remove
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight={colors.indigo}
          // 🐨 add an onClick here that calls create
          icon={<FaPlusCircle />}
        />
      )}
    </Fragment>
  );
};

export { StatusButton };
