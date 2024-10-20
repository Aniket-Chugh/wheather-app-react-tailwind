import { useState } from "react";

async function fetchFun(location) {
  const url = `https://api.weatherapi.com/v1/current.json?key=ab844ace4aaf4d6f992160138241509&q=${location}&aqi=no`;

  try {
    const rawData = await fetch(url);

    if (rawData.status === 400) {
      alert("Location is invalid.");
      return null;
    } else if (rawData.status === 404) {
      alert("Data not found.");
      return null;
    }

    const json = await rawData.json();
    return json;

  } catch (error) {
    console.error("API request failed:", error);
    alert("Something went wrong with the API request.");
    return null;
  }
}

function MainContent() {
  const [state, setState] = useState("");
  const [WhetherObj, setWheatherObj] = useState({
    temp: "--",
    location: "--",
    time: "--",
    condition: "--",
    date: "--",
    src: "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg",
  });

  const ValueChange = (e) => {
    setState(e.target.value);
  };

  const HandleClick = async () => {
    if (state !== "") {
      const data = await fetchFun(state);

      if (!data) return;

      const tempc = data.current.temp_c;
      const name = data.location.name;
      const localtime = data.location.localtime;
      const [date, time] = localtime.split(" ");
      const Conditions = data.current.condition.text;
      const imgs = data.current.condition.icon;

      let newObj = {
        temp: tempc,
        location: name,
        date: date,
        time: time,
        condition: Conditions,
        src: imgs,
      };

      setWheatherObj(newObj);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center p-5 ">
        <div className="rounded-lg bg-gray-200 p-5 w-">
          <div className="flex">
            <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="pointer-events-none absolute w-5 fill-gray-500 transition"
              >
                <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
              </svg>
            </div>
            <input
              type="text"
              className="w-full max-w-[160px] bg-white pl-2 text-base font-semibold outline-0"
              placeholder="Enter location"
              value={state}
              onChange={ValueChange}
            />
            <input
              onClick={HandleClick}
              type="button"
              value="Search"
              className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 md:gap-10 lg:gap-20 mt-20">
        <div>
          <h2 className="text-2xl">{WhetherObj.temp}°C</h2>
        </div>
        <div>
          <h1 className="text-4xl">{WhetherObj.location}</h1>
          <div className="flex justify-center items-center mt-2">
            <h3>{WhetherObj.time}</h3>
            <h3>{WhetherObj.date}</h3>
          </div>
        </div>
        <div>
          <img
            className="h-16 w-16"
            src={WhetherObj.src}
            alt="weather Update"
          />
          <h4 className="text-3xl mt-2">{WhetherObj.condition}</h4>
        </div>
      </div>
    </>
  );
}

export default MainContent;
