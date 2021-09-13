import React from 'react';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import Spacer from '../../../components/utils/Spacer';
import Picker from '../../../components/utils/Picker';
import { Title, BarChart, PieChart } from '../styles/statsStyles';

export default function Charts({
  numOfMonths,
  barChartWidth,
  pieChartWidth,
  handleMonthsRangeSelected,
}) {
  const { charts } = useSelector((state) => state.stats);

  const monthsRange = [
    { label: 'Last 3 months', value: 3 },
    { label: 'Last 6 months', value: 6 },
    { label: 'Last 9 months', value: 9 },
    { label: 'Last 12 months', value: 12 },
  ];

  return (
    <>
      <Title>Appointments Per Month</Title>
      <Spacer>
        <Picker
          items={monthsRange}
          onValueChange={handleMonthsRangeSelected}
          value={numOfMonths}
        />
      </Spacer>

      {charts && (
        <ScrollView horizontal={true}>
          <BarChart
            width={barChartWidth}
            data={charts.appointmentsPerMonth}
            formatYLabel={(num) => Math.floor(num)}
          />
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
