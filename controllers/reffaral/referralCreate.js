const { ReferUser,schemaValidateReferUser } = require('../../models/referUser');
const { BadRequest } = require('http-errors');

const expirationTime = 10 // in minutes
const referralCreate = async (req, res, next) => {
  try {
      const { error } = schemaValidateReferUser.validate(req.body);

      if (error) {
        throw new BadRequest(error.message);
      }

      const { email, translationBundleId} = req.body;

      if(!email || !translationBundleId){
        throw new BadRequest("Email and translationBundleId is required")
      }

      const newReferralUser = await ReferUser.create({
          email,
          translationBundleId
      });

      const currentTime = Date.now();
      const timeStamp = currentTime + (expirationTime * 60 * 1000);

      const referralUrl = `${process.env.FRONT_BASE_URL}/referralUserSignup?userId=${newReferralUser._id}&timeStamp=${timeStamp}`;

      const encodeUrl = encodeURI(referralUrl)

      res.status(201).json({
        encodeUrl
      })

  } catch (error) {
    next(error);
  }
}
module.exports = referralCreate;