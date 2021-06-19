import styled, { css } from 'styled-components';

interface ICardWeather {
  selected?: boolean;
}

export const Container = styled.div<ICardWeather>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  border-radius: 6px;
  ${props =>
    props.selected &&
    css`
      background-color: #e1e1e1;
    `}
  padding:10px;
`;

export const Weekday = styled.span`
  text-align: center;
  font-size: 12px;
  color: #808080;
`;

export const WeatherImage = styled.img`
  width: 50px;
  height: 50px;
`;

export const TemperatureContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  align-content: center;
`;

export const MaxTemperature = styled.span`
  font-size: 14px;
  color: #000000;
  margin-right: 2px;
`;

export const MinTemperature = styled.span`
  font-size: 14px;
  color: #808080;
`;
