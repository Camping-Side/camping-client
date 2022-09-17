import React, {FC} from "react";
import Layout from "@layout/Layout";
import Link from "next/link";
import {
    Unstable_Grid2 as Grid2,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Box,
    Container, CssBaseline, Avatar, Typography, Grid,
    FormControlLabel,Checkbox, Button
} from "@mui/material/";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styled from '@emotion/styled';

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

interface State {
    id: string;
    password: string;
    showPassword: boolean;
}

const Login: FC = () => {
    const [values, setValues] = React.useState<State>({
       id: '',
       password: '',
       showPassword: false,
    });

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleAgree = (e: React.FormEvent<HTMLInputElement>) => {
        // setChecked(event.target.checked);
    };

    return (
        <Layout>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                    }}
                >
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                    <Boxs component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <FormControl component="fieldset" variant="standard">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        autoFocus
                                        fullWidth
                                        type="email"
                                        id="email"
                                        name="email"
                                        label="이메일 주소"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <OutlinedInput
                                        id="password"
                                        label="password"
                                        fullWidth
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox onChange={handleAgree} color="primary" />}
                                        label="remember"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                size="large"
                            >
                                로그인
                            </Button>
                        </FormControl>
                    </Boxs>
                </Box>
            </Container>
        </Layout>
    )
}

export default Login;