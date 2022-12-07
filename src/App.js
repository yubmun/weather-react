import React, { useEffect, useState } from "react";
import api from './api/axios';
import "./app.css";

function App() {

  const [data, setData] = useState(null)
  const [main, setMain] = useState(null);
  const [location, setLocation] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [city, setCity] = useState("seoul");

  useEffect(() => {
      const fetchData = async () => {
        //Read Data
        try{
          const res = await api.get(`/weather?q=seoul&appid=${process.env.REACT_APP_API_KEY}`);
          // env에 있는 api key 를 가져오려면 반드시, 문장 앞에 REACT_APP_ 이 들어가야 한다. 아니면 오류가 발생!
          setData(res.data);
          setMain(res.data.main);
          setLocation({
            city: res.data.name,
            country: res.data.sys.country,
          });
          setWeatherInfo(res.data.weather[0]);

          if(!!data){
            console.log(data);
            console.log(main);
            console.log(location);
            console.log(weatherInfo);
          }

        } catch (error) {
          if(error.rsponse){
            //응답 코드가 2xx가 아닌 경우
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else {
            console.log(`Error: ${error.message}`);
          }
        }
      }
      fetchData();
  }, [])
  return (
<article id="weather_info">
      <h1 className="city">Seoul / KR</h1>
      <section>
        <h2 className="weather_condition">Clear</h2>
        <figure className="icon"></figure>
      </section>
      <section>
        <h2>현재 온도</h2>
        <div className="cont_temp">
          <strong className="temp">0</strong>
          <div>
            <span className="temp_min">최저 : 0</span>
            <span className="temp_max">최대 : 0</span>
          </div>
        </div>
      </section>
      <img className="load_img" src="images/loading.gif" alt="" />
    </article>
  );
}
export default App;
