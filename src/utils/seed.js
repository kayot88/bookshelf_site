export function seedListPlanet(firebase) {
  
  function getUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const piece = (Math.random() * 16) | 0;
      const elem = c === "x" ? piece : (piece & 0x3) | 0x8;
      return elem.toString(16);
    });
  }
console.log("seedListPlanet");
  return firebase.firestore().collection("list_planet").add({
    id: getUUID(),
    planetId: "Tiger King",
    // description:
    //   "An exploration of big cat breeding and its bizarre underworld, populated by eccentric characters.",
    // genre: "documentaries",
    // maturity: "18",
    // slug: "tiger-king",
  });
}
