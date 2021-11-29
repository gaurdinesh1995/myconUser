import {request} from './APICentral';

export const updateAvatarProfile = data => {
  console.log({data});
  return request({url: '/user/', method: 'PUT', data}, true, true);
};

export const getStatusProfile = data => {
  return request(
    {url: '/api/user/profile/get-status', method: 'GET', data},
    true,
  );
};

export const getAvatarsProfile = data => {
  return request({url: '/user/me', method: 'GET', data}, true);
};
