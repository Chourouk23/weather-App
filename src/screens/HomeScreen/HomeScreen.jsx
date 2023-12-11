import React, { useCallback, useEffect, useState } from "react";
import HomeTemplate from "../../templates/home/Home";
import { fetchLocations, fetchWeatherForecast } from "../../api/weather";
import { debounce } from "lodash";
import { getData, storeData } from "../../utils/asyncStorage";
const HomeScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchMyweatherData();
  }, []);

  const fetchMyweatherData = async () => {
    let myCity = await getData('city');
    let cityName ="sfax"
    if(myCity){
      cityName=myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: "7",
    }).then((data) => {
      setCurrentLocation(data);
      setLoading(false)
    });
  };
  const handleSearch = async (value) => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        setLocations(data);
      });
    }
  };
  const handleDebounceText = useCallback(debounce(handleSearch, 1200), []);

  const handleLocation = async (loc) => {
    console.log(loc);
    setLocations([]);
    setShowSearch(false);
    setLoading(true)
    fetchWeatherForecast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      console.log("forecast : ", data.forecast);
      setCurrentLocation(data);
      setLoading(false)
      storeData('city', loc.name)
    });
  };
  return (
    <HomeTemplate
      showSearch={showSearch}
      openSearch={() => setShowSearch(!showSearch)}
      locations={locations}
      handleDebounceText={handleDebounceText}
      currentLocation={currentLocation}
      handleLocation={handleLocation}
      loading={loading}
    />
  );
};

export default HomeScreen;
