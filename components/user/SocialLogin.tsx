import React from 'react'
import {Box, Button, Container, Typography} from '@mui/material'
import styled from "@emotion/styled";

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

export default function SocialLogin() {
  return (
      <Container component="main" maxWidth="xs">
        <Box
            sx={{
              marginTop: 4,
                marginBottom: 10
            }}
        >
          <Typography component="h1" variant="h5">
            SNS 계정으로 간편 로그인 / 회원가입
          </Typography>
          <Boxs sx={{ mt: 3 }}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
            >
              카카오 로그인
            </Button>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
            >
              네이버 로그인
            </Button>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
            >
              구글 로그인
            </Button>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
            >
              로그인에 어려움이 있나요?
            </Button>
          </Boxs>
        </Box>
      </Container>
  )
}

