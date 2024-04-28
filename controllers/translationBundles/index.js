const postTranslationBundle = require('./postTranslationBundle');
const getTranslationBundleId = require('./getTranslationBundleId');
const getTranslationBundles = require('./getTranslationBundles');
const updateTranslationBundleId = require('./updateTranslationBundleId');
const deleteTranslationBundleId = require('./deleteTranslationBundleId');
const getUsersByBundleId = require('./getUsersByBundleId');
const deleteUserInBundle = require('./deleteUserInBundle');
const checkBundleTranslation = require('./checkBundleTranslation');
const addNewLanguage = require('./addNewLanguage');
const deleteLanguageFromBundle = require('./deleteLanguageFromBundle');

module.exports = {
  postTranslationBundle,
  getTranslationBundleId,
  getTranslationBundles,
  updateTranslationBundleId,
  deleteTranslationBundleId,
  getUsersByBundleId,
  deleteUserInBundle,
  checkBundleTranslation,
  addNewLanguage,
  deleteLanguageFromBundle
};