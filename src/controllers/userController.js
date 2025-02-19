const {
  getALLUser,
  putUpdateUserServices,
  deleteUserServices,
  postCreateUser,
} = require("../services/userServices");

const postCreateUserAPI = async (req, res) => {
  let result = await postCreateUser(req.body);

  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const getALLUserAPI = async (req, res) => {
  let result = await getALLUser(req.query);

  return res.status(200).json({
    length: result.length,
    errorCode: 0,
    data: result,
  });
};

const putUpdateUserAPI = async (req, res) => {
  let result = await putUpdateUserServices(req.body);

  return res.status(200).json({
    data: result,
  });
};

const deleteUserAPI = async (req, res) => {
  let id = req.body.id;
  let result = await deleteUserServices(id);

  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};
module.exports = {
  postCreateUserAPI,
  getALLUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
};
