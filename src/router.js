import { createBrowserRouter } from "react-router-dom";
import Signup from "./components/auth/Signup";
import App from "./App";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import ChangePassword from "./components/auth/ChangePassword";
import MovieListing from "./components/pages/MovieListing";
import MovieView from "./components/pages/movie view/MovieView";
import WatchList from "./components/pages/watch List/WatchList";
import WatchHistory from "./components/pages/watch_history/WatchHistory";
import SubscriptionCard from "./components/pages/subscription_card/SubscriptionCard";
import CheckoutPage from "./components/pages/plan_checkout_page/CheckoutPage";
import SubscriptionStatus from "./components/pages/subscription_status/SubscriptionStatus";
import SubscriptionPlanPage from "./components/pages/Subscription_plan_page/SubscriptionPlanPage";
import LandingPage from "./components/pages/Landing_Page/LandingPage";
import LinkExpired from "./components/auth/LinkExpired";


const router = createBrowserRouter([

    {path:'',element:<LandingPage/>},
    {path:'signup',element:<Signup/>},
    {path:'login',element:<Login/>},
    {path:'forgot-password',element:<ForgotPassword/>},
    {path:'reset-password/:token',element:<ResetPassword/>},
    {path:'link-expired',element:<LinkExpired/>},
    {path:'Change-password',element:<ChangePassword/>},
    {path:'movie-list',element:<MovieListing/>},
    {path:'movie-view/:movieId',element:<MovieView/>},
    {path:'watch-list',element:<WatchList/>},
    {path:'watch-history',element:<WatchHistory/>},
    {path:'subscription-plans',element:<SubscriptionPlanPage/>},
    {path:'subscription-view/:planId',element:<CheckoutPage/>},
    {path:'subscription-status',element:<SubscriptionStatus/>},





]);

export default router;