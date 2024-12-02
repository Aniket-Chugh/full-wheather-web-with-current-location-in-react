import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { TbCurrentLocation } from "react-icons/tb";

function InputFile() {
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState({
    location: "--",
    temp: "--",
    date: "--",
    condition: "--",
    src: null,
  });

  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  // Load recent searches from localStorage when the app starts
  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  // Save recent searches to localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  async function fetchWeather(search) {
    const url = `https://api.weatherapi.com/v1/current.json?key=ab844ace4aaf4d6f992160138241509&q=${search}&aqi=no`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        alert("Location is invalid!");
        return null;
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error fetching weather:", error);
      return null;
    }
  }

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onClick = async () => {
    if (search.trim() !== "") {
      const data = await fetchWeather(search);
      if (data) updateWeatherInfo(data);
      setSearch("");
    }
  };

  const updateWeatherInfo = (data) => {
    const temp = data.current.temp_c;
    const location = data.location.name;
    const timedata = data.location.localtime;
    const [date] = timedata.split(" ");
    const iconlink = data.current.condition.icon;
    const condition = data.current.condition.text;

    setWeatherInfo({
      location: location,
      temp: temp,
      date: date,
      condition: condition,
      src: iconlink,
    });

    setRecentSearches([
      { search: location, icon: iconlink, tempe: temp },
      ...recentSearches,
    ]);
  };

  const GetCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLongitude(position.coords.longitude);
          setLatitude(position.coords.latitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to fetch current location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    const fetchLocationWeather = async () => {
      if (latitude && longitude) {
        try {
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
          const response = await fetch(url);
          const data = await response.json();
          const district =
            data.address?.state_district ||
            data.address?.village ||
            data.address?.city ||
            data.address?.state;
          if (district) {
            const weatherData = await fetchWeather(district);
            if (weatherData) updateWeatherInfo(weatherData);
          } else {
            alert("Unable to determine location name.");
          }
        } catch (error) {
          console.error("Error fetching location data:", error);
        }
      }
    };

    fetchLocationWeather();
  }, [latitude, longitude]);

  // Function to handle deletion of a recent search
  const handleDelete = (indexToDelete) => {
    const updatedSearches = recentSearches.filter((_, index) => index !== indexToDelete);
    setRecentSearches(updatedSearches);
  };

  return (
    <div className="flex flex-col items-center justify-start mt-10 gap-8 p-6">
      <div className="bg-blue-200 w-full max-w-4xl flex items-center justify-between p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4 w-full bg-white rounded-lg p-4 shadow">
          <CiSearch className="w-8 h-8 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={onChangeSearch}
            placeholder="Search your place..."
            className="p-3 flex-grow border-none focus:outline-none text-gray-700"
          />
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={onClick}
          >
            Search
          </button>
          <button
            onClick={GetCurrentLocation}
            className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800"
          >
            Current Location
            <TbCurrentLocation />
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-full max-w-4xl p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-3xl font-bold">{weatherInfo.location}</h2>
        <p className="text-5xl font-light mt-2">{weatherInfo.temp}</p>
        <p className="text-xl font-medium mt-1">{weatherInfo.date}</p>
        <p className="text-xl font-medium mt-1">{weatherInfo.condition}</p>
        {weatherInfo.src && <img src={weatherInfo.src} alt="Weather Icon" />}
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="font-bold text-2xl mb-4">Recent Searches:</h2>
        <div className="flex gap-4 overflow-x-auto h-44 p-2 bg-gray-100 rounded-lg shadow-inner">
          {recentSearches.length > 0 ? (
            recentSearches.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full min-w-[200px] p-4 rounded shadow-md flex flex-col items-center justify-between text-white"
              >
                <p className="text-xl font-bold">{item.search}</p>
                <img src={item.icon} alt="Icon" className="w-12 h-12" />
                <p>{item.tempe}°C</p>
                <button
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 mt-2"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No recent searches found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default InputFile;
