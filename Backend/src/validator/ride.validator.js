import Joi from "joi";

function userRideCreateValidation(data) {
  const rideSchema = Joi.object({
    pickup: Joi.string().min(3).required().messages({
      "any.required": "Pick up is required",
      "string.base": "Pick up must be a string",
      "string.min": "Pick up must be at least 3 characters long",
    }),
    destination: Joi.string().min(3).required().messages({
      "any.required": "Destination is required",
      "string.base": "Destination must be a string",
      "string.min": "Destination must be at least 3 characters long",
    }),
    vehicletype: Joi.string().valid("car", "bike", "auto").required().messages({
      "any.required": "Vehicle type is required",
      "string.base": "Vehicle type must be a string",
      "any.only": "Vehicle type must be either 'car', 'bike', or 'auto'",
    }),
  });

  let { error } = rideSchema.validate(data);

  return error ? error.details : null;
}

export { userRideCreateValidation };
