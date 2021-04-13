const buildError = (res, status, errorResp) => {
  return res.status(status).json({
    error: errorResp,
  });
};

module.exports = buildError;
