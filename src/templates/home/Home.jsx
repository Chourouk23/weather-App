import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { colors } from "../../utils/theme";
import styles from "./styles";
import { semiCloudy, windIcon } from "../../publics";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDroplet, faSun, faWind } from "@fortawesome/free-solid-svg-icons";
const HomeTemplate = ({ showSearch, openSearch, locations }) => {
  handleLocation = (loc) => {
    console.log(loc);
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      <SafeAreaView style={styles.containerSearch}>
        <View style={{ position: "relative", elevation: 50 }}>
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
                    <Text style={{ fontSize: 17 }}>London,United Kingdom</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
        {/* Forcast SECTION */}
        <View
          style={{
            marginHorizontal: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flex: 1,
            marginBottom: 2,
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontWeight: "bold",
              // textAlign: "center",
              fontSize: 24,
            }}
          >
            London,
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: colors.lightWhite(0.7),
              }}
            >
              United Kingdom
            </Text>
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              margin: 80,
            }}
          >
            <Image source={semiCloudy} style={{ width: 170, height: 180 }} />
          </View>
          <View style={{ marginBottom: 90 }}>
            <Text
              style={{
                color: colors.white,
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 47,
              }}
            >
              24°
            </Text>
            <Text
              style={{
                color: colors.white,
                textAlign: "center",
                fontSize: 20,
                letterSpacing: 1,
              }}
            >
              Partly Cloudy
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between"}}
          >
            <View style={{ flexDirection: "row", marginHorizontal: 30, alignItems: "center"  }}>
              <FontAwesomeIcon icon={faWind} size={20} color={colors.white} />
              <Text style={{ color: colors.white, fontSize: 17, marginLeft: 10 }}>22 km</Text>
            </View>
            <View
              style={{ flexDirection: "row", marginHorizontal: 30, alignItems: "center"  }}
            >
               
              <FontAwesomeIcon icon={faDroplet} size={20} color={colors.white} />
              <Text style={{ color: colors.white, fontSize: 17, marginLeft: 10 }}>22 km</Text>
            </View>
            <View
              style={{ flexDirection: "row", marginHorizontal: 30, alignItems: "center"  }}
            >
              <FontAwesomeIcon icon={faSun} size={20} color={colors.white} />
              <Text style={{ color: colors.white, fontSize: 17, marginLeft: 10 }}>22 km</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeTemplate;
