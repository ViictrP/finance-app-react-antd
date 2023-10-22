import invoke from 'react-native-webview-invoke/browser';

type SaveTokenFn = (token: string) => void;
type GetTokenFn = () => Promise<string>;
type DeleteTokenFn = () => void;
type SavePreferences = (preferences: string) => void;
type GetPreferences = () => Promise<string>;

const saveToken: SaveTokenFn = invoke.bind('saveToken');
const getToken: GetTokenFn = invoke.bind('getToken');
const deleteToken: DeleteTokenFn = invoke.bind('deleteToken');
const savePreferences: SavePreferences = invoke.bind('savePreferences');
const getPreferences: GetPreferences = invoke.bind('getPreferences');

export default {
  saveToken,
  getToken,
  deleteToken,
  savePreferences,
  getPreferences,
};
