const { Company } = require('../../models/company');

const postCompany = async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      description: req.body.description,
      user: req.user.id,
    }
    const company = await Company.create(payload);
    res.json(company);
  } catch (error) {
    next(error);
  }
}
module.exports = postCompany;