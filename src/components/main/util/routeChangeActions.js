import queryString from 'query-string';
import Mixpanel from '@utils/Mixpanel';
import { acceptCookies, disableSplashPage } from '@reducers/ui';
import store from '../../../redux/store';

const handleReferralCode = (
  location,
  history,
) => {
  const { search, pathname } = location;
  const { push } = history;
  const { referral } = queryString.parse(search);

  if (referral) {
    Mixpanel.track('Referral Link Used', {
      'Referral code': referral,
      Path: pathname,
    });
    push(pathname);
  }
};

const logAboutPageVisit = location => {
  const { pathname } = location;
  if (pathname === '/about') {
    Mixpanel.track('About 311');
  }
};

const checkAcceptedCookies = () => {
  const { ui } = store.getState();
  if (sessionStorage.getItem('accept-cookies') && !ui.cookiesAccepted) {
    store.dispatch(acceptCookies());
  }
};

const handleSplashPageView = location => {
  const { pathname } = location;
  const { ui } = store.getState();
  if (pathname !== '/' && !ui.disableSplashPage) {
    store.dispatch(disableSplashPage());
  }
};

export default [
  handleReferralCode,
  logAboutPageVisit,
  checkAcceptedCookies,
  handleSplashPageView,
];
