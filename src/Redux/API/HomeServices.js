// eslint-disable-next-line no-unused-vars
import { callAPi, callAPiMultiPart } from './http-common';

const homeArticle = () => callAPi.get('article/pubdata');

const HomeServices = {
  homeArticle,
};

export default HomeServices;
