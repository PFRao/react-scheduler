import React, { Component } from 'react';
import './TestDriveCalendar.css';

import TestDriveCalendarDate from './TestDriveCalendarDate';

// current props list:
// - dealerHolidays
// - dealerHours
// - selectedTime
// - selectTime

export default class TestDriveCalendar extends Component {
  constructor (props) {
    super(props);

    // number of days user can scroll through in the calendar
    this.calendarSize = 30;
    // this must match the pixel width of one date in the calendar (including margins/padding)
    this.scrollInterval = 85;

    this.maxPosition = 0;
    this.minPosition = -1 * this.scrollInterval * (this.calendarSize - 1);

    this.lastTouch = null;

    this.state = {
      startDate: new Date(),
      // this is for the purposes of the UI: it controls which date should display its hour list on the calendar
      selectedDate: this.props.selectedTime ? this.props.selectedTime.getDate() : null,
      currentPosition: 0,
      lockHorizontalScroll: false
    }

    this.calendarRef = React.createRef();
  }

  createDatesList = () => {
    let date = new Date(this.state.startDate);
    let daysArray = [];

    for (let i = 0; i < this.calendarSize; i++) {
      // this is necessary to avoid incrementing the date after we push it (pass by reference)
      const nextDate = new Date(date.setDate(date.getDate() + 1));
      const holidayHours = this.findHolidayHours(nextDate);
      const hours = holidayHours || this.props.dealerHours[nextDate.getDay()];

      daysArray.push(
        <TestDriveCalendarDate
          selectDate={this.selectDate}
          selectTime={this.props.selectTime}
          key={nextDate.getDate()}
          date={nextDate}
          hours={hours}
          isSelected={this.state.selectedDate === nextDate.getDate()}
          selectedTime={this.props.selectedTime}
          onScrollStart={this.handleVerticalScrollStart}
          onScrollEnd={this.handleVerticalScrollEnd} />
      )
    }

    return daysArray;
  }

  handleVerticalScrollStart = () => {
    this.setState({lockHorizontalScroll: true});
  }

  handleVerticalScrollEnd = () => {
    this.setState({lockHorizontalScroll: false});
  }

  findHolidayHours = (date) => {
    const month = date.getMonth();
    const day = date.getDate();

    return this.props.dealerHolidays.find(holiday => holiday.date.getMonth() === month && holiday.date.getDate() === day);
  }

  translateX(elem, x) {
    elem.style.transform = 'translate3d(' + x + 'px, 0, 0)';
  }

  shiftLeft = (e) => {
    e.preventDefault();

    let newPosition = this.state.currentPosition - this.scrollInterval;

    if (this.state.currentPosition - this.scrollInterval < this.minPosition)
      newPosition = this.minPosition;

    this.setState({ currentPosition: newPosition }, () => {
      this.translateX(this.calendarRef.current, this.state.currentPosition);
    })
  }

  shiftRight = (e) => {
    e.preventDefault();

    let newPosition = this.state.currentPosition + this.scrollInterval;

    if (newPosition > this.maxPosition)
      newPosition = this.maxPosition;

    this.setState({ currentPosition: newPosition }, () => {
      this.translateX(this.calendarRef.current, this.state.currentPosition);
    })
  }

  swipeStart = (e) => {
    e.preventDefault();

    this.lastTouch = e.changedTouches[0].clientX;
  }

  swipe = (e) => {
    e.preventDefault();
    e.persist();

    if (this.state.lockHorizontalScroll) return;

    const newPostion = this.state.currentPosition - this.lastTouch + e.changedTouches[0].clientX;

    if (newPostion > this.maxPosition || newPostion < this.minPosition) {
      this.lastTouch = e.changedTouches[0].clientX;
      return;
    }

    this.setState({ currentPosition: newPostion }, () => {
      this.translateX(this.calendarRef.current, this.state.currentPosition);
      this.lastTouch = e.changedTouches[0].clientX;
    });
  }

  selectDate = (value) => {
    this.setState({ selectedDate: value });
  }

  render() {
    const daysArray = this.createDatesList(this.state.offset);

    return (
      <div className="test-drive-calendar-container">
        <button className="calendar-control" disabled={this.state.currentPosition >= this.maxPosition} onClick={this.shiftRight}>
          {'<'}
        </button>
        <div onTouchStart={this.swipeStart} onTouchMove={this.swipe} className="test-drive-calendar">
          <ul ref={this.calendarRef} className="test-drive-calendar-dates">
            {daysArray}
          </ul>
        </div>
        <button className="calendar-control" disabled={this.state.currentPosition <= this.minPosition} onClick={this.shiftLeft}>
          {'>'}
        </button>
      </div>
    )
  }
}
