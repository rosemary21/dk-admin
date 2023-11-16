"use client";

import { DatePicker } from "antd";

const DateSelect = () => {
  const { RangePicker } = DatePicker;
  return <RangePicker id="range_calender" />;
};

export default DateSelect;
