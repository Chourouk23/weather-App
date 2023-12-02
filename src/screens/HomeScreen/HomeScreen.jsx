import React, { useState } from "react";
import HomeTemplate from "../../templates/home/Home";

const HomeScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([1,2,3]);
  return (
    <HomeTemplate
      showSearch={showSearch}
      openSearch={() => setShowSearch(!showSearch)}
      locations={locations}
    />
  );
};

export default HomeScreen;
