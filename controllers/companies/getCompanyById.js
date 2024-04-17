const { Company } = require('../../models/company');

const getCompanyById = async (req, res, next) => {
  const { companyId } = req.params;
  try {
    const company = await Company.findById(companyId);
    if(!company) {
      res.status(404).send('Company not found');
    }
    res.json(company);
  } catch (error) {
    next(error);
  }
}
module.exports = getCompanyById;