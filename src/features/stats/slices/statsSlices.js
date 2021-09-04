import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { monthNames } from '../../../infrastructure/utils/constants';
import { format } from 'date-fns';
import { ParseError } from '../../../infrastructure/utils/ParseError';

const pieColors = [
  'rgb(255, 173, 173)',
  'rgb(255, 214, 165)',
  'rgb(253, 255, 182)',
  'rgb(202, 255, 191)',
  'rgb(155, 246, 255)',
  'rgb(160, 196, 255)',
  'rgb(189, 178, 255)',
  'rgb(255, 198, 255)',
];

const initialState = {
  charts: null,
  loading: null,
  error: null,
};

export const getChartStats = createAsyncThunk(
  'stats/getChartStats',
  async (numOfMonths = 3, { getState, rejectWithValue }) => {
    try {
      const {
        history: { pastAppointments },
        user: {
          info: { expertise },
        },
      } = getState();

      return {
        appointmentsPerMonth: createAppointmentsPerMonth(
          pastAppointments,
          numOfMonths
        ),
        expertiseUsage: createExpetiseUsage(pastAppointments, expertise),
      };
    } catch (e) {
      throw rejectWithValue(
        new ParseError(
          410,
          'Unable to show your statistics,\n please try to refresh'
        )
      );
    }
  }
);

function createExpetiseUsage(pastAppointments, expertiseArr) {
  const expertiseCountArr = createExpertiseCountArr(
    pastAppointments,
    expertiseArr
  );
  return expertiseArr.map((type, index) => {
    return {
      name: type,
      numOfTimes: expertiseCountArr[index],
      color: pieColors[index % pieColors.length],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    };
  });
}

function createExpertiseCountArr(pastAppointments, expertiseArr) {
  let expertiseCountArr = new Array(expertiseArr.length).fill(0);
  pastAppointments.forEach((appointment) => {
    const splitTitle = appointment.title.split(' ');
    const faultType =
      splitTitle.length === 4
        ? `${appointment.title.split(' ')[1]} ${
            appointment.title.split(' ')[2]
          }`
        : appointment.title.split(' ')[1];
    const expertiseIndex = expertiseArr.indexOf(faultType);
    if (expertiseIndex !== -1) {
      expertiseCountArr[expertiseIndex] = expertiseCountArr[expertiseIndex] + 1;
    }
  });
  return expertiseCountArr;
}

function createAppointmentsPerMonth(pastAppointments, numOfMonths) {
  const currentMonth = Number.parseInt(format(new Date(Date.now()), 'M'), 10);
  const monthsArr = createMonthsArray(numOfMonths, currentMonth);
  const appointmentsCountArr = createAppointmentsCountArray(
    numOfMonths,
    monthsArr,
    currentMonth,
    pastAppointments
  );
  const monthsNamesArr = monthsArr.map((month) => monthNames[month]);
  return {
    labels: monthsNamesArr,
    datasets: [{ data: appointmentsCountArr }],
  };
}

function createMonthsArray(numOfMonths, currentMonth) {
  let monthsArr = [];
  if (currentMonth < numOfMonths) {
    let offset = numOfMonths - currentMonth;
    for (let i = 12 - offset + 1; i <= 12; i++) {
      monthsArr.push(i);
    }
  }
  let startMonth =
    currentMonth < numOfMonths ? 1 : currentMonth - numOfMonths + 1;
  for (let i = startMonth; i <= currentMonth; i++) {
    monthsArr.push(i);
  }
  return monthsArr;
}

function createAppointmentsCountArray(
  numOfMonths,
  monthsArr,
  currentMonth,
  pastAppointments
) {
  const currentYear = Number.parseInt(format(new Date(Date.now()), 'yy'), 10);
  let appointmentsCountArr = new Array(numOfMonths).fill(0);
  pastAppointments.forEach((appointment) => {
    const splitedDate = appointment.date.split('/');
    const month = Number.parseInt(splitedDate[1], 10);
    const year = Number.parseInt(splitedDate[2], 10);
    const monthIndex = monthsArr.indexOf(month);
    if (
      (monthIndex !== -1 && month <= currentMonth && year === currentYear) ||
      (monthIndex !== -1 && month > currentMonth && year === currentYear - 1)
    ) {
      appointmentsCountArr[monthIndex] = appointmentsCountArr[monthIndex] + 1;
    }
  });
  return appointmentsCountArr;
}

export const getAppointmentsPerMonth = createAsyncThunk(
  'stats/getAppointmentsPerMonth',
  async (numOfMonths = 12, { getState, rejectWithValue }) => {
    try {
      const {
        history: { pastAppointments },
      } = getState();

      const currentMonth = Number.parseInt(
        format(new Date(Date.now()), 'M'),
        10
      );
      const monthsArr = createMonthsArray(numOfMonths, currentMonth);
      const appointmentsCountArr = createAppointmentsCountArray(
        numOfMonths,
        monthsArr,
        currentMonth,
        pastAppointments
      );
      const monthsNamesArr = monthsArr.map((month) => monthNames[month]);
      return {
        labels: monthsNamesArr,
        datasets: [{ data: appointmentsCountArr }],
      };
    } catch (e) {
      throw rejectWithValue(
        new ParseError(
          410,
          'Unable to show your statistics,\n please try to refresh'
        )
      );
    }
  }
);

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    clearError(state, action) {
      state.error = null;
    },
    clearStats(state, action) {
      state.charts = initialState.charts;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
  extraReducers: {
    [getChartStats.pending]: (state, action) => {
      state.loading = true;
      state.charts = null;
    },
    [getChartStats.fulfilled]: (state, action) => {
      state.loading = false;
      state.charts = action.payload;
    },
    [getChartStats.rejected]: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
    },
    [getAppointmentsPerMonth.pending]: (state, action) => {
      state.loading = true;
      state.charts.appointmentsPerMonth = null;
    },
    [getAppointmentsPerMonth.fulfilled]: (state, action) => {
      state.loading = false;
      state.charts.appointmentsPerMonth = action.payload;
    },
    [getChartStats.rejected]: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
      };
    },
  },
});

export const { clearError, clearStats } = statsSlice.actions;

export default statsSlice.reducer;

/*
charts structure

Object {
  "appointmentsPerMonth": Object {
    "datasets": Array [
      Object {
        "data": Array [Number],
      },
    ],
    "labels": Array [String],
  }
  "expertiseUsage": Array [
    Object {
      "color": String,
      "legendFontColor": String,
      "legendFontSize": Number,
      "name": String,
      "numOfTimes": Number,
  }]
}

*/
