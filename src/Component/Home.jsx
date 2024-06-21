import React, { useEffect, useState } from "react";
import { MdOutlineShareLocation, MdKeyboardArrowDown } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa6";
import partyCloudy from "../assets/partly_cloudy.png";
import sunny from "../assets/sunny.png";
import cloudy from "../assets/cloudy.png";
import lightRain from "../assets/light-rain.png";
import patchyRain from "../assets/patchy-rain.png";
import heavyRain from "../assets/heavy-rain.png";
import wind from "../assets/windy.png";
import hum from "../assets/hum.png";
import error from "../assets/error.png";
import mist from "../assets/fog.png";
import { FaSearchLocation } from "react-icons/fa";
import { MdOutlineWrongLocation } from "react-icons/md";

const Home = ({
  handleInput,
  inputvalue,
  data,
  loading,
  HandleSerach,
  handleForeCast,
  className,
  Error,
}) => {
  const [isopen, setisopen] = useState(false);
  const [weatherData, setweatherData] = useState({});

  // Get localTime & Date
  const time = new Date(weatherData.location && weatherData.location.localtime);

  useEffect(() => {
    if (loading) {
      loading;
    } else {
      setweatherData(data);
    }
  }, [data]);

  const HandleSearch = () => {
    setisopen(!isopen);
  };

  return (
    <>
      <div className={`${className}`}>
        <div className="container flex flex-col items-center justify-center h-[100vh]">
          <div className="relative pt-10 pb-10 px-8 overflow-hidden w-[414px] bg-gradient-to-tl from-[#47BFDF] to-[#4a91ff] rounded-2xl">
            {weatherData.error && (
              <div className="backdrop-blur-sm w-full h-full absolute top-0 left-0 z-[999]">
                <div className="bg-[#ffffff27] backdrop-blur-lg w-full h-full relative top-0 left-0 z-[999]">
                  <div className="absolute top-[50%] left-[50%] flex flex-col items-center justify-center w-full -translate-x-[50%] -translate-y-[50%]">
                    <img src={error} alt="" className="w-[300px]" />
                    <p
                      className="text-black font-overpass text-lg font-medium
                    capitalize"
                    >
                      No matching location found!
                    </p>
                    <div
                      className="py-3 px-7 bg-white mt-4 rounded-md cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                      onClick={() => window.location.reload()}
                    >
                      <p className="leading-none text-md font-overpass font-semibold cursor-pointer">
                        Try again
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {loading && (
              <div className="backdrop-blur-sm w-full h-full absolute top-0 left-0 z-[999]">
                <div className="bg-[#ffffff1c] backdrop-blur-sm w-full h-full relative top-0 left-0 z-[999]">
                  <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                    <div class="w-14 h-14 border-[6px] border-dashed rounded-full animate-spin border-blue-600"></div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between ">
              <div
                className="flex items-center gap-x-3 text-white cursor-pointer"
                onClick={HandleSearch}
              >
                <FaLocationArrow className="text-2xl" />
                <h3
                  className="text-2xl font-overpass capitalize
                 font-bold text-shadow leading-none"
                >
                  {weatherData.location ? weatherData.location.name : "London"}
                </h3>
                <MdKeyboardArrowDown
                  className={`text-2xl ${
                    isopen
                      ? "rotate-180 transition-all duration-500"
                      : "rotate-0 transition-all"
                  }`}
                />
              </div>

              <div
                className={`cursor-pointer relative after:absolute after:w-2 after:h-2 after:rounded-full after:top-0 after:right-0 after:z-50 ${
                  weatherData.alerts > 0 && "after:bg-red-600"
                }`}
              >
                <IoMdNotificationsOutline className="text-white text-3xl" />
              </div>
            </div>
            <div
              className={`relative ${
                loading ? "hidden" : weatherData.location && "block"
              }`}
            >
              <div
                className={` w-full mt-2  ${
                  isopen
                    ? "scale-x-100 transition-transform"
                    : "scale-x-0 transition-transform"
                }`}
              >
                <input
                  type="text"
                  className="w-full py-2 px-2 rounded-2xl font-overpass font-medium"
                  placeholder="Search here"
                  onChange={handleInput}
                />
                <div
                  className="absolute top-[50%] bg-[#48aaee] text-white px-4 py-[5px] rounded-2xl hover:bg-[#519ed4] -translate-y-[50%] text-xl right-1 cursor-pointer"
                  onClick={HandleSerach}
                >
                  <FaSearchLocation />
                </div>
              </div>

              {/* <div className={`${inputvalue && closeValue && "hidden"}`}>
                {isopen && (
                  <div onClick={handlehistory}>
                    <div
                      className={`absolute bottom-[-45px] left-0 mt-2 bg-white font-overpass text-base flex items-center justify-between capitalize py-1 w-full px-2 rounded-lg cursor-pointer ${
                        inputvalue
                          ? "scale-100 transition-transform duration-500"
                          : "scale-0 transition-transform duration-500"
                      } `}
                      onClick={HandleHistory}
                    >
                      {inputvalue}
                      <span>
                        <MdOutlineShareLocation className="text-black text-xl" />
                      </span>
                    </div>
                  </div>
                )}
              </div> */}
            </div>

            {/* ======= */}
            <div>
              <div className="flex items-center justify-center">
                {weatherData.current ? (
                  <img
                    src={
                      weatherData.current.condition.text == "Partly cloudy"
                        ? partyCloudy
                        : weatherData.current.condition.text ==
                          "Moderate or heavy rain with thunder"
                        ? heavyRain
                        : weatherData.current.condition.text == "Sunny"
                        ? sunny
                        : weatherData.current.condition.text ==
                          "Patchy rain nearby"
                        ? patchyRain
                        : weatherData.current.condition.text == "Mist"
                        ? mist
                        : cloudy
                    }
                    alt={cloudy}
                    className="w-[180px]"
                  />
                ) : (
                  <img src={cloudy} alt={cloudy} className="w-[200px]" />
                )}
              </div>
              <div className="py-5 w-full bg-[#ffffff63] backdrop-blur-lg rounded-[20px] border-[3px] flex flex-col items-center justify-center border-[#ffffff71] mt-8">
                <h3 className="text-[18px] font-overpass font-normal text-shadow text-white">
                  Today,{" "}
                  <span className="pr-1">
                    {time.getDate() ? time.getDate() : "5"}
                  </span>
                  {weatherData && time.getMonth() + 1 == 1
                    ? "January"
                    : time.getMonth() + 1 == 2
                    ? "February"
                    : time.getMonth() + 1 == 3
                    ? "March"
                    : time.getMonth() + 1 == 4
                    ? "April"
                    : time.getMonth() + 1 == 5
                    ? "May"
                    : time.getMonth() + 1 == 6
                    ? "June"
                    : time.getMonth() + 1 == 7
                    ? "July"
                    : time.getMonth() + 1 == 8
                    ? "August"
                    : time.getMonth() + 1 == 9
                    ? "September"
                    : time.getMonth() + 1 == 10
                    ? "October"
                    : time.getMonth() + 1 == 11
                    ? "November"
                    : time.getMonth() + 1 == 12
                    ? "December"
                    : "January"}
                </h3>
                <h2
                  id="celcious"
                  className="text-[100px] font-overpass font-normal text-white mt-8"
                >
                  {Math.floor(
                    weatherData.current ? weatherData.current.temp_c : "29"
                  )}
                  °
                </h2>
                <h5
                  className="text-2xl font-overpass font-bold text-white text-shadow text-center w-[292px] whitespace-nowrap text-ellipsis overflow-hidden
                "
                >
                  {weatherData.current
                    ? weatherData.current.condition.text
                    : "Cloudy"}
                </h5>
                <div className="pt-7 flex flex-col gap-y-5">
                  <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-3">
                      <img src={wind} alt="" />
                      <p className="text-[18px] font-overpass font-normal text-white text-shadow">
                        Wind
                      </p>
                    </div>
                    <div className="h-[15px] w-[2px] bg-white box-shadow"></div>
                    <div>
                      <p className="text-[18px] flex items-center gap-x-1 font-overpass font-normal text-white text-shadow">
                        {Math.floor(
                          weatherData.current
                            ? weatherData.current.wind_kph
                            : "10"
                        )}
                        <span>km/h</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-3">
                      <img src={hum} alt="" />
                      <p className="text-[18px] font-overpass font-normal text-white text-shadow">
                        Hum
                      </p>
                    </div>
                    <div className="h-[15px] w-[2px] bg-white box-shadow"></div>
                    <div>
                      <p className="text-[18px] flex items-center gap-x-1 font-overpass font-normal text-white text-shadow">
                        {Math.floor(
                          weatherData.current
                            ? weatherData.current.humidity
                            : "10"
                        )}
                        <span>%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex items-center justify-center mt-10"
                onClick={handleForeCast}
              >
                <button
                  className={`py-4 px-6 shadow-inner shadow-[#00000062] relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:shadow-[#00000033] after:rounded-[20px] after:shadow-lg gap-x-2 bg-white flex items-center justify-center text-[#444E72] font-overpass font-normal text-[18px] rounded-[20px] ${
                    !weatherData.location && Error
                      ? "border-red-600 border-[1.5px]"
                      : weatherData.location && ""
                  }`}
                >
                  {!weatherData.location && Error
                    ? "Find your location"
                    : weatherData.location
                    ? "Forecast report"
                    : "Forecast report"}{" "}
                  {!weatherData.location && Error ? (
                    <MdOutlineWrongLocation className="text-2xl text-red-600" />
                  ) : weatherData.location ? (
                    <MdKeyboardArrowDown className="text-2xl" />
                  ) : (
                    <MdKeyboardArrowDown className="text-2xl" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
