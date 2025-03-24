import Joi from "joi";

function captainRegistrationValidation(data) {
  const captainSchema = Joi.object({
    firstname: Joi.string().min(3).required().messages({
      "string.min": "Firstname must be atleast 3 characters long",
      "any.required": "Firstname is required",
    }),
    lastname: Joi.string().min(3).messages({
      "string.min": "Lastname must be atleast 3 characters long",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Email must be an valid email",
    }),

    phone: Joi.string().max(12).required().messages({
      "string.max": "Phone must be 12 in length",
      "any.required": " Phone Number is required",
    }),
    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$"
        )
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&#).",
        "string.empty": "Password cannot be empty.",
        "any.required": "Password is required.",
      }),

    color: Joi.string().min(3).required().messages({
      "string.min": "Color must be at least 3 characters long",
      "any.required": "Vehicle color is required",
    }),
    plate: Joi.string().min(3).required().messages({
      "string.min": "Plate must be at least 3 characters long",
      "any.required": "Vehicle plate is required",
    }),
    capacity: Joi.number().min(1).required().messages({
      "number.min": "Capacity must be at least 1",
      "any.required": "Vehicle capacity is required",
    }),
    type: Joi.string().valid("car", "bike", "auto").required().messages({
      "any.only": "Vehicle type must be one of car, bike, or auto",
      "any.required": "Vehicle type is required",
    }),
  });

  const { error } = captainSchema.validate(data);

  return error ? error.details : null;
}

export { captainRegistrationValidation };
