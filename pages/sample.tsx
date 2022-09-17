/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { FC } from "react";
import { SelectChangeEvent } from "@mui/material";
import BaseButton from "../components/common/BaseButton";
import BaseSelect from "../components/common/BaseSelect";
import BaseTextField from "../components/common/BaseTextField";
import BaseDatePicker from "../components/common/BaseDatePicker";
import Layout from "../layout/Layout";

const SAMPLE_SELECT_LIST = [
  {id:0,text: 'None', value:""},
  {id:1,text: '10', value:"10"},
  {id:2,text: '20', value:"20"},
  {id:3,text: '30', value:"30"},
]

const Sample: FC = () => {
  // select box state
  const [age, setAge] = React.useState('');
  // select box 함수
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  
 // datePicker state
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(),
  );
  //datePicker 함수
  const handleDateChange = (newValue: Date | null) => {
    setSelectedDate(newValue);
  };

  return (
      <Layout>
        <div>
          <h1>Buttons</h1>
          <section>
          <BaseButton  variant="text" size="small">작은 버튼</BaseButton>
          <BaseButton  variant="outlined" size="medium">중간 버튼</BaseButton>
          <BaseButton  variant="contained" size="large">큰 버튼</BaseButton>
          </section>
          <h1>Select</h1>
          <section>
            <BaseSelect selectList={SAMPLE_SELECT_LIST} label={"나이"} selected={age} handleChange={handleChange} message={"나이를 선택해 주세요"}/>
          </section>
          <h1>Text Field</h1>
          <section>
            <BaseTextField id="outlined-error" label="이름" message="이름을 입력해주세요" value={""} error={true}/>
            <BaseTextField id="outlined-required" label="주소" message="주소를 입력해주세요" value={""} error={false} required={true}/>
          </section>
          <h1>DatePicker</h1>
          <section>
            <BaseDatePicker label="달력" value={selectedDate} handleChange={handleDateChange}/>
          </section>
        </div>
      </Layout>
  );
};

export default Sample;