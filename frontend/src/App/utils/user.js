import some from 'lodash/some';

export function hasActiveSub(user) {
  return user.stripeSubscriptionStatus === 'active';
}
