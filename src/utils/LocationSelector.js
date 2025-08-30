// LocationSelector.jsx
import React, { useState, useEffect } from "react";
import { Box, Select, VStack, Heading, Flex } from "@chakra-ui/react";
import { Country, State, City } from "country-state-city";

const LocationSelector = ({ onChange }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const countries = Country.getAllCountries();
  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry)
    : [];
  const cities = selectedState
    ? City.getCitiesOfState(selectedCountry, selectedState)
    : [];

  // Pass values to parent whenever change happens
  useEffect(() => {
    onChange &&
      onChange({
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
      });
  }, [selectedCountry, selectedState, selectedCity]);

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        <Flex direction={{ base: "column", md: "row" }} gap={4}>
          <Select
            placeholder="Select Country"
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setSelectedState("");
              setSelectedCity("");
            }}
          >
            {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </Select>

          <Select
            placeholder="Select State"
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity("");
            }}
            isDisabled={!selectedCountry}
          >
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </Select>

          <Select
            placeholder="Select City"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            isDisabled={!selectedState}
          >
            {cities.map((city, index) => (
              <option key={index} value={city.name}>
                {city.name}
              </option>
            ))}
          </Select>
        </Flex>
      </VStack>
    </Box>
  );
};

export default LocationSelector;
