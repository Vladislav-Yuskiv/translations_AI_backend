const { ReferUser } = require('../../models/referUser');
const { BadRequest } = require('http-errors');
const { User } = require('../../models/user');
const { TranslationBundle } = require('../../models');

const referralSignup = async (req, res, next) => {
  try {
    const {userId} = req.params;

    if (!userId) {
      throw new BadRequest("Invalid params");
    }

    const referralUser = await  ReferUser.findById(userId);

    //check if this usr already  have an account
    const userInDb = await User.findOne({ email: referralUser.email });

    if(userInDb){
      //user already have an account
      await TranslationBundle.findByIdAndUpdate(
        referralUser.translationBundle,
        { $addToSet: { users: userInDb._id } },
        { new: true }
      );

    }

    const redirectURL = userInDb
      ? process.env.FRONT_BASE_URL
      : encodeURI(`${process.env.FRONT_BASE_URL}/registration?isReference=true&email=${referralUser.email}&bundleId=${referralUser.translationBundle}`);


    res.set('Location', redirectURL);

    res.status(302).send();

  } catch (error) {
    next(error);
  }
}
module.exports = referralSignup;