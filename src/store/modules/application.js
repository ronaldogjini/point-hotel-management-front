
    const state = {
        notifications: []
    };

    const mutations = {
        addNotification(state, payload) {
            state.notifications.push(payload);
        },
        removeNotification(state, payload) {
          state.notifications.splice(payload, 1);
        }
    }

    const getters = {
        notifications(state) {
            return state.notifications;
        }
    }

    const actions = {
        addNotification(context, payload) {
            return new Promise((resolve) => {
                context.commit('addNotification', payload);
                resolve(true);
            })
        },
        removeNotification(context, payload) {
            return new Promise((resolve) => {
                context.commit('removeNotification', payload);
                resolve(true);
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