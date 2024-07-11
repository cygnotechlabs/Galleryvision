const ENV = "development"; // Change this to "development", "production" or "staging" as needed

const URLS = {
  development: import.meta.env.VITE_REACT_APP_DEVELOPMENT as string,
  staging: import.meta.env.VITE_REACT_APP_STAGING as string,
  production: import.meta.env.VITE_REACT_APP_PRODUCTION as string,
};

const BASE_URL = URLS[ENV];

const API_ENDPOINTS = {
  // Channel Routes
  ADD_CHANNEL: `${BASE_URL}/add-channel`,
  ASSIGN_CHANNEL: `${BASE_URL}/assign-channel`,
  GET_LINKED_CHANNEL: `${BASE_URL}/get-linked-channel`,
  GET_UNLINKED_CHANNEL: `${BASE_URL}/get-unlinked-channel`,
  GET_CHANNEL: `${BASE_URL}/get-channel`,
  VIEW_CHANNEL: (id: string) => `${BASE_URL}/view-channel/${id}`,
  REMOVE_CHANNEL: (id: string) => `${BASE_URL}/remove-channel/${id}`,
  UPDATE_CHANNEL: (id: string) => `${BASE_URL}/update-channel/${id}`,
  VIEW_RAWCHANNEL: (id: string) => `${BASE_URL}/view-rawchannel/${id}`,
  GET_CHANNEL_INVOICE_ID: `${BASE_URL}/get-channel-invoice-for-channel`,

  // Licensor Routes
  ADD_LICENSOR: `${BASE_URL}/add-licensor`,
  GET_LICENSOR: `${BASE_URL}/get-licensor`,
  VIEW_LICENSOR: (id: string) => `${BASE_URL}/view-licensor/${id}`,
  REMOVE_LICENSOR: (id: string) => `${BASE_URL}/remove-licensor/${id}`,
  UPDATE_LICENSOR: (id: string) => `${BASE_URL}/update-licensor/${id}`,

  // Music Routes
  GET_RAWMUSIC: `${BASE_URL}/get-rawmusic`,
  VIEW_RAWMUSIC: (id: string) => `${BASE_URL}/view-rawmusic/${id}`,
  GET_LINKEDMUSIC: `${BASE_URL}/get-linked-music`,
  ADD_MUSIC: `${BASE_URL}/add-music`,
  DEL_MUSIC: (id: string) => `${BASE_URL}/remove-music/${id}`,
  UPDATE_MUSIC: (id: string) => `${BASE_URL}/update-music/${id}`,
  VIEW_MUSIC: (id: string) => `${BASE_URL}/view-music/${id}`,
  ASSIGN_MUSIC: `${BASE_URL}/assign-music`,

  // Music Invoice Routes
  GENERATE_MUSIC_INVOICE: `${BASE_URL}/generate-music-invoice`,
  GET_MUSIC_INVOICE: `${BASE_URL}/get-music-invoice`,
  VIEW_MUSIC_INVOICE: (id: string) => `${BASE_URL}/view-music-invoice/${id}`,

  // Channel Invoice Routes
  GENERATE_CHANNEL_INVOICE: `${BASE_URL}/generate-channel-invoice`,
  GET_CHANNEL_INVOICE: `${BASE_URL}/get-channel-invoice`,
  VIEW_CHANNEL_INVOICE: (id: string) =>
    `${BASE_URL}/view-channel-invoice/${id}`,

  // Login Route
  LOGIN: `${BASE_URL}/login`,
  LOGIN_TEST: `${BASE_URL}/login-test`,
  OPT_CHECKING: `${BASE_URL}/verify-otp`,

  // Upload File
  UPLOADCHANNEL: `${BASE_URL}/channel/importChannel`,
  UPLOADMUSIC: `${BASE_URL}/music/importMusic`,
  UPLOADREPORT: `${BASE_URL}/report/importReport`,

  // Currency Conversion
  CURRENCY_CONVERSION: `${BASE_URL}/add-currency`, // Fixed typo here
  GET_CURRENCY: `${BASE_URL}/get-currency`,
  VIEW_CURRENCY: `${BASE_URL}/view-all-currency`,

  // Payment
  GET_PAYMENT: `${BASE_URL}/get-payment`,
  CHANGE_STATUS: (id: string) => `${BASE_URL}/change-invoice-status/${id}`,

  // Dashboard
  VIEW_COUNT: `${BASE_URL}/view-count`,
  GET_DASHBOARD: `${BASE_URL}/get-dashboard`,
  GET_ONE_DASHBOARD:(id: string) => `${BASE_URL}/get-one-dashboard/${id}`,
  VIEW_STAT:`${BASE_URL}/view-stat`,
  CHANNEL_STAT:`${BASE_URL}/view-channel-stat`,
  MUSIC_STAT:`${BASE_URL}/view-music-stat`,

  //Bulk Invoice Sending
  MAIL_INVOICE: `${BASE_URL}/mail-invoice`,

  //Single Invoice
  DOWNLOAD_INVOICE_PDF: `${BASE_URL}/download-invoice`,

  //Tax
  ADD_TAX: `${BASE_URL}/add-tax`,
  GET_TAX: `${BASE_URL}/get-tax`,
  VIEW_TAX: `${BASE_URL}/view-all-tax`,
};

export default API_ENDPOINTS;
