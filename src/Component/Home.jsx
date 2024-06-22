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
        className={`${className} relative h-[100vh] w-full overflow-y-scroll bg-gradient-to-tl from-[#47BFDF] to-[#4a91ff]`}
      >
        <div className="container">
          <div className="rounded-2xl px-4 pb-10 pt-10 lg:px-8">
            {/* ======= Error page ======== */}
            {weatherData.error && (
              <div className="fixed left-0 top-0 z-[999] h-full w-full backdrop-blur-sm">
                <div className="relative left-0 top-0 z-[999] h-full w-full bg-[#ffffff27] backdrop-blur-lg">
                  <div className="absolute left-[50%] top-[50%] flex w-full -translate-x-[50%] -translate-y-[50%] flex-col items-center justify-center">
                    <img src={error} alt="" className="w-[300px]" />
                    <p className="font-overpass text-lg font-medium capitalize text-black">
                      No matching location found!
                    </p>
                    <div
                      className="mt-4 cursor-pointer rounded-md bg-white px-7 py-3 transition-transform hover:scale-105 active:scale-95"
                      onClick={() => window.location.reload()}
                    >
                      <p className="text-md cursor-pointer font-overpass font-semibold leading-none">
                        Try again
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ====== Loading page ======== */}
            {loading && (
              <div className="fixed left-0 top-0 z-[999] h-full w-full backdrop-blur-sm">
                <div className="relative left-0 top-0 z-[999] h-full w-full bg-[#ffffff1c] backdrop-blur-sm">
                  <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
                    <div class="h-14 w-14 animate-spin rounded-full border-[6px] border-dashed border-blue-600"></div>
                  </div>
                </div>
              </div>
            )}

            {/* ======== Header =========== */}
            <div className="flex items-center justify-between">
              <div
                className="flex cursor-pointer items-center gap-x-3 text-white"
                onClick={HandleSearch}
              >
                <FaLocationArrow className="text-2xl md:text-3xl" />
                <h3 className="text-shadow font-overpass text-2xl font-bold capitalize leading-none md:text-3xl">
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
                className={`relative cursor-pointer after:absolute after:right-0 after:top-0 after:z-50 after:h-2 after:w-2 after:rounded-full ${
                  weatherData.alerts > 0 && "after:bg-red-600"
                }`}
              >
                <IoMdNotificationsOutline className="text-2xl text-white md:text-4xl" />
              </div>
            </div>
            <div
              className={`relative ${
                loading ? "hidden" : weatherData.location && "block"
              }`}
            >
              <div
                className={`mt-2 w-full ${
                  isopen
                    ? "scale-x-100 transition-transform"
                    : "scale-x-0 transition-transform"
                }`}
              >
                <input
                  type="text"
                  className="w-full rounded-2xl px-6 py-2 font-overpass font-medium"
                  placeholder="Search here"
                  onChange={handleInput}
                />
                <div
                  className="absolute right-1 top-[50%] -translate-y-[50%] cursor-pointer rounded-2xl bg-[#48aaee] px-4 py-[5px] text-xl text-white hover:bg-[#519ed4]"
                  onClick={HandleSerach}
                >
                  <FaSearchLocation />
                </div>
              </div>
            </div>

            <div>
              {/* =============== current =================== */}
              <div className="flex flex-col items-center gap-x-10 sm:flex-row">
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
                                  : weatherData.current.condition.text ==
                                      "Overcast"
                                    ? overCast
                                    : weatherData.current.condition.text ==
                                        "Cloudy"
                                      ? cloudy
                                      : weatherData.current.condition.text ==
                                          "Clear"
                                        ? sunny
                                        : weatherData.current.condition.text ==
                                            "Moderate rain"
                                          ? lightRain
                                          : weatherData.current.condition
                                                .text == "Patchy light drizzle"
                                            ? lightRain
                                            : weatherData.current.condition
                                                  .text == "Light rain shower"
                                              ? lightRain
                                              : weatherData.current.condition
                                                    .text == "Patchy light rain"
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
                <div className="mt-8 flex w-full overflow-hidden rounded-[20px] border-[3px] border-[#ffffff71] bg-[#ffffff63] px-8 py-5 backdrop-blur-lg lg:w-auto">
                  <div className="flex flex-col sm:flex-row">
                    {" "}
                    <div>
                      <h3 className="text-shadow font-overpass text-base font-normal text-white lg:text-[18px]">
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
                        className="mt-5 font-overpass text-[60px] font-normal text-white md:text-[70px] lg:text-[100px]"
                      >
                        {Math.floor(
                          weatherData.current
                            ? weatherData.current.temp_c
                            : "29",
                        )}
                        °
                      </h2>
                    </div>
                    <div className="pl-10">
                      <h5 className="text-shadow w-[292px] overflow-hidden text-ellipsis whitespace-nowrap text-center font-overpass text-lg font-bold text-white sm:text-start lg:text-2xl">
                        {weatherData.current
                          ? weatherData.current.condition.text
                          : "Cloudy"}
                      </h5>
                      <div className="flex flex-col gap-y-5 pt-4">
                        <div className="flex items-center gap-x-4">
                          <div className="flex items-center gap-x-3">
                            <img src={wind} alt="" />
                            <p className="text-shadow font-overpass text-base font-normal text-white lg:text-[18px]">
                              Wind
                            </p>
                          </div>
                          <div className="box-shadow h-[15px] w-[2px] bg-white"></div>
                          <div>
                            <p className="text-shadow flex items-center gap-x-1 font-overpass text-base font-normal text-white lg:text-[18px]">
                              {Math.floor(
                                weatherData.current
                                  ? weatherData.current.wind_kph
                                  : "10",
                              )}
                              <span>km/h</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-x-4">
                          <div className="flex items-center gap-x-3">
                            <img src={hum} alt="" />
                            <p className="text-shadow font-overpass text-base font-normal text-white lg:text-[18px]">
                              Hum
                            </p>
                          </div>
                          <div className="box-shadow h-[15px] w-[2px] bg-white"></div>
                          <div>
                            <p className="text-shadow flex items-center gap-x-1 font-overpass text-base font-normal text-white lg:text-[18px]">
                              {Math.floor(
                                weatherData.current
                                  ? weatherData.current.humidity
                                  : "10",
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
                      <div className="container mt-10 flex flex-col items-center">
                        <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-tl from-[#47BFDF] to-[#4a91ff] px-8 py-4 shadow-inner md:py-7">
                          {/* ========== */}

                          {/* ==== Forecast details ===== */}
                          <div>
                            <div className="flex items-center justify-between py-5">
                              <div>
                                <h4 className="text-shadow font-overpass text-lg font-black text-white md:text-2xl">
                                  Today
                                </h4>
                              </div>
                              <div>
                                <h4 className="text-shadow flex items-center font-overpass text-lg font-normal text-white md:text-2xl">
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
                                                      : time.getMonth() + 1 ==
                                                          11
                                                        ? "November"
                                                        : time.getMonth() + 1 ==
                                                            12
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
                                        <h5 className="text-shadow font-overpass text-base font-normal leading-none text-white md:text-[18px]">
                                          {Math.round(
                                            item ? item.temp_c : "29°C",
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
                                                      : item.condition.text ==
                                                          "Clear"
                                                        ? sunny
                                                        : item.condition.text ==
                                                            "Moderate or heavy rain with thunder"
                                                          ? heavyRain
                                                          : item.condition
                                                                .text == "Sunny"
                                                            ? sunny
                                                            : item.condition
                                                                  .text ==
                                                                "Moderate rain"
                                                              ? lightRain
                                                              : item.condition
                                                                    .text ==
                                                                  "Patchy light drizzle"
                                                                ? lightRain
                                                                : item.condition
                                                                      .text ==
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
                                        <h4 className="text-shadow font-overpass text-base font-normal text-white md:text-[18px]">
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
              <div className="mt-10 rounded-2xl border-4 border-[#ffffff46] px-6 py-4 shadow-xl">
                <div className="container">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-overpass text-xl font-black text-white md:text-3xl">
                        Next Forecast
                      </h4>
                      <SlCalender className="text-xl text-white md:text-3xl" />
                    </div>
                    <div className="flex flex-col gap-y-3 pt-5">
                      {data.forecast ? (
                        data.forecast.forecastday
                          .slice(1, data.forecast.lenght)
                          .map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between font-overpass text-lg font-bold text-white md:text-2xl"
                            >
                              <h4 className="flex items-center gap-x-2 overflow-hidden text-ellipsis whitespace-nowrap md:w-[190px]">
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
                              <div className="hidden items-center gap-x-1 md:flex">
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
                                          : item.day.condition.text ==
                                              "Overcast"
                                            ? overCast
                                            : item.day.condition.text == "Clear"
                                              ? sunny
                                              : item.day.condition.text ==
                                                  "Moderate or heavy rain with thunder"
                                                ? heavyRain
                                                : item.day.condition.text ==
                                                    "Sunny"
                                                  ? sunny
                                                  : item.day.condition.text ==
                                                      "Moderate rain"
                                                    ? lightRain
                                                    : item.day.condition.text ==
                                                        "Patchy light drizzle"
                                                      ? lightRain
                                                      : item.day.condition
                                                            .text ==
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
                              <div className="hidden items-center gap-x-1 md:flex">
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
                          <div className="flex items-center justify-between font-overpass font-bold text-white">
                            <h4 className="flex w-[120px] items-center gap-x-2 overflow-hidden text-ellipsis whitespace-nowrap md:w-[190px]">
                              January, 21
                            </h4>
                            <div className="hidden items-center gap-x-1 md:flex">
                              <img src={hum} alt="" />
                              <span>75%</span>
                            </div>
                            <img src={cloudy} alt="" className="w-9 md:w-14" />
                            <div className="hidden items-center gap-x-1 md:flex">
                              <img src={wind} alt="" />
                              <span>15km/h</span>
                            </div>
                            <h5 className="font-normal">21°</h5>
                          </div>
                          <div className="flex items-center justify-between font-overpass font-bold text-white">
                            <h4 className="flex w-[120px] items-center gap-x-2 overflow-hidden text-ellipsis whitespace-nowrap md:w-[190px]">
                              February, 12
                            </h4>
                            <div className="hidden items-center gap-x-1 md:flex">
                              <img src={hum} alt="" />
                              <span>60%</span>
                            </div>
                            <img src={cloudy} alt="" className="w-9 md:w-14" />
                            <div className="hidden items-center gap-x-1 md:flex">
                              <img src={wind} alt="" />
                              <span>12km/h</span>
                            </div>
                            <h5 className="font-normal">21°</h5>
                          </div>
                          <div className="flex items-center justify-between font-overpass font-bold text-white">
                            <h4 className="flex w-[120px] items-center gap-x-2 overflow-hidden text-ellipsis whitespace-nowrap md:w-[190px]">
                              March, 15
                            </h4>
                            <div className="hidden items-center gap-x-1 md:flex">
                              <img src={hum} alt="" />
                              <span>95%</span>
                            </div>
                            <img src={cloudy} alt="" className="w-9 md:w-14" />
                            <div className="hidden items-center gap-x-1 md:flex">
                              <img src={wind} alt="" />
                              <span>35km/h</span>
                            </div>
                            <h5 className="font-normal">21°</h5>
                          </div>
                          <div className="flex items-center justify-between font-overpass font-bold text-white">
                            <h4 className="flex w-[120px] items-center gap-x-2 overflow-hidden text-ellipsis whitespace-nowrap md:w-[190px]">
                              April, 26
                            </h4>
                            <div className="hidden items-center gap-x-1 md:flex">
                              <img src={hum} alt="" />
                              <span>55%</span>
                            </div>
                            <img src={cloudy} alt="" className="w-9 md:w-14" />
                            <div className="hidden items-center gap-x-1 md:flex">
                              <img src={wind} alt="" />
                              <span>08km/h</span>
                            </div>
                            <h5 className="font-normal">21°</h5>
                          </div>
                          <div className="flex items-center justify-between font-overpass font-bold text-white">
                            <h4 className="flex w-[120px] items-center gap-x-2 overflow-hidden text-ellipsis whitespace-nowrap md:w-[190px]">
                              May, 08
                            </h4>
                            <div className="hidden items-center gap-x-1 md:flex">
                              <img src={hum} alt="" />
                              <span>25%</span>
                            </div>
                            <img src={cloudy} alt="" className="w-9 md:w-14" />
                            <div className="hidden items-center gap-x-1 md:flex">
                              <img src={wind} alt="" />
                              <span>30km/h</span>
                            </div>
                            <h5 className="font-normal">21°</h5>
                          </div>
                          <div className="flex items-center justify-between font-overpass font-bold text-white">
                            <h4 className="flex w-[120px] items-center gap-x-2 overflow-hidden text-ellipsis whitespace-nowrap md:w-[190px]">
                              June, 25
                            </h4>
                            <div className="hidden items-center gap-x-1 md:flex">
                              <img src={hum} alt="" />
                              <span>60%</span>
                            </div>
                            <img src={cloudy} alt="" className="w-9 md:w-14" />
                            <div className="hidden items-center gap-x-1 md:flex">
                              <img src={wind} alt="" />
                              <span>10km/h</span>
                            </div>
                            <h5 className="font-normal">21°</h5>
                          </div>
                          <div className="flex items-center justify-between font-overpass font-bold text-white">
                            <h4 className="flex w-[120px] items-center gap-x-2 overflow-hidden text-ellipsis whitespace-nowrap md:w-[190px]">
                              July, 29
                            </h4>
                            <div className="hidden items-center gap-x-1 md:flex">
                              <img src={hum} alt="" />
                              <span>40%</span>
                            </div>
                            <img src={cloudy} alt="" className="w-9 md:w-14" />
                            <div className="hidden items-center gap-x-1 md:flex">
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
