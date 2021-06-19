import React from 'react';
import {
  Container,
  Weekday,
  WeatherImage,
  TemperatureContent,
  MaxTemperature,
  MinTemperature,
} from './styles';

interface CardDetail {
  date: string;
  maxTemp: number;
  minTemp: number;
  iconSource: any;
  selected?: boolean;
}
const CardWeather: React.FC<CardDetail> = ({
  date,
  iconSource,
  maxTemp,
  minTemp,
  selected,
}: CardDetail) => {
  const getDayName = (dateStr: string) => {
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const formatedDate = new Date(`${dateStr}T12:00:00`);
    const day = formatedDate.getDay();

    return weekday[day];
  };
  return (
    <Container selected={selected || false}>
      <Weekday>{getDayName(date)}</Weekday>
      <WeatherImage src={iconSource} />
      <TemperatureContent>
        <MaxTemperature>{maxTemp.toFixed(0)}°</MaxTemperature>
        <MinTemperature>{minTemp.toFixed(0)}°</MinTemperature>
      </TemperatureContent>
    </Container>
  );
};

export default CardWeather;
