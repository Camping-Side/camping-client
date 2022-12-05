/** @jsxImportSource @emotion/react */
import React, {useState} from "react";
import styled from "@emotion/styled";
import { FC } from "react";
import {IconButton, InputAdornment, OutlinedInput, SelectChangeEvent} from "@mui/material";
import BaseButton from "../../components/common/BaseButton";
import BaseSelect from "../../components/common/BaseSelect";
import BaseTextField from "../../components/common/BaseTextField";
import BaseDatePicker from "../../components/common/BaseDatePicker";
import Layout from "../../layout/Layout";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const SAMPLE_SELECT_LIST = [
  {id:0,text: 'None', value:""},
  {id:1,text: '10', value:"10"},
  {id:2,text: '20', value:"20"},
  {id:3,text: '30', value:"30"},
]

const Join: FC = () => {
  // select box 함수
  const handleAgeChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const handlePasswordChange = (event: SelectChangeEvent) => {
    setPassword(event.target.value);
  };

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
      <Layout>
        <div>
          <h1>회원가입</h1>
          <section>
            <BaseTextField id="outlined-error" label="이름" message="이름을 입력해주세요" value={name} error={false} required={true} onChange={setName}/>
          </section>
          <section>
            <BaseTextField id="outlined-required" label="아이디" message="아이디를 입력해주세요" value={""} error={false} required={true}/>
          </section>
           <section>
            <BaseTextField id="outlined-error" label="비밀번호" message="비밀번호를 입력해주세요" value={""} error={false} required={true} type='password'/>
          </section>

          <section>
            <BaseSelect selectList={SAMPLE_SELECT_LIST} label={"나이"} selected={age} handleChange={handleAgeChange} message={"나이를 선택해 주세요"}/>
          </section>
          <BaseButton variant="contained" size="large">회원가입</BaseButton>
        </div>
      </Layout>
  );
};

export default Join;