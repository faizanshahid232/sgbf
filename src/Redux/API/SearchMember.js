// eslint-disable-next-line no-unused-vars
import { callAPi } from './http-common';

const getAll = (data) => callAPi.post('/organization/searchMember', data);

const SearchMember = {
    getAll,
};

export default SearchMember;
