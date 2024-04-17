const { Company } = require('../../models/company');

const getCompanies = async (req, res, next) => {
  try {
    const user = req.user
    const companies = await Company.find({ user: user.id });
    res.json(companies);
  } catch (error) {
    next(error);
  }
}
module.exports = getCompanies;