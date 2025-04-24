/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Loader } from "@googlemaps/js-api-loader";
import { Input } from "@/components/ui";

interface ExtendedSearchOptions {
  componentRestrictions?: { country: string | string[] };
  language?: string;
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
  locationRestriction?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
  offset?: number;
  origin?: google.maps.LatLng | google.maps.LatLngLiteral;
  radius?: number;
  types?: string[];
}

interface AddressInputProps {
  name: string;
  placeholder?: string;
  onChange: (address: string) => void;
  value: string;
}

export const AddressInput: React.FC<AddressInputProps> = ({
  name,
  placeholder,
  onChange,
  value,
}) => {
  const [address, setAddress] = useState(value);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyCwYhhUfQFH7hM8cuvb9JlLuN2QCcGyvtI", // Замените на ваш ключ
      version: "weekly",
      libraries: ["places"],
    });

    loader
      .load()
      .then(() => {
        setIsLoaded(true);
      })
      .catch((error: unknown) => {
        console.error("Ошибка загрузки Google Maps API:", error);
      });
  }, []);

  const handleSelect = async (selectedAddress: string) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
    //   const latLng = await getLatLng(results[0]);
      setAddress(selectedAddress);
      setHasSelected(true);
      onChange(selectedAddress);
    //   console.log("Координаты:", latLng);
    } catch (error) {
      console.error("Ошибка при выборе адреса:", error);
    }
  };

  if (!isLoaded) {
    return <Input placeholder="Завантаження..." disabled />;
  }

  return (
    <PlacesAutocomplete
      value={address}
      onChange={(val) => {
        setAddress(val);
        setHasSelected(false);
      }}
      onSelect={handleSelect}
      onError={(status, clearSuggestions) => {
        if (status === "ZERO_RESULTS") {
          clearSuggestions();
        } else {
          console.error("Ошибка автозаполнения:", status);
        }
      }}
      searchOptions={{
        componentRestrictions: { country: "ua" },
        language: "uk",
      } as ExtendedSearchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="relative">
          <Input
            {...getInputProps({
              placeholder: placeholder || "Введіть адресу...",
              className: "text-base",
              name,
            })}
          />
          <div className="absolute z-10 bg-[hsl(var(--muted))] w-full shadow-md">
            {loading && <div className="p-2">Завантаження...</div>}
            {!loading && suggestions.length === 0 && address.trim() !== "" && !hasSelected && (
              <div className="p-2 text-gray-500">Адреси не знайдено</div>
            )}
            {suggestions.map((suggestion) => (
              <div
                {...getSuggestionItemProps(suggestion, {
                  className: `p-2 cursor-pointer ${
                    suggestion.active ? "bg-primary/10" : ""
                  }`,
                })}
                key={suggestion.placeId}
              >
                {suggestion.description}
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};
