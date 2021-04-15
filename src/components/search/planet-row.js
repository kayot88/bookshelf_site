import React from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import * as colors from "../../styles/colors";
import * as mq from "../../styles/media-queries";
import { Rating } from "../rating/Rating";
import { StatusButton } from "../statusButton/StatusButton";

function PlanetRow({ photo}) {
  const { title, url, explanation, media_type, planetId } = photo;
  // const planetContext = createContext(photo);
  // console.log(photo);

  const id = `planet-row-planet-${photo.url}`;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        position: "relative",
      }}
    >
      <Link
        to={`/planet/${planetId}`}
        aria-labelledby={id}
        style={{
          minHeight: 270,
          flexGrow: 2,
          display: "grid",
          gridTemplateColumns: "1fr 340px ",
          gridGap: 20,
          border: `1px solid ${colors.gray20}`,
          color: colors.text,
          padding: "1.25em",
          borderRadius: "3px",
          ":hover,:focus": {
            textDecoration: "none",
            boxShadow: "0 5px 15px -5px rgba(0,0,0,.08)",
            color: "inherit",
          },
        }}
      >
        <Rating />
        <StatusButton />
        <div
          style={{
            width: "340px",
            position: "relative",

            [mq.small]: {
              width: "100px",
            },
          }}
        >
          {media_type === "image" ? (
            <img
              src={url}
              alt={`planet cover`}
              style={{ maxHeight: "100%", objectFit: "contain", width: "100%" }}
            />
          ) : (
            <div>
              <ReactPlayer
                url={url}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <div style={{ flex: 1 }}>
              <h2
                id={id}
                style={{
                  fontSize: "1.25em",
                  margin: "0",
                  color: colors.indigo,
                }}
              >
                {title}
              </h2>
            </div>
            <div style={{ marginLeft: 10 }}>
              <div
                style={{
                  marginTop: "0.4em",
                  fontStyle: "italic",
                  fontSize: "0.85em",
                }}
              >
                {explanation}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export { PlanetRow };

