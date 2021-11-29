import React, {useReducer, useEffect} from 'react';
import {createBox} from '@shopify/restyle';
import {Calendar} from 'react-native-calendars';
import {palette} from '../Theme/Index';
import {StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {PostJobConstants} from '../../Redux';
import moment from 'moment';

const Box = createBox();
export default ({navigation, route}) => {
  const dispatch = useDispatch();

  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      date: new Date(),
      selectedDate: moment(new Date()).format('L'),
    },
  );
  const categoryList = useSelector(state => ({
    ...state.job,
    // ...state.auth.user.user,
  }));
  console.log({categoryList});

  useEffect(() => {
    dispatch({
      type: PostJobConstants.DATE,
      date: state.selectedDate,
    });
  }, [state.date]);

  console.log('DATE', state);
  return (
    <Box>
      <Calendar
        current={state.date}
        markedDates={state.date}
        style={styles.calendar}
        minDate={new Date()}
        onDayPress={day =>
          setState({
            selectedDate: moment(day.dateString).format('L'),
            date: {
              [day.dateString]: {
                selected: true,
                marked: true,
                selectedColor: palette.primary1,
              },
            },
          })
        }
        theme={{
          calendarBackground: palette.secondary,
          textSectionTitleColor: palette.support2,
          selectedDayBackgroundColor: palette.primary1,
          selectedDayTextColor: palette.support7,
          todayTextColor: palette.support7,
          dayTextColor: palette.support2,
          textDisabledColor: palette.support2,
          dotColor: palette.primary2,
          selectedDotColor: palette.support7,
          arrowColor: palette.support2,
          monthTextColor: palette.support2,
          textMonthFontWeight: 'bold',
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 14,
        }}
      />
    </Box>
  );
};
const styles = StyleSheet.create({
  calendar: {
    borderRadius: 8,
  },
});
