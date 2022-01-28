import React from "react"
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import * as Yup from 'yup'
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../bll/reducers/AuthReducer";
import {AppRootStateType} from "../../bll/store";
import { Navigate } from "react-router-dom";

export const Login = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address").required("Required"),
            password: Yup.string()
                .min(6, 'Min size 6 char').required("Required")
        }),
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        }
    })

    if(isLoggedIn){
        return(
            <Navigate to={"/"}/>
        )
    }

    return <Grid container justifyContent={"center"}>
        <Grid item justifyContent={"center"}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={"https://social-network.samuraijs.com/"}
                           target={"_blank"}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps("email")}

                        />
                        {formik.touched.email && formik.errors.email &&
                            <div>{formik.errors.email}</div>
                        }
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && formik.errors.password &&
                        <div>{formik.errors.password}</div>
                        }
                        <FormControlLabel label={"Remember me"}
                                          control={<Checkbox/>}
                                          {...formik.getFieldProps("rememberMe")}
                        />
                        <Button type={"submit"} variant={"contained"} color={"primary"}>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}
