import React, { useEffect, useState } from "react";
import Tooltip from "@reach/tooltip";
import { FaSearch, FaTimes } from "react-icons/fa";
import { BookListUL, Input, Spinner } from "./SearchStyles";
import { PlanetRow } from "./planet-row";
import { nanoid } from "nanoid";
import { client } from "./client";
import * as colors from "../../styles/colors";
import { useAsync } from "../hooks/useAsync";

export const SearchComponent = () => {
  // const [data, setData] = useState(null);
  // const [status, setStatus] = useState("idle");
  const { data, error, run, isLoading, isError, isSuccess } = useAsync();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [queried, setQueried] = useState(false);
  // const [error, setError] = useState(null);
  // console.log("status", status);

  // let isSuccess = status === "success";
  // let isLoading = status === "loading";
  // let isError = status === "error";
  useEffect(() => {
    if (!queried) {
      return;
    }
    // setStatus("loading");
    run(
      client(
        `apod?start_date=${dateFrom}&end_date=${dateTo}&api_key=wruzha7a7vtmNdmKZekYem5yAzNF1vEcUKRF1I3u`
      )
    );
    // .then((resData) => {
    //   setData(resData);
    //   setStatus("success");
    //   if (resData.msg) {
    //     setStatus("error");
    //     setError(resData.msg);
    //   }
    // });
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
        <Input placeholder="dATE FROM YYYY-MM-DD" id="searchFrom" type="text" />

        <label htmlFor="searchTo">Enter date to</label>
        <Input placeholder="dATE TO YYYY-MM-DD" id="searchTo" type="text" />
        <Tooltip label="Search planets">
          <button
            style={{
              border: "0",
              position: "relative",
              marginLeft: "-35px",
              background: "transparent",
            }}
            type="submit"
          >
            {isLoading ? (
              <Spinner />
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
                <PlanetRow key={nanoid()} photo={photo} />
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
