import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointmentsPerMonth } from '../slices/statsSlices';
import { ScrollView, Dimensions } from 'react-native';
import Spacer from '../../../components/utils/Spacer';
import Picker from '../../../components/utils/Picker';
import { Title, BarChart, PieChart } from '../styles/statsStyles';

const screenWidth = Dimensions.get('window').width - 32;

export default function Charts({ numOfMonths, setNumOfMonths }) {
  const dispatch = useDispatch();
  const { charts } = useSelector((state) => state.stats);
  const [barChartWidth, setBarChartWidth] = useState(screenWidth);
  const [pieChartWidth] = useState(screenWidth * 1.3);

  const monthsRange = [
    { label: 'Last 3 months', value: 3 },
    { label: 'Last 6 months', value: 6 },
    { label: 'Last 9 months', value: 9 },
    { label: 'Last 12 months', value: 12 },
  ];

  const handleMonthsRangeSelected = async (value) => {
    setBarChartWidth(value < 9 ? screenWidth : screenWidth * 2);
    setNumOfMonths(value);
    dispatch(getAppointmentsPerMonth(value));
  };

  return (
    <>
      <Title>Appointments Per Month</Title>
      <Spacer>
        <Picker
          placeholder={{
            label: 'Choose a range of months...',
            value: null,
            color: 'black',
          }}
          items={monthsRange}
          onValueChange={handleMonthsRangeSelected}
          value={numOfMonths}
        />
      </Spacer>

      {charts && (
        <ScrollView horizontal={true}>
          <BarChart width={barChartWidth} data={charts.appointmentsPerMonth} />
        </ScrollView>
      )}
      <Title>Appointmens By Fault Type</Title>
      {charts && (
        <ScrollView horizontal={true}>
          <PieChart
            data={charts.expertiseUsage}
            width={pieChartWidth}
            accessor='numOfTimes'
          />
        </ScrollView>
      )}
    </>
  );
}
