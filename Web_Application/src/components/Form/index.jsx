import { Box, TextField, } from "@mui/material";
import { useYupValidationResolver } from "hooks/useYupValidationResolver";
import {
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { theme } from "utils/theme";

export const Form = ({ onSubmit, sx, schema, children, ...options }) => {
  const resolver = useYupValidationResolver(schema);
  const methods = useForm({ resolver, ...options });
  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          ...sx,
          '& >*': {
            my: 2
          }
        }}
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </Box>
    </FormProvider>
  );
};
export const Input = ({
  name,
  label,
  className,
  style,
  inputStyle,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "0 0 10px 0",
      }}
      componenet="div"
      className={className}
      style={style}
    >
      <TextField
        label={label ? label : name}
        style={{ ...inputStyle }}
        {...register(name)}
        {...props}
        sx={{ fieldset: { borderRadius: "12px" } }}
      />

      {errors[name] && (
        <span
          style={{
            color: theme.palette.error.main,
            marginBottom: "10px",
            fontWeight: "bold",
            marginLeft: "5px",
          }}
          role="alert"
        >
          {errors[name].message}
        </span>
      )}
    </Box>
  );
};
