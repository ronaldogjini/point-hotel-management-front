import Vue from 'vue'
import Router from 'vue-router';
import store from '@/store/index'
import NotFound from '../components/Errors/NotFound404'

Vue.use(Router)

const routes= [
        {
            path: '/',
            name: 'Mainpage',
            component: () => import(/* webpackChunkName: "mainpage" */ '../components/Homepage/Mainpage')
        },
        {
            path: '/profile/details',
            name: 'Profile',
            component: () => import(/* webpackChunkName: "profile" */ '../components/Profile/Profile'),
            meta: {requiresAuth: true}
        },
        {
            path: '/profile/edit',
            name: 'EditProfile',
            component: () => import(/* webpackChunkName: "edit-profile" */ '../components/Profile/EditProfile'),
            meta: {requiresAuth: true}
        },
        {
            path: '/profile/change-password',
            name: 'ChangePassword',
            component: () => import(/* webpackChunkName: "change-password" */ '../components/Profile/ChangePassword'),
            meta: {requiresAuth: true}
        },
        {
            path: '/profile/bookings',
            name: 'Bookings',
            component: () => import(/* webpackChunkName: "bookings" */ '../components/Profile/ProfileBookings'),
            meta: {requiresAuth: true}
        },
        {
            path: '/bookings/:id',
            name: 'BookingDetails',
            component: () => import(/* webpackChunkName: "booking-details" */ '../components/Profile/BookingDetails'),
            meta: {requiresAuth: true}
        },
        {
            path: '/rooms',
            name: 'RoomTypes',
            component: () => import(/* webpackChunkName: "roomtypes" */ '../components/RoomTypes/RoomTypes'),
        },
        {
            path: '/login/',
            name: 'Login',
            component: () => import(/* webpackChunkName: "login" */ '../components/Authentication/login'),
            meta: {requiresGuest: true}
        },
        {
            path: '/register/',
            name: 'Register',
            component: () => import(/* webpackChunkName: "register" */ '../components/Authentication/register'),
            meta: {requiresGuest: true}
        },
        {
            path: '/reservation',
            name: 'Reservation',
            component: () => import(/* webpackChunkName: "reservation" */ '../components/Reservation/MakeReservationPage'),
            meta: {requiresAuth: true}
        },
        {
            path: '/reserve',
            name: 'Reserve',
            component: () => import(/* webpackChunkName: "reserve" */ '../components/Reservation/Reservation'),
            meta: {requiresAuth: true}
        },
        {
            path: '/confirmreservation',
            name: 'ConfirmReservation',
            component: () => import(/* webpackChunkName: "confirmreservation" */ '../components/Reservation/ConfirmReservation'),
            meta: {requiresAuth: true}
        },
        {
            path: '/admin/housekeepers',
            name: 'AdminHousekeepers',
            component: () => import(/* webpackChunkName: "admin-housekeepers" */ '../components/Admin/AdminHousekeepers/AdminHousekeepers'),
            meta: {requiresAdmin: true}

        },
        {
            path: '/admin/housekeepers/new',
            name: 'AdminHousekeepersNew',
            component: () => import(/* webpackChunkName: "admin-housekeepers-new" */ '../components/Admin/AdminHousekeepers/NewHousekeeper'),
            meta: {requiresAdmin: true}
        },
        {
            path: '/admin/rooms',
            name: 'AdminRooms',
            component: () => import(/* webpackChunkName: "admin-rooms" */ '../components/Admin/AdminRooms/AdminRooms'),
            meta: {requiresAdmin: true}

        },
        {
            path: '/admin/rooms/new',
            name: 'AdminRoomsNew',
            component: () => import(/* webpackChunkName: "admin-rooms-new" */ '../components/Admin/AdminRooms/NewRoom'),
            meta: {requiresAdmin: true}
        },
        {
            path: '/admin/rooms/:id',
            name: 'AdminRoomsView',
            component: () => import(/* webpackChunkName: "admin-rooms-edit" */ '../components/Admin/AdminRooms/ViewRoom'),
            meta: {requiresAdmin: true}
        },
        {
            path: '/admin/roomtypes',
            name: 'AdminRoomTypes',
            component: () => import(/* webpackChunkName: "admin-roomtypes" */ '../components/Admin/AdminRoomTypes/AdminRoomTypes'),
            meta: {requiresAdmin: true}
        },
        {
            path: '/admin/roomtypes/new',
            name: 'AdminRoomtypesNew',
            component: () => import(/* webpackChunkName: "admin-roomtypes-new" */ '../components/Admin/AdminRoomTypes/NewRoomType'),
            meta: {requiresAdmin: true}
        },
        {
            path: '/admin/roomtypes/:id',
            name: 'AdminRoomTypesView',
            component: () => import(/* webpackChunkName: "admin-roomtypes-view" */ '../components/Admin/AdminRoomTypes/ViewRoomType'),
            meta: {requiresAdmin: true}
        },
        {
            path: '/admin/bookings',
            name: 'AdminBookings',
            component: () => import(/* webpackChunkName: "admin-bookings" */ '../components/Admin/AdminBookings/AdminBookings'),
            meta: {requiresAdmin: true}
        },
        {
            path: '/admin/receptionists',
            name: 'AdminReceptionists',
            component: () => import(/* webpackChunkName: "admin-receptionists" */ '../components/Admin/AdminReceptionists/AdminReceptionists'),
            meta: {requiresAdmin: true}
        },
        {
            path: '/admin/receptionists/new',
            name: 'AdminReceptionistsNew',
            component: () => import(/* webpackChunkName: "admin-receptionists-new" */ '../components/Admin/AdminReceptionists/NewReceptionist'),
            meta: {requiresAdmin: true}
        },
        {
            path: '/housekeepers',
            name: 'HousekeepersPanel',
            component: () => import(/* webpackChunkName: "housekeepers-panel" */ '../components/Housekeepers/HousekeeperPanel'),
            meta: {requiresHousekeeper: true}
        },
        {
            path: '/frontdesk',
            name: 'ReceptionistAllBookings',
            component: () => import(/* webpackChunkName: "receptionist-dashboard" */ '../components/Receptionists/ReceptionistDashboard'),
            meta: {requiresReceptionist: true}
        },
         {
             path: '/admin', redirect: { name: 'AdminBookings' }
         },
         {
             path: '/profile', redirect: { name: 'Profile' }
         },
        {
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: NotFound
        }
    ];

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach(async(to, from, next) => {

    await store.dispatch('user/setLoggedInState')

   if(store.getters['user/userDetails'].type === undefined && store.getters['user/loggedIn']) {
       await store.dispatch('user/showUserInfo')
   }

    if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (store.getters['user/userDetails'].type !== 3) {
            next({
                name: 'Mainpage'
            })
        } else {
            next();
        }
    }

    if (to.matched.some(record => record.meta.requiresHousekeeper)) {
        if (store.getters['user/userDetails'].type !== 2) {
            next({
                name: 'Mainpage'
            })
        } else {
            next();
        }
    }

    if (to.matched.some(record => record.meta.requiresGuest)) {
        if (store.getters['user/loggedIn']) {
            next({
                name: 'Mainpage'
            })
        } else {
            next();
        }
    }

    if (to.matched.some(record => record.meta.requiresReceptionist)) {
        if (store.getters['user/userDetails'].type !== 1) {
            next({
                name: 'Mainpage'
            })
        } else {
            next();
        }
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters['user/loggedIn']) {
            next({
                name: 'Login'
            })
        } else {
            next();
        }
    }
    next();
});


export default router;
