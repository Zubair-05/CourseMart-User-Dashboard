import {atom, selector} from 'recoil';

export const userState = atom({
    key: 'userState',
    default: {
        username: 'mahammad-zubair',
        email : '12345'
    },
});


export const userSelector = selector({
    key: 'userSelector',
    get: ({ get }) => {
      const user = get(userState);
      return user;
    }
  });