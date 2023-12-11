import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { colors } from "../../utils/theme";
import styles from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDroplet, faSun, faWind } from "@fortawesome/free-solid-svg-icons";
import * as Progress from "react-native-progress";

const HomeTemplate = ({
  showSearch,
  openSearch,
  locations,
  handleDebounceText,
  currentLocation,
  handleLocation,
  loading,
}) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      {loading ? (
        <View style={{backgroundColor: colors.IndigoDye,flex:1, flexDirection: "row",justifyContent:"center",alignItems:"center"}}>
          <Progress.CircleSnail size={110} thickness={11} color={colors.white}/>
        </View>
      ) : (
        <SafeAreaView style={styles.containerSearch}>
          <View style={{ position: "relative", zIndex: 2 }}>
            {/* SEARCH SECTION */}
            <View
              style={[
                styles.search,
                {
                  backgroundColor: showSearch
                    ? colors.lightWhite(0.5)
                    : "transparent",
                },
              ]}
            >
              {showSearch && (
                <TextInput
                  onChangeText={handleDebounceText}
                  placeholder="Search"
                  placeholderTextColor={colors.white}
                  style={styles.searchInput}
                />
              )}
              <TouchableOpacity onPress={openSearch} style={styles.searchIcon}>
                <MagnifyingGlassIcon
                  size={25}
                  color={"white"}
                ></MagnifyingGlassIcon>
              </TouchableOpacity>
            </View>
            {locations.length > 0 && showSearch && (
              <View style={styles.locations}>
                {locations.map((loc, index) => {
                  let showBorder = index + 1 != locations.length;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleLocation(loc)}
                      style={[
                        styles.locRow,
                        {
                          borderBottomColor: showBorder
                            ? "#B0B0B0"
                            : "transparent",
                        },
                      ]}
                    >
                      <MapPinIcon
                        size={22}
                        color={colors.gray}
                        style={{ marginRight: 9 }}
                      ></MapPinIcon>
                      <Text style={{ fontSize: 17 }}>
                        {loc.name},{loc.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
          {/* Forecast SECTION */}
          <View
            style={{
              marginHorizontal: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 2,
              flex: 1,
              zIndex: 1,
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontWeight: "bold",
                // textAlign: "center",
                fontSize: 38,
              }}
            >
              {currentLocation?.location?.name},
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "600",
                  color: colors.lightWhite(0.7),
                }}
              >
                {" " + currentLocation?.location?.country},
              </Text>
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                margin: 50,
              }}
            >
              <Image
                source={{
                  uri: "https:" + currentLocation?.current?.condition?.icon,
                }}
                //source={semiCloudy}
                style={{ width: 170, height: 150 }}
              />
            </View>
            <View style={{ marginBottom: 50 }}>
              <Text
                style={{
                  color: colors.white,
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 40,
                }}
              >
                {currentLocation?.current?.temp_c + "°"}
              </Text>
              <Text
                style={{
                  color: colors.white,
                  textAlign: "center",
                  fontSize: 22,
                  letterSpacing: 1,
                }}
              >
                {currentLocation?.current?.condition?.text}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 30,
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon icon={faWind} size={20} color={colors.white} />
                <Text
                  style={{ color: colors.white, fontSize: 17, marginLeft: 10 }}
                >
                  {currentLocation?.current?.wind_kph} km
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 30,
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faDroplet}
                  size={20}
                  color={colors.white}
                />
                <Text
                  style={{ color: colors.white, fontSize: 17, marginLeft: 10 }}
                >
                  {currentLocation?.current?.humidity} %
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 30,
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon icon={faSun} size={20} color={colors.white} />
                <Text
                  style={{ color: colors.white, fontSize: 17, marginLeft: 10 }}
                >
                  {currentLocation?.forecast?.forecastday[0]?.astro.sunrise}
                </Text>
              </View>
            </View>
          </View>
          {/* next days Forecast SECTION */}
          <View style={{ marginBottom: 16 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
                marginHorizontal: 15,
              }}
            >
              <CalendarDaysIcon size={28} color={colors.white} />
              <Text
                style={{ color: colors.white, marginLeft: 12, fontSize: 16 }}
              >
                Daily forecast
              </Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
            >
              {currentLocation?.forecast?.forecastday?.map((day, index) => {
                let date = new Date(day.date);
                let options = { weekday: "long" };
                let dayName = date.toLocaleDateString("en-US", options);
                dayName = dayName.split(",")[0];
                return (
                  <View
                    key={index}
                    style={{
                      backgroundColor: colors.lightWhite(0.35),
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 25,
                      padding: 10,
                      margin: 5,
                      width: 103,
                      height: 130,
                    }}
                  >
                    <Image
                      source={{ uri: "https:" + day?.day?.condition?.icon }}
                      style={{ width: 40, height: 40, marginBottom: 5 }}
                    />
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: 16,
                        marginBottom: 5,
                      }}
                    >
                      {dayName}
                    </Text>
                    <Text
                      style={{
                        color: colors.white,
                        fontWeight: 900,
                        fontSize: 16,
                      }}
                    >
                      {day?.day?.avgtemp_c}°
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default HomeTemplate;
