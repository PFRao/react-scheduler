import React, { Component } from 'react';
import './TestDriveCalendar.css';

export default class TestDriveCalendarDate extends Component {
  constructor(props) {
    super(props);

    this.daysMap = {
      0: 'SU',
      1: 'M',
      2: 'TU',
      3: 'W',
      4: 'TH',
      5: 'F',
      6: 'SA'
    }

    this.timeOptions = { hour: '2-digit', minute: '2-digit' };
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.isSelected !== this.props.isSelected) ||
      (nextProps.isSelected === true && nextProps.selectedTime !== this.props.selectedTime);
  }

  createHoursArray = () => {
    let hoursArray = [];

    // if null, then the dealership is closed on that day so the hours array should remain empty
    if (!this.props.hours.open)
      return hoursArray;

    for (let i = new Date(this.props.hours.open); i <= this.props.hours.close; i = new Date(i.setHours(i.getHours() + 1))) {

      const hour = new Date(i);
      const hourString = new Intl.DateTimeFormat('en-US', this.timeOptions).format(hour);
      hoursArray.push(
        <div
          onClick={this.selectTime}
          className={"hours-list-item no-select " + (this.matchesSelectedTime(hourString) ? 'selected' : '')}
          key={hour.getHours()}>
          {hourString}
        </div>
      );
    }

    return hoursArray;
  }

  selectDate = (e) => {
    e.preventDefault();

    // if the dealership is closed on that day, do nothing
    if (!this.props.hours.open)
      return;

    this.props.selectDate(this.props.isSelected ? null : this.props.date.getDate());
  }

  selectTime = (e) => {
    e.preventDefault();
    const timeString = e.currentTarget.innerText;

    if (this.matchesSelectedTime(timeString))
      return;

    this.props.selectTime(this.parseTime(timeString));
  }

  matchesSelectedTime = (timeString) => {
    return this.props.selectedTime &&
      new Intl.DateTimeFormat('en-US', this.timeOptions).format(this.props.selectedTime) === timeString &&
      this.props.selectedTime.getDate() === this.props.date.getDate()
  }

  parseTime = (hour) => {
    const time = hour.match(/(\d+)(?::(\d\d))?\s*(P?)/);
    let date = new Date(this.props.date);
    date.setHours(parseInt(time[1], 10) + ((parseInt(time[1], 10) < 12 && time[3]) ? 12 : 0));
    date.setMinutes(parseInt(time[2], 10) || 0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  }

  render() {
    const hoursArray = this.props.isSelected ? this.createHoursArray() : [];
    this.minPosition = -1 * 40 * (hoursArray.length - 2);

    return (
      <li className={this.props.isSelected ? 'selected' : ''}>
        <div className="test-drive-calendar-block" onClick={this.selectDate}>
          <div className="calendar-day no-select">{ this.daysMap[this.props.date.getDay()] }</div>
          <div className={"calendar-date no-select " + (!this.props.hours.open ? 'closed' : '')}>{ this.props.date.toDateString().slice(4, 10) }</div>
        </div>
        <div className="hours-list-container">
          <div onTouchStart={this.props.onScrollStart} onTouchEnd={this.props.onScrollEnd} className="hours-list-inner-container">
            <div className="hours-list">{hoursArray}</div>
          </div>
        </div>
      </li>
    );
  }
}
