import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
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
import overCast from "../assets/overcast.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlCalender } from "react-icons/sl";

// Import Swiper styles
import "swiper/css";

const Home = ({ handleInput, data, loading, HandleSerach, className }) => {
  const [isopen, setisopen] = useState(false);
  const [weatherData, setweatherData] = useState({});
  const [date, setdate] = useState();
  const [current, setcurrent] = useState({});

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

  useEffect(() => {
    if (!loading && data.forecast) {
      setcurrent(data.forecast.forecastday[0]);
    }
  }, [data]);

  // get month && Date
  useEffect(() => {
    data.forecast &&
      data.forecast.forecastday.map((item) => {
        const dates = new Date(item.date && item.date);
        if (item) {
          setdate(dates.getMonth());
        }
      });
  }, [data]);

  return (
    <>
      <div
        className={`${className} relative w-full h-[100vh] overflow-y-scroll  bg-gradient-to-tl from-[#47BFDF] to-[#4a91ff]`}
      >
        <div className="container">
          <div className=" pt-10 pb-10 px-4 lg:px-8 rounded-2xl">
            {/* ======= Error page ======== */}
            {weatherData.error && (
              <div className="backdrop-blur-sm w-full h-full fixed top-0 left-0 z-[999]">
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

            {/* ====== Loading page ======== */}
            {loading && (
              <div className="backdrop-blur-sm w-full h-full fixed top-0 left-0 z-[999]">
                <div className="bg-[#ffffff1c] backdrop-blur-sm w-full h-full relative top-0 left-0 z-[999]">
                  <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                    <div class="w-14 h-14 border-[6px] border-dashed rounded-full animate-spin border-blue-600"></div>
                  </div>
                </div>
              </div>
            )}

            {/* ======== Header =========== */}
            <div className="flex items-center justify-between">
              <div
                className="flex items-center gap-x-3 text-white cursor-pointer"
                onClick={HandleSearch}
              >
                <FaLocationArrow className="text-2xl md:text-3xl" />
                <h3
                  className="text-2xl md:text-3xl font-overpass capitalize
                 font-bold text-shadow leading-none"
                >
                  {weatherData.location ? weatherData.location.name : "London"}
                </h3>
                <MdKeyboardArrowDown
                  className={`text-2xl md:text-3xl ${
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
                <IoMdNotificationsOutline className="text-white text-2xl md:text-4xl" />
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
                  className="w-full py-2 px-6 rounded-2xl font-overpass font-medium"
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
            </div>

            <div>
              {/* =============== current =================== */}
              <div className="flex items-center flex-col sm:flex-row gap-x-10">
                <div className="flex items-center">
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
                          : weatherData.current.condition.text == "Overcast"
                          ? overCast
                          : weatherData.current.condition.text == "Cloudy"
                          ? cloudy
                          : weatherData.current.condition.text == "Clear"
                          ? sunny
                          : weatherData.current.condition.text ==
                            "Moderate rain"
                          ? lightRain
                          : weatherData.current.condition.text ==
                            "Patchy light drizzle"
                          ? lightRain
                          : weatherData.current.condition.text ==
                            "Light rain shower"
                          ? lightRain
                          : weatherData.current.condition.text ==
                            "Patchy light rain"
                          ? lightRain
                          : cloudy
                      }
                      alt={cloudy}
                      className="w-[100px] sm:w-[140px] lg:w-[180px]"
                    />
                  ) : (
                    <img
                      src={cloudy}
                      alt={cloudy}
                      className="w-[100px] sm:w-[140px] lg:w-[180px]"
                    />
                  )}
                </div>
                <div className="py-5 px-8 bg-[#ffffff63] overflow-hidden w-full lg:w-auto backdrop-blur-lg rounded-[20px] border-[3px] flex  border-[#ffffff71] mt-8">
                  <div className="flex flex-col sm:flex-row">
                    {" "}
                    <div>
                      <h3 className="text-base lg:text-[18px] font-overpass font-normal text-shadow text-white">
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
                        className="text-[60px] md:text-[70px] lg:text-[100px] font-overpass font-normal text-white mt-5"
                      >
                        {Math.floor(
                          weatherData.current
                            ? weatherData.current.temp_c
                            : "29"
                        )}
                        °
                      </h2>
                    </div>
                    <div className="pl-10">
                      <h5
                        className="text-lg lg:text-2xl text-center sm:text-start font-overpass font-bold text-white text-shadow w-[292px] whitespace-nowrap text-ellipsis overflow-hidden
                "
                      >
                        {weatherData.current
                          ? weatherData.current.condition.text
                          : "Cloudy"}
                      </h5>
                      <div className="pt-4 flex flex-col gap-y-5">
                        <div className="flex items-center gap-x-4">
                          <div className="flex items-center gap-x-3">
                            <img src={wind} alt="" />
                            <p className="text-base lg:text-[18px] font-overpass font-normal text-white text-shadow">
                              Wind
                            </p>
                          </div>
                          <div className="h-[15px] w-[2px] bg-white box-shadow"></div>
                          <div>
                            <p className="text-base lg:text-[18px] flex items-center gap-x-1 font-overpass font-normal text-white text-shadow">
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
                            <p className="text-base lg:text-[18px] font-overpass font-normal text-white text-shadow">
                              Hum
                            </p>
                          </div>
                          <div className="h-[15px] w-[2px] bg-white box-shadow"></div>
                          <div>
                            <p className="text-base lg:text-[18px] flex items-center gap-x-1 font-overpass font-normal text-white text-shadow">
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
                  </div>
                </div>
              </div>

              {/* ======================== */}
              <div className={`${className}`}>
                <div className="container">
                  {data.location && (
                    <div>
                      <div className="container flex flex-col items-center mt-10">
                        <div className="relative py-4 md:py-7  shadow-inner px-8 overflow-hidden w-full bg-gradient-to-tl from-[#47BFDF] to-[#4a91ff] rounded-2xl">
                          {/* ========== */}

                          {/* ==== Forecast details ===== */}
                          <div>
                            <div className="flex items-center justify-between py-5">
                              <div>
                                <h4 className="text-lg md:text-2xl font-overpass font-black text-white text-shadow">
                                  Today
                                </h4>
                              </div>
                              <div>
                                <h4 className="text-lg md:text-2xl font-overpass font-normal flex items-center text-white text-shadow">
                                  {data && time.getMonth() + 1 == 1
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
                                  , {time.getDate() ? time.getDate() : "12"}
                                </h4>
                              </div>
                            </div>
                            <div>
                              <Swiper
                                className="mySwiper"
                                slidesPerView={8}
                                spaceBetween={30}
                                breakpoints={{
                                  290: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                  },
                                  375: {
                                    slidesPerView: 4,
                                    spaceBetween: 40,
                                  },
                                  1024: {
                                    slidesPerView: 5,
                                    spaceBetween: 50,
                                  },
                                }}
                              >
                                {current.hour
                                  ?.slice(1, current.lenght)
                                  .map((item) => (
                                    <SwiperSlide>
                                      {" "}
                                      <div className="flex flex-col items-center gap-y-1">
                                        <h5 className="leading-none text-base md:text-[18px] font-overpass font-normal text-white text-shadow">
                                          {Math.round(
                                            item ? item.temp_c : "29°C"
                                          )}
                                          °C
                                        </h5>
                                        {item ? (
                                          <img
                                            src={
                                              item.condition.text == "Cloudy"
                                                ? cloudy
                                                : item.condition.text ==
                                                  "Patchy rain nearby"
                                                ? patchyRain
                                                : item.condition.text ==
                                                  "Partly Cloudy"
                                                ? partyCloudy
                                                : item.condition.text ==
                                                  "Overcast"
                                                ? overCast
                                                : item.condition.text == "Clear"
                                                ? sunny
                                                : item.condition.text ==
                                                  "Moderate or heavy rain with thunder"
                                                ? heavyRain
                                                : item.condition.text == "Sunny"
                                                ? sunny
                                                : item.condition.text ==
                                                  "Moderate rain"
                                                ? lightRain
                                                : item.condition.text ==
                                                  "Patchy light drizzle"
                                                ? lightRain
                                                : item.condition.text ==
                                                  "Patchy light rain"
                                                ? lightRain
                                                : cloudy
                                            }
                                            alt={cloudy}
                                            className="w-[35px]"
                                          />
                                        ) : (
                                          <img
                                            src={cloudy}
                                            alt={cloudy}
                                            className="w-[35px]"
                                          />
                                        )}
                                        <h4 className="text-base md:text-[18px] font-overpass font-normal text-white text-shadow">
                                          {item ? item.time.slice(10) : "2.00"}
                                        </h4>
                                      </div>
                                    </SwiperSlide>
                                  ))}
                              </Swiper>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* ======= Next forecast ======== */}
              <div className="mt-10 border-4 shadow-xl border-[#ffffff46] py-4 px-6 rounded-2xl">
                <div className="container">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl md:text-3xl font-overpass font-black text-white">
                        Next Forecast
                      </h4>
                      <SlCalender className="text-white text-xl md:text-3xl" />
                    </div>
                    <div className="pt-5 flex flex-col gap-y-3">
                      {data.forecast ? (
                        data.forecast.forecastday
                          .slice(1, data.forecast.lenght)
                          .map((item, index) => (
                            <div
                              key={index}
                              className="text-white font-bold text-lg md:text-2xl font-overpass flex items-center justify-between"
                            >
                              <h4 className="flex items-center gap-x-2 md:w-[190px] overflow-hidden text-ellipsis whitespace-nowrap">
                                {data.location && date == 1
                                  ? "January"
                                  : date == 2
                                  ? "February"
                                  : date == 3
                                  ? "March"
                                  : date == 4
                                  ? "April"
                                  : date == 5
                                  ? "May"
                                  : date == 6
                                  ? "June"
                                  : date == 7
                                  ? "July"
                                  : date == 8
                                  ? "August"
                                  : date == 9
                                  ? "September"
                                  : date == 10
                                  ? "October"
                                  : date == 11
                                  ? "November"
                                  : date == 12
                                  ? "December"
                                  : "January"}
                                ,<p>{item ? item.date.slice(8, 10) : "12"}</p>
                              </h4>
                              <div className="hidden md:flex items-center gap-x-1">
                                <img src={hum} alt="" />
                                <span>{item && item.day.avghumidity}%</span>
                              </div>
                              {item ? (
                                <img
                                  src={
                                    item.day.condition.text == "Cloudy"
                                      ? cloudy
                                      : item.day.condition.text ==
                                        "Patchy rain nearby"
                                      ? patchyRain
                                      : item.day.condition.text ==
                                        "Partly Cloudy"
                                      ? partyCloudy
                                      : item.day.condition.text == "Overcast"
                                      ? overCast
                                      : item.day.condition.text == "Clear"
                                      ? sunny
                                      : item.day.condition.text ==
                                        "Moderate or heavy rain with thunder"
                                      ? heavyRain
                                      : item.day.condition.text == "Sunny"
                                      ? sunny
                                      : item.day.condition.text ==
                                        "Moderate rain"
                                      ? lightRain
                                      : item.day.condition.text ==
                                        "Patchy light drizzle"
                                      ? lightRain
                                      : item.day.condition.text ==
                                        "Patchy light rain"
                                      ? lightRain
                                      : cloudy
                                  }
                                  alt=""
                                  className="w-9 md:w-14"
                                />
                              ) : (
                                <img src={cloudy} alt="" />
                              )}
                              <div className="hidden md:flex items-center gap-x-1">
                                <img src={wind} alt="" />
                                <span>
                                  {Math.round(item && item.day.maxwind_kph)}km/h
                                </span>
                              </div>
                              <h5 className="font-normal">
                                {Math.round(item ? item.day.avgtemp_c : "21°")}°
                              </h5>
                            </div>
                          ))
                      ) : (
                        <div className="flex flex-col gap-y-3 text-lg md:text-2xl">
                          <div className="text-white font-bold font-overpass flex items-center justify-between">
                            <h4 className="flex items-center gap-x-2 w-[120px] md:w-[190px] overflow-hidden text-ellipsis whitespace-nowrap">
                              January, 21
                            </h4>
                            <div className="hidden md:flex items-center gap-x-1">
                              <img src={hum} alt="" />
                              <span>75%</span>
                            </div>
                            <img src={cloudy} alt="" className="w-9 md:w-14" />
                            <div className="hidden md:flex items-center gap-x-1">
                              <img src={wind} alt="" />
                              <span>15km/h</span>
                            </div>
                            <h5 className="font-normal">21°</h5>
                          </div>
                          <div className="text-white font-bold  font-overpass flex items-center justify-between">
                            <h4 className="flex items-center gap-x-2 w-[120px] md:w-[190px] overflow-hidden text-ellipsis whitespace-nowrap">
                              February, 12
                            </h4>
                            <div className="hidden md:flex items-center gap-x-1">
                              <img src={hum} alt="" />
                              <span>60%</span>
                            </div>
                            <img src={cloudy} alt="" className="w-9 md:w-14" />
                            <div className="hidden md:flex items-center gap-x-1">
                              <img src={wind} alt="" />
                              <span>12km/h</span>
                            </div>
                            <h5 className="font-normal">21°</h5>
                          </div>
                          <div className="text-white font-bold  font-overpass flex items-center justify-between ">
                            <h4 className="flex items-center gap-x-2 w-[120px] md:w-[190px] overflow-hidden text-ellipsis whitespace-nowrap">
                              March, 15
                            </h4>
                            <div className="hidden md:flex items-center gap-x-1">
                              <img src={hum} alt="" />
                              <span>95%</span>
                            </div>
                            <img src={cloudy} alt="" className="w-9 md:w-14" />
                            <div className="hidden md:flex items-center gap-x-1">
                              <img src={wind} alt="" />
                              <span>35km/h</span>
                            </div>
                            <h5 className="font-normal">21°</h5>
                          </div>
                          <div className="text-white font-bold  font-overpass flex items-center justify-between">
                            <h4 className="flex items-center gap-x-2 w-[120px] md:w-[190px] overflow-hidden text-ellipsis whitespace-nowrap">
                              April, 26
                            </h4>
                            <div className="hidden md:flex items-center gap-x-1">
                              <img src={hum} alt="" />
                              <span>55%</span>
                            </div>
                            <img src={cloudy} alt="" className="w-9 md:w-14" />
                            <div className="hidden md:flex items-center gap-x-1">
                              <img src={wind} alt="" />
                              <span>08km/h</span>
                            </div>
                            <h5 className="font-normal">21°</h5>
                          </div>
                          <div className="text-white font-bold  font-overpass flex items-center justify-between">
                            <h4 className="flex items-center gap-x-2 w-[120px] md:w-[190px] overflow-hidden text-ellipsis whitespace-nowrap">
                              May, 08
                            </h4>
                            <div className="hidden md:flex items-center gap-x-1">
                              <img src={hum} alt="" />
                              <span>25%</span>
                            </div>
                            <img src={cloudy} alt="" className="w-9 md:w-14" />
                            <div className="hidden md:flex items-center gap-x-1">
                              <img src={wind} alt="" />
                              <span>30km/h</span>
                            </div>
                            <h5 className="font-normal">21°</h5>
                          </div>
                          <div className="text-white font-bold  font-overpass flex items-center justify-between">
                            <h4 className="flex items-center gap-x-2 w-[120px] md:w-[190px] overflow-hidden text-ellipsis whitespace-nowrap">
                              June, 25
                            </h4>
                            <div className="hidden md:flex items-center gap-x-1">
                              <img src={hum} alt="" />
                              <span>60%</span>
                            </div>
                            <img src={cloudy} alt="" className="w-9 md:w-14" />
                            <div className="hidden md:flex items-center gap-x-1">
                              <img src={wind} alt="" />
                              <span>10km/h</span>
                            </div>
                            <h5 className="font-normal">21°</h5>
                          </div>
                          <div className="text-white font-bold font-overpass flex items-center justify-between">
                            <h4 className="flex items-center gap-x-2 w-[120px] md:w-[190px] overflow-hidden text-ellipsis whitespace-nowrap">
                              July, 29
                            </h4>
                            <div className="hidden md:flex items-center gap-x-1">
                              <img src={hum} alt="" />
                              <span>40%</span>
                            </div>
                            <img src={cloudy} alt="" className="w-9 md:w-14" />
                            <div className="hidden md:flex items-center gap-x-1">
                              <img src={wind} alt="" />
                              <span>65km/h</span>
                            </div>
                            <h5 className="font-normal">21°</h5>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
