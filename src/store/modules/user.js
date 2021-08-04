import api from '@/api'
    const state = {
        isLoggedIn: false,
        userDetails: {}
    };

    const mutations = {
        setLoggedIn(state, payload) {
            state.isLoggedIn = payload;
        },
        setUserDetails(state, payload) {
            state.userDetails = payload
        }
    }
    const getters = {
        loggedIn(state) {
            return state.isLoggedIn;
        },
        userDetails(state) {
            return state.userDetails;
        }
    }

    const actions = {
        showUserInfo(context) {
            return new Promise((resolve, reject) => {
                api.get('user')
                    .then((response) => {
                        context.commit('setUserDetails', {
                            name: response.data.name,
                            id: response.data.id,
                            email: response.data.email,
                            country: response.data.country,
                            gender: response.data.gender,
                            address: response.data.address,
                            type: response.data.type,
                        })
                        localStorage.setItem('userID', response.data.id);
                        resolve(response)
                    })
                    .catch(((error) => {
                        reject(error)
                    }))
            })
        },
        registerUser(context, payload) {
            return new Promise((resolve, reject) => {
                api.post('register', payload)
                    .then((response) => {
                        console.log(payload)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        updateUser(context, payload) {
            return new Promise((resolve, reject) => {
                api.put('update-user', payload)
                    .then((response) => {
                        console.log(payload)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        loginUser(context, payload) {
            return new Promise((resolve, reject) => {
                  api.post('login', payload)
                  .then((response) => {
                        localStorage.setItem('token', response.data.token);
                        context.commit('setLoggedIn', true)
                        resolve(response)
                      })
                  .catch(error => {
                       reject(error)
                  })
            })
        },
        logoutUser(context) {
            return new Promise((resolve, reject) => {
                api.post('logout')
                    .then(() => {
                        localStorage.removeItem('token');
                        context.commit('setLoggedIn', false);
                        context.commit('setUserDetails', {});
                    } )
                    .catch(error => {
                        reject(error)
                    })

                resolve(true);
            })
        },
        setLoggedInState(context) {
            return new Promise((resolve) => {
                if(localStorage.getItem('token')) {
                    context.commit('setLoggedIn', true)
                    resolve(true)
                } else {
                    context.commit('setLoggedIn', false)
                    resolve(false)
                }
            })
        }
    }



export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

// import axios from 'axios'
//
// const state = {
//     rooms: []
// }
//
// const getters = {
//     allRooms: (state) => state.rooms
// }
//
// const actions = {
//     async fetchRooms({commit}) {
//         const response = await axios.get('http://127.0.0.1:8000/api/roomtypes');
//
//         commit('setRooms', response.data)
//     },
//     async addRoom({commit}, id, type_name, description) {
//        const response = await axios.post('http://127.0.0.1:8000/api/roomtypes', {
//           id,
//           type_name,
//           description
//        }).
//        then(response => console.log(response));
//        commit('newRoom', response.data);
//
//     },
// }
//
// const mutations = {
//     setRooms: (state, rooms) => (state.rooms = rooms),
//     newRoom: (state, room) => (state.rooms.unshift(room))
// }
//
//
// export default {
//     state,
//     getters,
//     actions,
//     mutations
// }