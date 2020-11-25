import { AxiosResponse } from 'axios';
const success = {
  'auth/signin': {
    '200': 'Giriş işleminiz başarı ile gerçekleşti. Ana sayfaya yönlendiriliyorsunuz.\n',
  },
  'auth/sign-up': {
    '201': 'Kayıt işleminiz başarı ile gerçekleşti. Mailinize aktivasyon kodu gönderildi. Lütfen hesabınızı aktive ediniz.',
  },
  'user/change-password': {
    '200': 'Password is successfully changed',
  },
  'auth/forgot-password': {
    '200': 'Password reset link has been sent to the e-mail address.',
  },
  'user/create-new-password': {
    '200': 'The password was changed',
  },
  'user/edit': {
    '200': 'User update success.',
  },
  'auth/send-email': {
    '200': 'Aktivasyon kodunuz gönderildi.',
  },
  'user/writer': {
    '200': 'Başvurunuz alınmıştır.',
  },
  'user/writer/edit': {
    '200': 'Başvuru Kabul Edilmiştir.',
  },
  'user/writer/detail': {
    '200': null,
  },
  '/comment/like/': {
    '200': 'like',
  },
  '/comment/dislike/': {
    '200': 'dislike',
  },
  '/content/like/': {
    '200': 'contentlike',
  },
  '/content/dislike/': {
    '200': 'contentdislike',
  },
  '/comment/commentregister': {
    '200': 'commentSuccess',
  },
};
export const successInterceptor = (res: AxiosResponse) => {
  let successMessage = null;
  if (
    res?.config.url.endsWith('/signin') ||
    res?.config.url.endsWith('/sign-up') ||
    res?.config.url.endsWith('/change-password') ||
    res?.config.url.endsWith('/create-new-password') ||
    res?.config.url.endsWith('/forgot-password') ||
    res?.config.url.endsWith('/edit')
  ) {
    successMessage = success[res.config.url][res?.status];
  } else if (res?.config.url.startsWith('auth/send-email') && res?.status === 200) {
    successMessage = success['auth/send-email']['200'];
  } else if (res?.config.url.startsWith('user/writer/detail') && res?.status === 200) {
    successMessage = success['user/writer/detail']['200'];
  } else if (res?.config.url.startsWith('user/writer') && res?.status === 200) {
    successMessage = success['user/writer']['200'];
  } else if (res?.config.url.startsWith('user/writer/edit') && res?.status === 200) {
    successMessage = success['user/writer/edit']['200'];
  }else if (res?.config.url.startsWith('/comment/like/') && res?.status === 200) {
    successMessage = success['/comment/like/']['200'];
  }else if (res?.config.url.startsWith('/comment/dislike/') && res?.status === 200) {
    successMessage = success['/comment/dislike/']['200'];
  }
  else if (res?.config.url.startsWith('/content/like/') && res?.status === 200) {
    successMessage = success['/content/like/']['200'];
  }else if (res?.config.url.startsWith('/content/dislike/') && res?.status === 200) {
    successMessage = success['/content/dislike/']['200'];
  }else if (res?.config.url.startsWith('/comment/commentregister') && res?.status === 200) {
    successMessage = success['/comment/commentregister']['200'];
  }

  window['UGLY_STORE'].dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: successMessage });
  return res;
};
