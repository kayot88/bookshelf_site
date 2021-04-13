import React from "react";
import { useParams } from "react-router";

const Planet = () => {
  const {planetId} = useParams()
  return (
    <div>
      {planetId}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // justifyContent: "flex-end",
          position: "relative",
        }}
      >
        <div>
          <img
            src="https://apod.nasa.gov/apod/image/2001/APOD-Soponyai-PenumbralEclipse1067.jpg"
            alt={`planet cover`}
            style={{
              maxHeight: "100%",
              objectFit: "contain",
              width: "100%",
            }}
          />
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
              <h2>{/* title */}</h2>
            </div>
            <div style={{ marginLeft: 10 }}>
              <div
                style={{
                  marginTop: "0.4em",
                  fontStyle: "italic",
                  fontSize: "0.85em",
                }}
              >
                <p>
                  "Are your eyes good enough to see the Crab Nebula expand? The
                  Crab Nebula is cataloged as M1, the first on Charles Messier's
                  famous list of things which are not comets. In fact, the Crab
                  is now known to be a supernova remnant, an expanding cloud of
                  debris from the explosion of a massive star. The violent birth
                  of the Crab was witnessed by astronomers in the year 1054.
                  Roughly 10 light-years across today, the nebula is still
                  expanding at a rate of over 1,000 kilometers per second. Over
                  the past decade, its expansion has been documented in this
                  stunning time-lapse movie. In each year from 2008 to 2017, an
                  image was produced with the same telescope and camera from a
                  remote observatory in Austria. Combined in the time-lapse
                  movie, the 10 images represent 32 hours of total integration
                  time. The sharp, processed frames even reveal the dynamic
                  energetic emission within the incredible expanding Crab. The
                  Crab Nebula lies about 6,500 light-years away in the
                  constellation Taurus. Teachers: APOD in the Classroom"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Planet };
