import Tooltip from "@reach/tooltip";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import * as colors from "../../styles/colors";
import { useAsync } from "../hooks/useAsync";
import "../tooltip/styles/tooltip.css";
import { client } from "./client";
import { PlanetRow } from "./planet-row";
import { BookListUL, Input, Spinner } from "./SearchStyles";

export const SearchComponent = ({ user }) => {
  const { data, error, run, isLoading, isError, isSuccess } = useAsync();
  const handleChange1 = (e) => {
    setDataState1(e.target.value);
  };
  const handleChange2 = (e) => {
    setDataState2(e.target.value);
  };
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [dataState1, setDataState1] = useState("");
  const [dataState2, setDataState2] = useState("");
  const [queried, setQueried] = useState(false);
  console.table([dataState1, dataState2]);

  useEffect(() => {
    if (!queried) {
      return;
    }
    run(
      client(
        `apod?start_date=${dateFrom}&end_date=${dateTo}&api_key=wruzha7a7vtmNdmKZekYem5yAzNF1vEcUKRF1I3u`
      )
    );
    setQueried(true);
  }, [dateFrom, dateTo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDateFrom(e.target.elements[0].value);
    setDateTo(e.target.elements[1].value);
    setQueried(true);
    return;
  };
  return (
    <div
      style={{
        maxWidth: 800,
        margin: "auto",
        width: "90vw",
        padding: "40px 0",
      }}
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchFrom">Enter date from</label>
        <Input
          placeholder="2020-01-10"
          id="searchFrom"
          value="2020-01-10"
          type="text"
          onChange={handleChange1}
        />

        <label htmlFor="searchTo">Enter date to</label>
        <Input
          placeholder="2020-01-10"
          id="searchTo"
          type="text"
          value="2020-01-10"
          onChange={handleChange2}
        />
        <Tooltip label="Search_planets" className="center">
          <button
            style={{
              border: "0",
              position: "relative",
              marginLeft: "-35px",
              background: "transparent",
            }}
            type="submit"
            aria-label="Search_planets"
          >
            {isLoading ? (
              <Spinner style={{ left: "-15px" }} />
            ) : isError ? (
              <FaTimes aria-label="error" style={{ color: colors.danger }} />
            ) : (
              <FaSearch aria-label="search" />
            )}
          </button>
        </Tooltip>
      </form>
      {isError ? <pre style={{ color: colors.danger }}>{error}</pre> : null}
      {isSuccess ? (
        data?.length ? (
          <BookListUL>
            {data.map((photo) => (
              <li key={nanoid()} aria-label={photo.title}>
                <PlanetRow
                  key={nanoid()}
                  photo={{ ...photo, planetId: nanoid() }}
                />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No missions found. Try another search.</p>
        )
      ) : null}
    </div>
  );
};

export default SearchComponent;
