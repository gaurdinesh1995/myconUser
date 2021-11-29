import {request} from './APICentral';

export const getUserByPhone = data => {
  return request(
    {url: '/api/user/byte-transfer/get-user-by-phone', method: 'POST', data},
    true,
    true,
  );
};
