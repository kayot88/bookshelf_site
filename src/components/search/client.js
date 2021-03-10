export const client = (endpoint, customConfig = {}) => {
  const config = {
    method: "GET",
    ...customConfig,
  };
  return window
    .fetch(`https://api.nasa.gov/planetary/${endpoint}`, config)
    .then((response) => response.json());
};
