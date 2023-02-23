import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
/*import { red } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";*/
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
/*import { fontFamily } from "@mui/system";*/
import swal from 'sweetalert';



export const expresiones = {
 
  password: /^.{8,16}$/, // 8 a 16 digitos.
  email: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
  
};

export const signUpFields = [
  
   
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    pattern: expresiones.email,
    helperText: "El formato de email no es correcto",
    valid: (value) => expresiones.email.test(value),
  },
 
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    pattern: expresiones.password,
    helperText: "Selecciona una correcta contraseña entre 8 y 16 carácteres",
    valid: (value) => expresiones.password.test(value),
  },
  
];

const Login = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {
     
      email: undefined,
      password: undefined,
     
    },
  });

  const password = watch("password");

  const onSubmit = (data) => {
    console.log(data);

  };
 
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#F2A157",
          padding: "5vh 10vh",
          borderRadius: "10px"
        }}
      >
        <h1 style={{ textAlign: "center", padding: "20px"}}>Login</h1>
        <Box component= {"form" } onSubmit={handleSubmit(onSubmit)} noValidate>
          {signUpFields.map((field) => (
            <Controller
              key={field.name}
              name={field.name}
              control={control}
              defaultValue=""
              rules={{
                required: field.required,
                pattern: field.pattern,
                validate: (value) => field.valid(value, password),
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  sx={{
                    marginBottom: "20px",
                    ".MuiInputBase-root": {
                      backgroundColor: "white",
                      
                      border: errors[field.name]
                        ? "3px solid red"
                        : "2px solid #000",
                    },
                    ".MuiInputBase-root > fieldset": {
                      border: "none",
                    },
                    ".MuiInputBase-root.Mui-focused": {
                      border: errors[field.name]
                        ? "3px solid red"
                        : "3px solid #ff8801",
                        fontFamily: 'Mandali'
                    },
                    ".MuiInputBase-input": {
                      color: "#000",
                      border: "none",
                    },
                    ".MuiInputBase-input:focus": {
                      color: "#000",
                      border: "none",
                    },
                    ".MuiFormLabel-root": {
                      color: errors[field.name] ? "red" : "#000",
                      marginLeft: "10px",
                      background: value ? "aliceblue" : "transparent",
                      fontFamily: 'Mandali'
                    },
                    ".MuiFormLabel-root.Mui-focused": {
                      color: "#000",
                      background: "aliceblue",
                    },
                  }}
                  onChange={onChange}
                  label={field.label}
                  variant="outlined"
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  value={value}
                  required
                  error={
                    !!errors[field.name] ||
                    (dirtyFields[field.name] && !field.valid(value, password))
                  }
                  helperText={
                    (dirtyFields[field.name] &&
                      !field.valid(value, password)) ||
                    !!errors[field.name] ? (
                      <Typography variant="error" sx={{ fontSize: "16px" }}>
                        {field.helperText}
                      </Typography>
                    ) : (
                      " "
                    )
                  }
                />
              )}
            />
          ))}
          <Box textAlign='center'>
  
          <Button style={{align: "center"}}
            fullWidth
            sx={{
              backgroundColor: "#393939",
              color: "white",
              borderRadius: "5px",
              width: "80px",
              justifyContent: "center" , alignItems: "center",
              fontFamily: 'Mandali' ,
              fontSize: "15px",
              "&:hover": {
                backgroundColor: "#ff8801",
              },
            }}
            type="submit"
          >
            Enviar
          </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
export default Login;
