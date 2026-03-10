const parseValidationErrors = (e, req) => {
  console.log(e.errors);

  const keys = Object.keys(e.errors);
  keys.forEach((key) => {
    req.flash("error", key + ": " + e.errors[key].message);
  });
};

module.exports = parseValidationErrors;
