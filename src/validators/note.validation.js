import Joi from 'joi';

export const noteValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().trim().required().messages({
      'string.base': 'Title must be a string',
      'any.required': 'Title is required',
      'string.empty': 'Title cannot be empty',
    }),
    description: Joi.string().trim().allow('').messages({
      'string.base': 'Description must be a string',
    }),
    color: Joi.string().trim().allow('').messages({
      'string.base': 'Color must be a string',
    }),
    isArchive: Joi.boolean().messages({
      'boolean.base': 'isArchive must be a boolean',
    }),
    isTrash: Joi.boolean().messages({
      'boolean.base': 'isTrash must be a boolean',
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      code: 400,
      data: [],
      message: error.details.map((err) => err.message).join(', '),
    });
  }

  next();
};
