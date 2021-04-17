import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useAsync } from "../../components/hooks/useAsync";
import { StatusButton } from "../../components/statusButton/StatusButton";
import bookPlaceholderSvg from "../../assets/book-placeholder.svg";
import * as mq from "../../styles/media-queries";

const loadingPlanet = {
  title: "loading title",
  url: bookPlaceholderSvg,
  explanation: "loading explanation",
  planetId: "loading planetId",
};

const Planet = () => {
  const { data, run, isLoading } = useAsync();
  const { planetId } = useParams();
  const listItem = null;
  useEffect(() => {
    run(
      axios.get(
        "http://www.json-generator.com/api/json/get/ceRuVmAcZe?indent=2"
      )
    );
  }, [run]);

  const planet = data?.data[0] ?? loadingPlanet;
  const { title, url, explanation } = planet;

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gridGap: "1em",
          marginBottom: "1em",
          [mq.small]: {
            display: "flex",
            flexDirection: "column",
          },
          position: "relative",
        }}
      >
        <img
          src={url}
          alt={`planet cover`}
          style={{
            width: "100%",
            maxWidth: "14rem",
          }}
        />

        <div
          style={{
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <h1 id={planetId}>{title}</h1>
          <div style={{ display: "flex", marginLeft: 10 }}>
            <div
              style={{
                marginTop: "0.4em",
                fontStyle: "italic",
                fontSize: "0.85em",
              }}
            >
              {explanation}
            </div>
            {isLoading ? null : <StatusButton />}
          </div>
        </div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            position: "relative",
          }}
        ></div>
      </div>
    </div>
  );
};

export { Planet };
