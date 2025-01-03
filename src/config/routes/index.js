import { BrowserRouter, Route, Routes } from "react-router-dom";

//views imports
import Dashboard from "../../views/dashboard";
import ForgotPassword from "../../views/forget-password-1";
import ForgotPassword2 from "../../views/forget-password-2";
import ForgotPassword3 from "../../views/forget-password-3";
import Signin from "../../views/signin";
import UserManagement from "../../views/user-management";
import UserDetails from "../../views/user-management/userDetails";


import Profile from "../../views/profile";
import ChangePass from "../../views/profile/changePass";
// import EditProfile from "../../views/profile/editProfile";

import CategoryAdd from "../../views/events/addNewEvent";
import CategoryEdit from "../../views/events/editEvent";
import CategoryManagement from "../../views/events/index";
import ShowCategory from "../../views/events/viewEvent";
import FeedbackManagement from "../../views/feedback-management";
import FeedbackDetails from "../../views/feedback-management/feedbackDetails";
import InventoryManagement from "../../views/inventory-management";
import Productadd from "../../views/inventory-management/addNewProduct";
import EditProduct from "../../views/inventory-management/editProduct";
import ViewProduct from "../../views/inventory-management/viewProduct";
import Notifications from "../../views/notifications";
import OrderManagement from "../../views/order-management";
import OrderDetails from "../../views/order-management/orderDetail";

//components imports
import UserAuthCheck, { SuperAdminAuthCheck } from "../../components/AuthCheck/UserAuthCheck";
// import AdminAuthCheck from "../../components/AuthCheck/AdminAuthCheck";
import ClientLayout from "../../components/ClientLayout";
import CoinRequests from "../../views/coin-requests";
import PaypalCredentials from "../../views/paypalCredentials";
import EditCredentials from "../../views/paypalCredentials/editCredentials";
import AddCoins from "../../views/user-management/addCoins";
import IncommingGoldCoins from "../../views/incommin-gold-coins";
import BankPayouts from "../../views/bank-payouts";
import TransactionLogs from "../../views/transaction-logs";
import EmailRequests from "../../views/email-requests";
import PostManagement from "../../views/post-management";
import ViewPost from "../../views/post-management/viewPost";
import PostAdd from "../../views/post-management/addNewPost";
import EditPost from "../../views/post-management/editPost";

import Chat from "../../views/chat";

const MyRouter = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
  
     <Routes>  
        <Route path="/signin" index element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password-2" element={<ForgotPassword2 />} />
        <Route path="/forgot-password-3" element={<ForgotPassword3 />} />
        <Route
          path="/"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{ title: "Dashboard", description: "Some Description." }}
                headerStyle={{ height: { base: "40px", md: 14 } }}
                activeTab="dashboard"
              >
                <Dashboard />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/user-management"
          activeTab="test"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "User Management",
                  description: "Some Description.",
                }}
              >
                <UserManagement />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/user-management/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "User Management",
                  description: "Some Description.",
                }}
              >
                <UserDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/user-management/update-coins/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Update Coins",
                  description: "Some Description.",
                }}
              >
                <AddCoins />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        {/* <Route
          path="/library"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "library",
                  description: "Some Description.",
                }}
              >
                <Library />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/library/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "View Library",
                  description: "Some Description.",
                }}
              >
                <ViewLibrary />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/library/addNewLibrary"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Library add",
                  description: "Some Description.",
                }}
              >
                <AddLibrary />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/library/editLibrary/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "edit Library",
                  description: "Some Description.",
                }}
              >
                <EditLibrary />
              </ClientLayout>
            </UserAuthCheck>
          }
        /> */}

        {/* <Route
          path="/Library/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Library",
                  description: "Some Description.",
                }}
              >
                <LibraryDetails/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/Library/addBook"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Library",
                  description: "Some Description.",
                }}
              >
                <Libraryadd/>
              </ClientLayout>
            </UserAuthCheck>
          }
        /> */}

        {/* <Route
          path="/payment-logs"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Payment Logs",
                  description: "Some Description.",
                }}
              >
                <PaymentLogs />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/masonic-community"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Member Community",
                  description: "Some Description.",
                }}
              >
                <MemberCommunity />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/non-masonic-community"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Non masonic Community",
                  description: "Some Description.",
                }}
              >
                <NonmasonicCommunity />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/non-masonic-community"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Member Community",
                  description: "Some Description.",
                }}
              >
                <MemberCommunity />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/masonic-articles"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Masonic Articles",
                  description: "Some Description.",
                }}
              >
                <MasonicArticles />
              </ClientLayout>
            </UserAuthCheck>
          }
        /> */}
        {/* <Route
          path="/non-masonic-articles"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "non Masonic Articles",
                  description: "Some Description.",
                }}
              >
                <NonMasonicArticles />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/religious-articles"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Religious Articles",
                  description: "Some Description.",
                }}
              >
                <ReligiousArticles />
              </ClientLayout>
            </UserAuthCheck>
          }
        /> */}
        <Route
          path="/feedback-management"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "User Management",
                  description: "Some Description.",
                }}
              >
                <FeedbackManagement />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/feedback-management/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "feedback Details",
                  description: "Some Description.",
                }}
              >
                <FeedbackDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/paypal-credentials"
          index
          element={
            <UserAuthCheck>
              <SuperAdminAuthCheck>
                <ClientLayout
                  head={{
                    title: "Paypal credentials",
                    description: "Some Description.",
                  }}
                >
                  <PaypalCredentials />
                </ClientLayout>
              </SuperAdminAuthCheck>
            </UserAuthCheck>
          }
        />
        <Route
          path="/paypal-credentials/edit-credentials"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Edit Paypal Credentials",
                  description: "Some Description.",
                }}
              >
                <EditCredentials />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        {/* <Route
          path="/rank-management"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Rank Management",
                  description: "Some Description.",
                }}
              >
                <RankManagement />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/rank-management/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "View Rank",
                  description: "Some Description.",
                }}
              >
                <ViewRank />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/rank-management/edit-rank/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Edit Rank",
                  description: "Some Description.",
                }}
              >
                <EditRank />
              </ClientLayout>
            </UserAuthCheck>
          }
        /> */}

        {/* <Route
          path="/rank-management/add-rank"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Add Rank",
                  description: "Some Description.",
                }}
              >
                <AddRank />
              </ClientLayout>
            </UserAuthCheck>
          }
        /> */}
        <Route
          path="/inventory-management"
          index
          element={
            <UserAuthCheck>
              <SuperAdminAuthCheck>
                <ClientLayout
                  head={{
                    title: "Inventory Management",
                    description: "Some Description.",
                  }}
                >
                  <InventoryManagement />
                </ClientLayout>
              </SuperAdminAuthCheck>
            </UserAuthCheck>
          }
        />
        <Route
          path="/transaction-logs/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Transaction Logs",
                  description: "Some Description.",
                }}
              >
                <TransactionLogs />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        {/* <Route
          path="/online-services"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Online Services",
                  description: "Some Description.",
                }}
              >
                <OnlineServices />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/online-services/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "View Service",
                  description: "Some Description.",
                }}
              >
                <ViewService />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/online-services/addNewService"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Service add",
                  description: "Some Description.",
                }}
              >
                <AddService />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/online-services/editService/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "edit Service",
                  description: "Some Description.",
                }}
              >
                <EditService />
              </ClientLayout>
            </UserAuthCheck>
          }
        /> */}

        <Route
          path="/category-management"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Category",
                  description: "Some Description.",
                }}
              >
                <CategoryManagement />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/category-management/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "View Category",
                  description: "Some Description.",
                }}
              >
                <ShowCategory />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/category-management/addCategory"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Category add",
                  description: "Some Description.",
                }}
              >
                <CategoryAdd />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/category-management/editCategory/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "edit category",
                  description: "Some Description.",
                }}
              >
                <CategoryEdit />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/inventory-management/:id"
          index
          element={
            <UserAuthCheck>
              <SuperAdminAuthCheck>
                <ClientLayout
                  head={{
                    title: "View Product",
                    description: "Some Description.",
                  }}
                >
                  <ViewProduct />
                </ClientLayout>
              </SuperAdminAuthCheck>
            </UserAuthCheck>
          }
        />
        <Route
          path="/inventory-management/addNewProduct"
          index
          element={
            <UserAuthCheck>
              <SuperAdminAuthCheck>
                <ClientLayout
                  head={{
                    title: "Product add",
                    description: "Some Description.",
                  }}
                >
                  <Productadd />
                </ClientLayout>
              </SuperAdminAuthCheck>
            </UserAuthCheck>
          }
        />
        <Route
          path="/inventory-management/editProduct/:id"
          index
          element={
            <UserAuthCheck>
              <SuperAdminAuthCheck>
                <ClientLayout
                  head={{
                    title: "edit Product",
                    description: "Some Description.",
                  }}
                >
                  <EditProduct />
                </ClientLayout>
              </SuperAdminAuthCheck>
            </UserAuthCheck>
          }
        />
        <Route
          path="/order-management"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Order Management",
                  description: "Some Description.",
                }}
              >
                <OrderManagement />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/order-management/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Order Detail",
                  description: "Some Description.",
                }}
              >
                <OrderDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/bank-payouts/"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Bank Payouts",
                  description: "Some Description.",
                }}
              >
                <BankPayouts />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/incomming-gold-coins/"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Incoming Gold Coins",
                  description: "Some Description.",
                }}
              >
                <IncommingGoldCoins />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/coin-requests/"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Red Coin Requests",
                  description: "Some Description.",
                }}
              >
                <CoinRequests />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/email-requests/"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Email Change Requests",
                  description: "Some Description.",
                }}
              >
                <EmailRequests />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        {/* <Route
          path="/content-management"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Content Management",
                  description: "Some Description.",
                }}
              >
                <ContentManagement />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/content-management/home/edit/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Edit Home Content",
                  description: "Some Description.",
                }}
              >
                <EditHomeContent />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/content-management/about/edit/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Edit About Content",
                  description: "Some Description.",
                }}
              >
                <EditAboutContent />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/content-management/TermsAndConditions/edit/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Edit Terms and Conditions",
                  description: "Some Description.",
                }}
              >
                <EditTermsContent />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/content-management/addNewCategory"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Add Category",
                  description: "Some Description.",
                }}
              >
                <AddCategory />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/content-management/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "View Category",
                  description: "Some Description.",
                }}
              >
                <ViewCategory />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/ads-management/"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Ads Management",
                  description: "Some Description.",
                }}
              >
                <AdsManagement />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/ads-management/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Ad Details",
                  description: "Some Description.",
                }}
              >
                <AdDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        /> */}
        <Route
          path="/profile"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "profile",
                  description: "Some Description.",
                }}
              >
                <Profile />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        {/* <Route
            path="/profile/editProfile"
            index
            element={
              <UserAuthCheck>
                <ClientLayout
                  head={{
                    title: "EditProfile",
                    description: "Some Description.",
                  }}
                >
                  <EditProfile/>
                </ClientLayout>
              </UserAuthCheck>
            }
          /> */}
        <Route
          path="/profile/changePassword"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "ChangePass",
                  description: "Some Description.",
                }}
              >
                <ChangePass />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        {/*

        <Route
          path="/signUpForms"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "SignupForms",
                  description: "Some Description.",
                }}
              >
                <SignupForm />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/signUpForms/addQuestion"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "SignupForms",
                  description: "Some Description.",
                }}
              >
                <AddQuestion />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/signUpForms/editQuestion/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "SignupForms",
                  description: "Some Description.",
                }}
              >
                <EditQuestion />
              </ClientLayout>
            </UserAuthCheck>
          }
        /> */}

        <Route
          path="/notifications"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Notifications",
                  description: "Some Description.",
                }}
              >
                <Notifications />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/post-management"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Post Management",
                  description: "Some Description.",
                }}
              >
                <PostManagement />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/post-management/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "View Post",
                  description: "Some Description.",
                }}
              >
                <ViewPost />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/post-management/addNewPost"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Post add",
                  description: "Some Description.",
                }}
              >
                <PostAdd />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/post-management/editPost/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Edit Post",
                  description: "Some Description.",
                }}
              >
                <EditPost />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        {/* Chat */}

           <Route
          path="/chat"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Chat",
                  description: "Some Description.",
                }}
              >
                <Chat />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default MyRouter;
