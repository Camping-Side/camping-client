/** @jsxImportSource @emotion/react */
import React from "react";
import { FC } from "react";
import DefaultButton from "./common/DefaultButton";
import DefaultSelect from "./common/DefaultSelect";
import { SelectChangeEvent } from "@mui/material";
import DefaultTextField from "./common/DefaultTextField";

const SAMPLE_SELECT_LIST = [
  {text: 'None', value:""},
  {text: '10', value:"10"},
  {text: '20', value:"20"},
  {text: '30', value:"30"},
]

const Sample: FC = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  

  return (
    <div>
      <h1>Buttons</h1>
      <section>
      <DefaultButton  variant="text" size="small">작은 버튼</DefaultButton>
      <DefaultButton  variant="outlined" size="medium">중간 버튼</DefaultButton>
      <DefaultButton  variant="contained" size="large">큰 버튼</DefaultButton>
      </section>
      <h1>Select</h1>
      <section>
        <DefaultSelect selectList={SAMPLE_SELECT_LIST} label={"나이"} selected={age} handleChange={handleChange} message={"나이를 선택해 주세요"}/>
      </section>
      <h1>Text Field</h1>
      <section>
        <DefaultTextField id="outlined-error" label="이름" message="이름을 입력해주세요" value={""} error={true}/>
        <DefaultTextField id="outlined-required" label="주소" message="주소를 입력해주세요" value={""} error={false} required={true}/>
      </section>
    </div>
  );
};

export default Sample;