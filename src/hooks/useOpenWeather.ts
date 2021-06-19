import { useState, useEffect } from 'react';
import fakeData from './fakeData.js';
import realData from './realData.js';

interface ICoordinate {
  lat: number;
  lon: number;
}

type IMain = {
  temp_min: number;
  temp_max: number;
};

type IWeatherIcon = {
  icon: string;
  description: string;
};
export interface IWeatherDetail {
  selected: boolean;
  main: IMain;
  weather: IWeatherIcon[];
  transformedWeather: IWeatherIcon;
  dt_txt: string;
}
export interface IOpenWeather {
  list: IWeatherDetail[];
}

const useOpenWeather = (): any => {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<IOpenWeather>();
  const [coordinates, setCoordinates] = useState<ICoordinate>();

  useEffect(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      info =>
        setCoordinates({
          lon: info.coords.longitude,
          lat: info.coords.latitude,
        }),
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  useEffect(() => {
    const getForeCastData = async () => {
      if (coordinates) {
        // const response = await api.get<IOpenWeather>(
        //   `/forecast?lat=${coordinates?.lat}&lon=${coordinates?.lon}&units=imperial`,
        // );
        const response = {
          data: {
            list: realData,
          },
        };

        const data = response.data.list.map(item => ({
          ...item,
          transformedWeather: item.weather[0],
          selected: false,
        }));

        setWeatherData({ list: data });
        setLoading(false);
      }
    };

    getForeCastData();
  }, [coordinates]);

  return { loading, weatherData, fakeData };
};

export default useOpenWeather;
