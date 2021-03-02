import { USER_LOGIN, SNACKBAR, THEME, CAMPAIGN } from "./actionTypes";
export const setUser = (content: any) => {
  return {
    type: USER_LOGIN,
    profile: content.profile,
  };
};
export const setSnackBar = (content: any) => {
  return {
    type: SNACKBAR,
    snackbar: content.snackbar,
  };
};
export const setTheme = (content: any) => {
  return {
    type: THEME,
    theme: content,
  };
};
export const setCampaignId = (content: any) => {
  return {
    type: CAMPAIGN,
    campaignId: content,
  };
};
