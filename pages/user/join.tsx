/** @jsxImportSource @emotion/react */
import React, { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../../layout/Layout";
import { checkEmailDup, checkPhoneDup } from "../../actions/account";
import { join } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { AppDispatch } from "../../store/configureStore";
import { JoinInputs, JoinReqData } from "../../type/auth/auth";

//styled-component
import {
  DupCheckButtonGrid,
  FormGrid,
  JoinGrid,
} from "../../assets/styles/styled/auth/join";
import accountSlice from "@reducers/account";

const JoinComponent: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    clearErrors,
    setError,
  } = useForm<JoinInputs>();

  const checkPhoneDupSuccess = useSelector(
    (state: any) => state.account.checkPhoneDupSuccess
  );

  const checkEmailDupSuccess = useSelector(
    (state: any) => state.account.checkEmailDupSuccess
  );

  const checkPhoneDupDone = useSelector(
    (state: any) => state.account.checkPhoneDupDone
  );

  const checkEmailDupDone = useSelector(
    (state: any) => state.account.checkEmailDupDone
  );

  useEffect(() => {
    return () => {
      dispatch(accountSlice.actions.resetFlagState());
    };
  }, []);

  const handleCheckPhoneDup = (e: React.MouseEvent<HTMLButtonElement>) => {
    const phone = watch("phone");
    if (!phone) {
      alert("휴대폰번호를 입력하세요.");
      return;
    } else if (phone && phone.length < 10) {
      alert("휴대폰번호를 정확히 입력하세요.");
      return;
    }
    dispatch(checkPhoneDup(phone))
      .unwrap()
      .then((res) => {
        const { isDup } = res;
        if (isDup) {
          alert("중복된 휴대폰번호입니다.");
        } else {
          alert("사용가능한 휴대폰번호입니다.");
          clearErrors("phone");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCheckEmailDup = (e: React.MouseEvent<HTMLButtonElement>) => {
    const email = watch("email");
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email) {
      alert("아이디(이메일)을 입력하세요.");
      return;
    } else if (!pattern.test(email)) {
      alert("아이디(이메일)을 정확히 입력하세요.");
      return;
    }
    dispatch(checkEmailDup(email))
      .unwrap()
      .then((res) => {
        const { isDup } = res;
        if (isDup) {
          alert("중복된 아이디(이메일)입니다.");
        } else {
          alert("사용가능한 아이디(이메일)입니다.");
          clearErrors("email");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onSubmit: SubmitHandler<JoinInputs> = (data) => {
    const { name, email, password, phone, birth } = data;
    console.log("data: ", data);
    const joinParam: JoinReqData = {
      username: name,
      email: email,
      password: password,
      birth: birth,
      phone: phone,
    };
    console.log("joinParam: ", joinParam);
    dispatch(join(joinParam))
      .unwrap()
      .then((res) => {
        alert("회원가입되었습니다");
        Router.push("/user/login");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const errorMessage = {
    name: () => {
      return !!errors.name ? "이름을 입력하세요" : "";
    },
    nickname: () => {
      return !!errors.nickname ? "별명을 입력하세요" : "";
    },
    phone: () => {
      let msg = "";
      if (errors.phone?.type === "minLength") {
        msg = "휴대폰번호를 정확히 입력해주세요";
      } else if (checkPhoneDupDone && !checkPhoneDupSuccess) {
        msg = "중복된 휴대폰번호입니다";
      } else if (!!errors.phone) {
        msg = "휴대폰번호를 입력해주세요";
      }
      return msg;
    },
    email: () => {
      let msg = "";
      if (errors.email?.type === "pattern") {
        msg = "정확한 이메일을 입력해주세요";
      } else if (checkEmailDupDone && !checkEmailDupSuccess) {
        msg = "중복된 아이디(이메일)입니다";
      } else if (!!errors.email) {
        msg = "아이디(이메일)을 입력해주세요";
      }
      return msg;
    },
    password: () => {
      let msg = "";
      if (errors.password?.type === "minLength") {
        msg = "비밀번호를 정확히 입력해주세요(6~12자리)";
      } else if (watch("password") !== watch("passwordCheck")) {
        msg = "비밀번호가 서로 일치하지 않습니다";
      } else if (!!errors.password) {
        msg = "비밀번호를 입력해주세요";
      }
      return msg;
    },
    passwordCheck: () => {
      let msg = "";
      if (errors.passwordCheck?.type === "minLength") {
        msg = "비밀번호를 정확히 입력해주세요(6~12자리)";
      } else if (watch("password") !== watch("passwordCheck")) {
        msg = "비밀번호가 서로 일치하지 않습니다";
      } else if (!!errors.passwordCheck) {
        msg = "비밀번호를 입력해주세요";
      }
      return msg;
    },
    birth: () => {
      let msg = "";
      if (errors.birth?.type === "minLength") {
        msg = "생년월일을 정확히 입력해주세요(8자리)";
      } else if (!!errors.birth) {
        msg = "생년월일을 입력해주세요";
      }
      return msg;
    },
  };

  const resetError = (item: any) => {
    clearErrors(item);
    if (!watch(item)) {
      setError(item, { type: "empty", message: "empty" });
    }
  };

  const formInfo = {
    name: {
      value: {
        ...register("name", {
          required: true,
          onChange: (e) => {
            setValue("name", e.target.value.substring(0, 9));
            resetError("name");
          },
        }),
      },
      error: !!errors.name,
      errorMessage: errorMessage.name(),
    },
    nickname: {
      value: {
        ...register("nickname", {
          required: true,
          onChange: (e) => {
            setValue("nickname", e.target.value.substring(0, 9));
            resetError("nickname");
          },
        }),
      },
      error: !!errors.nickname,
      errorMessage: errorMessage.nickname(),
    },
    phone: {
      value: {
        ...register("phone", {
          required: true,
          minLength: 11,
          onChange: (e) => {
            console.log("e.target.value: ", e.target.value);
            setValue(
              "phone",
              e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1")
                .substring(0, 11)
            );
            resetError("phone");
          },
        }),
      },
      error: !!errors.phone || (checkPhoneDupDone && !checkPhoneDupSuccess),
      errorMessage: errorMessage.phone(),
      disabled: checkPhoneDupDone && checkPhoneDupSuccess,
    },
    email: {
      value: {
        ...register("email", {
          required: true,
          pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        }),
      },
      error: !!errors.email || (checkEmailDupDone && !checkEmailDupSuccess),
      errorMessage: errorMessage.email(),
      disabled: checkEmailDupDone && checkEmailDupSuccess,
    },
    password: {
      value: {
        ...register("password", {
          required: true,
          minLength: 6,
          onChange: (e) => {
            setValue("password", e.target.value.substring(0, 12));
            resetError("password");
          },
        }),
      },
      error: !!errors.password || watch("password") !== watch("passwordCheck"),
      errorMessage: errorMessage.password(),
    },
    passwordCheck: {
      value: {
        ...register("passwordCheck", {
          required: true,
          minLength: 6,
          onChange: (e) => {
            setValue("passwordCheck", e.target.value.substring(0, 12));
            resetError("passwordCheck");
          },
        }),
      },
      error:
        !!errors.passwordCheck || watch("password") !== watch("passwordCheck"),
      errorMessage: errorMessage.passwordCheck(),
    },
    birth: {
      value: {
        ...register("birth", {
          required: true,
          minLength: 8,
          onChange: (e) => {
            setValue(
              "birth",
              e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1")
                .substring(0, 8)
            );
            resetError("birth");
          },
        }),
      },
      error: !!errors.birth,
      errorMessage: errorMessage.birth(),
    },
  };

  return (
    <Layout>
      <JoinGrid container>
        <Grid item xs={12} className={"grid-title"}>
          <Typography>회원가입</Typography>
        </Grid>
        <Grid item container xs={12} className={"grid-form"}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl component="fieldset" variant="standard">
              <FormGrid item container>
                <Grid item xs={12} className={"grid-form-item"}>
                  <Typography>이름</Typography>
                  <TextField
                    fullWidth
                    {...formInfo.name.value}
                    error={formInfo.name.error}
                    helperText={formInfo.name.errorMessage}
                  />
                </Grid>
                <Grid item xs={12} className={"grid-form-item"}>
                  <Typography>별명</Typography>
                  <TextField
                    fullWidth
                    {...formInfo.nickname.value}
                    error={formInfo.nickname.error}
                    helperText={formInfo.nickname.errorMessage}
                  />
                </Grid>
                <Grid item container xs={12} className={"grid-form-item"}>
                  <Grid item xs={9}>
                    <Typography>아이디(이메일)</Typography>
                    <TextField
                      placeholder={"camporest@camporest.com"}
                      fullWidth
                      {...formInfo.email.value}
                      error={formInfo.email.error}
                      helperText={formInfo.email.errorMessage}
                      disabled={formInfo.email.disabled}
                    />
                  </Grid>
                  <DupCheckButtonGrid item xs={3}>
                    <Button
                      variant="outlined"
                      size="medium"
                      onClick={handleCheckEmailDup}
                      disabled={checkEmailDupDone && checkEmailDupSuccess}
                    >
                      {checkEmailDupDone && checkEmailDupSuccess
                        ? "확인완료"
                        : "중복확인"}
                    </Button>
                  </DupCheckButtonGrid>
                </Grid>
                <Grid item container xs={12} className={"grid-form-item"}>
                  <Grid item xs={9}>
                    <Typography>휴대전화</Typography>
                    <TextField
                      placeholder={"숫자만입력"}
                      fullWidth
                      {...formInfo.phone.value}
                      error={formInfo.phone.error}
                      helperText={formInfo.phone.errorMessage}
                      disabled={formInfo.phone.disabled}
                    />
                  </Grid>
                  <DupCheckButtonGrid item xs={3}>
                    <Button
                      variant="outlined"
                      size="medium"
                      onClick={handleCheckPhoneDup}
                      disabled={checkPhoneDupDone && checkPhoneDupSuccess}
                    >
                      {checkPhoneDupDone && checkPhoneDupSuccess
                        ? "확인완료"
                        : "중복확인"}
                    </Button>
                  </DupCheckButtonGrid>
                </Grid>
                <Grid item xs={12} className={"grid-form-item"}>
                  <Typography>비밀번호</Typography>
                  <TextField
                    placeholder={"6~12자리"}
                    fullWidth
                    type="password"
                    {...formInfo.password.value}
                    error={formInfo.password.error}
                    helperText={formInfo.password.errorMessage}
                  />
                </Grid>
                <Grid item xs={12} className={"grid-form-item"}>
                  <Typography>비밀번호 재확인</Typography>
                  <TextField
                    placeholder={"6~12자리"}
                    fullWidth
                    type="password"
                    {...formInfo.passwordCheck.value}
                    error={formInfo.passwordCheck.error}
                    helperText={formInfo.passwordCheck.errorMessage}
                  />
                </Grid>
                <Grid item xs={12} className={"grid-form-item"}>
                  <Typography>생년월일</Typography>

                  <TextField
                    placeholder={"8자리 숫자만입력"}
                    fullWidth
                    {...formInfo.birth.value}
                    error={formInfo.birth.error}
                    helperText={formInfo.birth.errorMessage}
                  />
                </Grid>
                <Grid item xs={12} className={"grid-form-submit"}>
                  <Button
                    variant="outlined"
                    size="large"
                    fullWidth
                    type="submit"
                    disabled={
                      !checkPhoneDupDone ||
                      !checkPhoneDupSuccess ||
                      !checkEmailDupDone ||
                      !checkEmailDupSuccess
                    }
                  >
                    회원가입
                  </Button>
                </Grid>
              </FormGrid>
            </FormControl>
          </Box>
        </Grid>
      </JoinGrid>
    </Layout>
  );
};

export default JoinComponent;
