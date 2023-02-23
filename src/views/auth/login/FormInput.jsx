import {
    FormHelperText,
    Typography,
    FormControl,
    Input as _Input,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';

const Input = styled(_Input)`
    background-color: white;
    padding: 0.4rem 0.7rem;
    margin-bottom: 0.5rem;
  `;

const FormInput = ({ name, label, ...otherProps }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            control={control}
            defaultValue=''
            name={name}
            render={({ field }) => (
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <Typography
                        variant='body2'
                        sx={{ color: 'white', mb: 1, fontWeight: 500 }}
                    >
                        {label}
                    </Typography>
                    <Input
                        {...field}
                        fullWidth
                        disableUnderline
                        sx={{ borderRadius: '1rem', color:'black'}}
                        error={!!errors[name]}
                        {...otherProps}
                    />
                    <FormHelperText error={!!errors[name]}>
                        {errors[name] ? errors[name].message : ''}
                    </FormHelperText>
                </FormControl>
            )}
        />
    );
};

export default FormInput;
