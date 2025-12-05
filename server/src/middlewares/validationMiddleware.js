export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    const message = error.errors[0].message;
    return res.status(400).json({ message: `Validation Error: ${message}` });
  }
};
