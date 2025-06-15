import React from "react";
import { Heart } from "lucide-react";

const Fav = () => {
  const [favourite, setFavourite] = React.useState(false);

  function changeFav(e) {
    e.stopPropagation();
    setFavourite((favourite) => !favourite);
  }

  return (
    <button onClick={changeFav}>
      <Heart
        className={favourite ? "text-blue-700" : "text-blue-700"}
        fill={favourite ? "#1D4ED8" : "none"}
      />
    </button>
  );
};

export default Fav;
