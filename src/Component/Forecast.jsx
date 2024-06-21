import React, { useEffect, useState } from "react";
import errorImg from "../assets/error.png";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import cloudyImg from "../assets/cloudy.png";
import clear from "../assets/sunny.png";
import wind from "../assets/windy.png";
import heavyRain from "../assets/heavy-rain.png";
import lightRain from "../assets/light-rain.png";
import partyCloudy from "../assets/partly_cloudy.png";
import patchyRain from "../assets/patchy-rain.png";
import thender from "../assets/thunderstorm.png";
import overCast from "../assets/overcast.png";

const Forecast = ({ className, data, loading, foreCast, inputvalue }) => {
  const [current, setcurrent] = useState({});
  useEffect(() => {
    if (!loading && data.forecast) {
      setcurrent(data.forecast.forecastday[0]);
    }
  }, [data]);

  const time = new Date(current.hour && current.hour[5].time);

  console.log(time.getDate());

  return (
    <>
      <div className={`${className}`}>
        <div className="container">
          <div>
            <div className="container flex flex-col items-center justify-center h-[100vh]">
              <div className="relative pt-10 pb-10 px-8 overflow-hidden w-[414px] bg-gradient-to-tl from-[#47BFDF] to-[#4a91ff] rounded-2xl">
                {data.error && (
                  <div className="backdrop-blur-sm w-full h-full absolute top-0 left-0 z-[999]">
                    <div className="bg-[#ffffff27] backdrop-blur-lg w-full h-full relative top-0 left-0 z-[999]">
                      <div className="absolute top-[50%] left-[50%] flex flex-col items-center justify-center w-full -translate-x-[50%] -translate-y-[50%]">
                        <img src={errorImg} alt="" className="w-[300px]" />
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

                {/* ========== */}
                <div
                  className="cursor-pointer group hover:ml-1 transition-all inline-block"
                  onClick={foreCast}
                >
                  <h5 className="text-2xl font-overpass font-semibold leading-none text-white flex items-center">
                    <span>
                      <MdOutlineKeyboardArrowLeft className="text-3xl group-hover:mr-1 transition-all" />
                    </span>
                    <span className="text-shadow">Back</span>
                  </h5>
                </div>
                {/* ==== Forecast details ===== */}
                <div className="flex items-center justify-between py-10">
                  <div>
                    <h4 className="text-2xl font-overpass font-black text-white text-shadow">
                      Today
                    </h4>
                  </div>
                  <div>
                    <h4 className="text-2xl font-overpass font-normal text-white text-shadow">
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
                <div className="flex items-center justify-between">
                  {current.hour?.slice(1, 6).map((item) => (
                    <div className="flex flex-col items-center gap-y-1">
                      <h5 className="leading-none text-[18px] font-overpass font-normal text-white text-shadow">
                        {Math.round(item ? item.temp_c : "29°C")}°C
                      </h5>
                      {item ? (
                        <img
                          src={
                            item.condition.text == "Cloudy"
                              ? cloudyImg
                              : item.condition.text == "Patchy rain nearby"
                              ? patchyRain
                              : item.condition.text == "Partly Cloudy"
                              ? partyCloudy
                              : item.condition.text == "Overcast"
                              ? overCast
                              : item.condition.text == "Clear"
                              ? clear
                              : cloudyImg
                          }
                          alt=""
                          className="w-[35px]"
                        />
                      ) : (
                        <img src={cloudyImg} alt="" className="w-[35px]" />
                      )}

                      <h4 className="text-[18px] font-overpass font-normal text-white text-shadow">
                        15.00
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forecast;
