// @flow
export const Account = (account: Object) => {
  const {
    address,
    label,
    isDefault,
    key
  } = account

  return {
    address,
    label,
    isDefault: isDefault || false,
    lock: false,
    key,
    contract: {},
    extra: null
  }
}
