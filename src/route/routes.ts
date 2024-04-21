import Loadable from 'react-loadable';
import LoadableLoading from 'route/components/LoadableLoading';
import routeConstants from 'route/routeConstant';

interface CommonRoute {
    name: string;
    path: string;
    authorization?: boolean;
    childRoutes?: Route[];
}

interface RedirectRoute extends CommonRoute {
    redirect: string;
}

interface ComponentRoute extends CommonRoute {
    Component: any;
}

type Route = RedirectRoute | ComponentRoute;

const commonLoadable = (loader: any) =>
    Loadable({
        loader,
        loading: LoadableLoading,
    });

const routes: Array<Route> = [
    // {
    //     name: '404',
    //     path: '*',
    //     redirect: routeConstants.LOGIN,
    // },
    {
        name: 'Register',
        path: routeConstants.REGISTER,
        Component: commonLoadable(() => import('views/Register')),
    },
    {
        name: 'Login',
        path: routeConstants.LOGIN,
        Component: commonLoadable(() => import('views/Login')),
    },
    {
        name: 'ForgotPassword',
        path: routeConstants.FORGOT_PASSWORD,
        Component: commonLoadable(() => import('views/ForgotPassword')),
    },
    {
        name: 'ResetPassword',
        path: routeConstants.RESET_PASSWORD,
        Component: commonLoadable(() => import('views/ResetPassword')),
    },
    {
        name: 'User Home Page',
        path: routeConstants.USER_HOME_PAGE,
        Component: commonLoadable(() => import('views/UserHomePage')),
    },
    {
        name: 'Cart Page',
        path: routeConstants.CART,
        Component: commonLoadable(() => import('views/CartPage')),
        authorization: true,
    },
    {
        name: 'Fill Information Page',
        path: routeConstants.FILL_INFORMATION,
        Component: commonLoadable(() => import('views/FillInformationPage')),
        authorization: true,
    },
    {
        name: 'Find Tour Page',
        path: routeConstants.FIND_TOUR,
        Component: commonLoadable(() => import('views/FindTourPage')),
    },
    {
        name: 'Custom Tour Page',
        path: routeConstants.CUSTOM_TOUR,
        Component: commonLoadable(() => import('views/CustomTourPage')),
        authorization: true,
    },
    {
        name: 'Search Results Page',
        path: routeConstants.SEARCH_RESULTS,
        Component: commonLoadable(() => import('views/SearchResultsPage')),
    },
    {
        name: 'User Profile Page',
        path: routeConstants.USER_PROFILE,
        Component: commonLoadable(() => import('views/UserProfilePage')),
        authorization: true,
    },
    {
        name: 'User Change Password Page',
        path: routeConstants.USER_CHANGE_PASSWORD,
        Component: commonLoadable(() => import('views/UserChangePasswordPage')),
        authorization: true,
    },
    {
        name: 'Love List Page',
        path: routeConstants.LOVE_LIST,
        Component: commonLoadable(() => import('views/LoveListPage')),
        authorization: true,
    },
    {
        name: 'Admin Homepage',
        path: routeConstants.ADMIN_HOMEPAGE,
        Component: commonLoadable(() => import('views/AdminHomePage')),
    },
    {
        name: 'Admin Manage Tours',
        path: routeConstants.ADMIN_MANAGE_TOURS,
        Component: commonLoadable(() => import('views/AdminManageTours')),
    },
    {
        name: 'Admin Manage Tour Guide',
        path: routeConstants.ADMIN_MANAGE_TOUR_GUIDE,
        Component: commonLoadable(() => import('views/AdminManageTourGuide')),
    },
    {
        name: 'Admin Assign New Task',
        path: routeConstants.ADMIN_ASSIGN_NEW_TASK,
        Component: commonLoadable(() => import('views/AdminAssignTask')),
    },
    {
        name: 'Admin Add New Tour',
        path: routeConstants.ADMIN_ADD_NEW_TOUR,
        Component: commonLoadable(() => import('views/AdminAddNewTour')),
    },
    {
        name: 'Admin Edit Tour',
        path: routeConstants.ADMIN_EDIT_TOUR,
        Component: commonLoadable(() => import('views/AdminEditTour')),
    },
    {
        name: 'Admin Notification',
        path: routeConstants.ADMIN_NOTIFICATION,
        Component: commonLoadable(() => import('views/AdminNotification')),
    },
    {
        name: 'Admin Manage Notification',
        path: routeConstants.ADMIN_MANAGE_NOTIFICATION,
        Component: commonLoadable(
            () => import('views/AdminManageNotification')
        ),
    },
    {
        name: 'Admin Manage Tourist',
        path: routeConstants.ADMIN_MANAGE_TOURIST,
        Component: commonLoadable(() => import('views/AdminManageTourist')),
    },
    {
        name: 'Weather Forecast',
        path: routeConstants.WEATHER_FORECAST,
        Component: commonLoadable(() => import('views/WeatherForecastPage')),
    },
    {
        name: 'Admin Weather Forecast',
        path: routeConstants.ADMIN_WEATHER_FORECAST,
        Component: commonLoadable(() => import('views/AdminWeatherForecast')),
    },
    {
        name: 'Schedule Detail Page',
        path: routeConstants.SCHEDULE_DETAIL,
        Component: commonLoadable(() => import('views/ScheduleDetailPage')),
    },
    {
        name: 'Tour Detail Page',
        path: routeConstants.DETAIL_TOUR,
        Component: commonLoadable(() => import('views/DetailTourPage')),
    },
    {
        name: 'Admin Schedule Page',
        path: routeConstants.ADMIN_SCHEDULE,
        Component: commonLoadable(() => import('views/AdminSchedule')),
    },
    {
        name: 'Admin Add New Voucher Page',
        path: routeConstants.ADMIN_ADD_NEW_VOUCHER,
        Component: commonLoadable(() => import('views/AdminAddNewVoucher')),
    },
    {
        name: 'Admin Manage Voucher Page',
        path: routeConstants.ADMIN_MANAGE_VOUCHER,
        Component: commonLoadable(() => import('views/AdminManageVouchers')),
    },
    {
        name: 'Payment Success Page',
        path: routeConstants.PAYMENT_SUCCESS,
        Component: commonLoadable(() => import('views/PaymentSuccess')),
        authorization: true,
    },
    {
        name: 'User Orders Page',
        path: routeConstants.USER_ORDERS,
        Component: commonLoadable(() => import('views/UserOders')),
        authorization: true,
    },
    {
        name: 'Admin Manage Custom Tours Page',
        path: routeConstants.ADMIN_MANAGE_CUSTOM_TOURS,
        Component: commonLoadable(() => import('views/AdminManageCustomTours')),
    },
];

export default routes;
