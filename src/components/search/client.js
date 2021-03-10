import React from 'react';

export const client = (endpoint, customConfig={}) => {
  return window
    .fetch(`https://api.nasa.gov/planetary/${endpoint}`, customConfig)
    .then((response) => response.json());
};
