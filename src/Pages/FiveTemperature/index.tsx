import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardWeather from '../../components/CardWeather';
import { Container } from './styles';
import useOpenWeather, {
  IWeatherDetail,
  IOpenWeather,
} from '../../hooks/useOpenWeather';

const FiveTemperature: React.FC = () => {
  const [data, setData] = useState<IOpenWeather>({ list: [] });
  const [weatherFull, setWeatherFull] = useState<IOpenWeather>({ list: [] });
  const { loading, weatherData, fakeData } = useOpenWeather();
  const history = useHistory();

  useEffect(() => {
    if (weatherData) {
      const newData: IWeatherDetail[] = [];
      weatherData.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (
          newData &&
          newData.length < 5 &&
          !newData.find(n => n.dt_txt === date)
        ) {
          newData.push({
            ...item,
            dt_txt: date,
          });
        }
      });
      setData({ list: newData });
      setWeatherFull({ list: weatherData.list });
    }
  }, [weatherData]);

  const handleClick = (day: string) => {
    const dataWeekSelected = data?.list.map(item => {
      item.selected = false;
      if (item.dt_txt === day) {
        item.selected = true;
      }
      return item;
    });
    if (dataWeekSelected) {
      setData({ list: dataWeekSelected });
    }
    const weekDay = weatherFull?.list.filter(
      w => w.dt_txt.split(' ')[0] === day,
    );
    if (weekDay) {
      history.push(`/dayofweek/${day}`, {
        weekDay,
      });
    }
  };

  const renderWeatherDays = (weatherDetail: IWeatherDetail) => {
    return (
      <div
        key={weatherDetail.dt_txt}
        onKeyPress={() => handleClick(weatherDetail.dt_txt)}
        onClick={() => handleClick(weatherDetail.dt_txt)}
        role="button"
        tabIndex={0}
      >
        <CardWeather
          key={weatherDetail.dt_txt}
          selected={weatherDetail.selected}
          date={weatherDetail.dt_txt}
          maxTemp={weatherDetail.main.temp_max}
          minTemp={weatherDetail.main.temp_min}
          iconSource={{
            uri: `http://openweathermap.org/img/wn/${weatherDetail.transformedWeather.icon}@2x.png`,
          }}
        />
      </div>
    );
  };
  return loading ? (
    <Container>{fakeData?.map(item => renderWeatherDays(item))}</Container>
  ) : (
    <Container>{data?.list.map(item => renderWeatherDays(item))}</Container>
  );
};

export default FiveTemperature;
