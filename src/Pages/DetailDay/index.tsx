import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  MainContainer,
  ScrollViewContainer,
  TitleContent,
  TextContent,
  CardHourContainer,
} from './styles';
import CardWeather from '../../components/CardWeather';
import { IWeatherDetail } from '../../hooks/useOpenWeather';

type param = {
  weekDay: any;
};
const DetailDay: React.FC = () => {
  const location = useLocation<param>();
  const [weekData, setWeekdata] = useState<IWeatherDetail[]>();
  const [weatherTime, setWeatherTime] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('');

  useEffect(() => {
    setWeekdata(location.state.weekDay);
  }, [location.state.weekDay]);

  useEffect(() => {
    if (weekData) {
      setWeatherTime(weekData[0].dt_txt.split(' ')[1]);
      setWeatherCondition(weekData[0].transformedWeather.description);
    }
  }, [weekData]);

  const handleClick = (hour: string) => {
    setWeatherTime(hour.split(' ')[1]);

    weekData?.forEach(item => {
      if (item.dt_txt === hour) {
        setWeatherCondition(item.transformedWeather.description);
      }
    });
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
        <CardHourContainer>
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
          <TextContent>
            {`${weatherDetail.dt_txt.split(' ')[1].split(':')[0]}:00`}
          </TextContent>
        </CardHourContainer>
      </div>
    );
  };
  return (
    <MainContainer>
      <TitleContent>Hour {weatherTime}</TitleContent>
      <TextContent>{weatherCondition}</TextContent>
      <ScrollViewContainer>
        {weekData?.map(item => renderWeatherDays(item))}
      </ScrollViewContainer>
    </MainContainer>
  );
};

export default DetailDay;
