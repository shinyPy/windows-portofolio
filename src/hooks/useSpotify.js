import { useState } from "react";

export const useSpotify = (initialState) => {
  const [isSpotifyOpen, setSpotifyOpen] = useState(initialState);

  const closeSpotifyPlayer = () => {
    setSpotifyOpen(false);
  };

  return { isSpotifyOpen, closeSpotifyPlayer };
};
