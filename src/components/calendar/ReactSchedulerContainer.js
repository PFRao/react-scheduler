import React, { Component } from 'react';
import TestDriveCalendar from './TestDriveCalendar';
import { mockDealer } from './MockDealer';
import './TestDriveCalendar.css';

export default class ReactSchedulerContainer extends Component {
  constructor() {
    super();

    this.state = { selectedTime: null }
  }

  selectTime = (value) => {
    this.setState({ selectedTime: value });
  }

  render = () => {
    return <TestDriveCalendar
      dealerHolidays={mockDealer.holidays}
      dealerHours={mockDealer.hours}
      selectedTime={this.state.selectedTime}
      selectTime={this.selectTime}></TestDriveCalendar>
  }
}