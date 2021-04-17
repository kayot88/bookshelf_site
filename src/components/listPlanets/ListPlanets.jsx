import { PlanetRow } from "../../components/search/planet-row";
import { PlanetsListUL } from "../../components/search/SearchStyles";
import React from "react";

const ListPlanets = ({
  user,
  filterListItem,
  noListItems,
  noFilteredListItem,
}) => {
  const listItems = null;

  const filteredListItem = listItems?.filter(filterListItem);

  if (!listItems?.length) {
    return (
      <div
        style={{
          marginTop: "1em",
          fontSize: "1.2em",
        }}
      >
        {noListItems}
      </div>
    );
  }

  if (!filteredListItem.length) {
    return (
      <div
        style={{
          marginTop: "1em",
          fontSize: "1.2em",
        }}
      >
        {noFilteredListItem}
      </div>
    );
  }

  return (
  <PlanetsListUL>
    {filteredListItem.map((listItem) => (

      <li key={listItem.id}>
        <PlanetRow photo={listItem.planet}/>
      </li>
    )  )}
  </PlanetsListUL>
    );
};

export { ListPlanets };
