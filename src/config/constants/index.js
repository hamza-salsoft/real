export const SITE_NAME = "Real Money Dragon";

const { NODE_ENV } = process.env;
const { hostname } = window.location;

const servers = {
  local: "http://localhost:3032",
  customDev: "https://react.customdev.solutions:3032",
  live: "https://realmoneydragon.io:3032",
  dummy: "https://6691-110-93-244-176.ngrok-free.app",
};

var URL;
if (NODE_ENV === "production" && hostname.includes("react.customdev.solutions"))
  URL = servers.customDev;
else if (NODE_ENV === "production" && hostname.includes("realmoneydragon.io"))
  URL = servers.live;
else URL = servers.local;

export const SOCKET_URL = `${URL}`;
export const BASE_URL = URL + "/api";
export const UPLOADS_URL = URL + "/";
export const UPLOADS_URL2 = URL + "/";

// export const BASE_URL = "https://react.customdev.solutions:3009/api";
// export const UPLOADS_URL = "https://react.customdev.solutions:3009/Uploads";
// export const UPLOADS_URL2 = "https://react.customdev.solutions:3009/";

export const AUTH = {
  signin: "/admin/auth/signin",
  signup: "/auth/signup",
  emailCode: "/auth/emailVerificationCode",
  verifyCode: "/auth/verifyRecoverCode",
  resetPassword: "/auth/resetPassword",
  updateProfile: "/user/profile",
  changePassword: "/admin/auth/changePassword",
};

export const USERS = {
  getAllUsers: "/admin/auth/getAllUsers",
  getUserById: "/admin/auth/getUserById/",
  toggleStatus: "/admin/auth/toggleStatus/",
};

export const COIN = {
  updateCoin: "/coins/update",
  redeemRequests: "/coins/redeem/requests",
  requestStatus: "/coins/redeem/request/status",
  coinRequests: "/coins/requests",
  coinRequestStatus: "/coins/request/status",
};

export const EMAIL = {
  getAllRequests: "/email/request",
  changeStatus: "/email/request/status",
}

export const CREDENTIALS = {
  getCredentials: "/paypal/keys",
  updateCredentials: "/paypal/keys",
};

export const ARTICLE = {
  addPremuimArticle: "/article/addMasonicArticle",
  addNonPremiumArticle: "/article/addNonMasonicArticle",
  getAllArticles: "/article/getAllArticles/",
};

export const ZOOMLIVE = {
  createMeeting: "/zoom/create-meeting",
};

export const ORDER = {
  getAllOrders: "/order",
  updateStatus: "/order/changeOrderStatus/",
  getOrderById: "/order/",
};

export const CATEGORY = {
  getAllCategories: "/category/getAllCategories",
  getCategoryById: "/category/getCategoryById/",
  deleteCategoryById: "/category/deleteCategory/",
  editCategoryById: "/category/editCategory/",
  addCategory: "/category/addCategory",
};

export const AD = {
  getAllAds: "/ad/getAllAds",
  getAdById: "/ad/getAdById/",
  toggleStatus: "/ad/toggleStatus/",
};

export const SERVICE = {
  addService: "/service/addService",
  updateService: "/service/updateService/",
  getAllServices: "/service/getAllServices",
  getServiceById: "/service/getServiceById/",
  deleteService: "/service/deleteService/",
  toggleStatus: "/service/toggleStatus",
};

export const EVENT = {
  addEvent: "/event/addEvent",
  updateEvent: "/event/updateEvent/",
  getAllEvents: "/event/getAllEvents",
  getEventById: "/event/getEventById/",
  deleteEvent: "/event/deleteEvent/",
  toggleStatus: "/event/toggleStatus",
};

export const PRODUCT = {
  addProduct: "/product",
  getAllProducts: "/product",
  getProductById: "/product/",
  deleteProduct: "/product/",
  editProduct: "/product/",
};
export const BOOK = {
  addBook: "/book/addBook",
  updateBook: "/book/updateBook/",
  getAllBooks: "/book/getAllBooks",
  getBookById: "/book/getBookById/",
  deleteBook: "/book/deleteBook/",
};

export const QUESTION = {
  getAllQuestions: "/admin/user/getAllQuestions",
  getSingleQuestion: "/admin/user/getQuestionById/",
  editQuestion: "/admin/user/editQuestion/",
  addQuestion: "/admin/user/addQuestion",
};

export const CONTENT = {
  getAllContent: "/content/getAllContent",
  editHomeContent: "/content/home/editContent/",
  getHomeContent: "/content/home/getContent/",
  editAboutContent: "/content/about/editContent/",
  getAboutContent: "/content/about/getContent/",
  getTermsContent: "/content/termsAndConditions/getContent/",
  editTermsContent: "/content/termsAndConditions/editContent/",
};

export const SERVICE_PROVIDERS = {
  get: "/users/admin/serviceProvider",
  getOne: "/users/getSpById/",
  toggleStatus: "/users/toggleActiveInActive",
};

export const CATEGORIES = {
  get: "/category/GetAllCategoriesNew",
  getOne: "/category/admin/",
  toggleStatus: "/category/toggleActiveInActive",
  edit: "/category/edit/",
};

export const CONTACT = {
  getAllContacts: "/contact/getAllContacts",
  getContactById: "/contact/getContactbyId/",
};

export const RANK = {
  getAllRanks: "/rank/getAllRanks",
  createRank: "/rank/createRank",
  getRankById: "/rank/getRankById",
  editRank: "/rank/editRank/",
};

export const SUBSCRIPTION = {
  get: "/Plan",
  create: "/Plan",
  getOne: "/Plan/",
  edit: "/Plan/edit",
};

export const PAYMENT = {
  get: "/payment",
  getOne: "/payment/",
};

export const NOTIFICATION = {
  get: "/notification/getAllAlertsAndNotifications",
  getOne: "/notification/notificationDetail/",
  create: "/notification/createAlertOrAnnoucement",
};

export const QUERY = {
  get: "/query",
  getOne: "/query/queryById/",
};

// export const ARTICLE = {
//   get: "/article/getAllArticles",
//   getOne: "/article/getArticleById/",
//   add: "/article/addArticle",
//   edit: "/article/updateArticle/",
//   delete: "/article/deleteArticle/",
// };

export const ARTICLECATEGORIES = {
  get: "/articleCategory/getAllArticleCategories",
  getOne: "/articleCategory/getArticleCategoryById/",
  add: "/articleCategory/addArticleCategory",
  edit: "/articleCategory/updateArticleCategory/",
  delete: "/articleCategory/deleteArticelCategory/",
};

export const CONTENT_TYPE = {
  JSON: "application/json",
  FORM_DATA: "multipart/form-data",
};
