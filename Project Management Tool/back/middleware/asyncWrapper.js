export const asyncWrapper=(asyncFunction) => {
  return (req, res, next) => {
    asyncFunction(req, res, next).catch((err) => next(err));
  };
};
