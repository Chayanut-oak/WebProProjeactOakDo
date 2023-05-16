import { createStore } from "vuex";

const storagePlugin = store => {
 
    window.addEventListener('storage', event => {
      if (event.key === 'token') {
        const prevId = store.state.token
        store.commit('token',prevId)
      }
    })
  }
export default  createStore({
    state:{
        id:"",
        prevId: '' ,
        token: "",
    },
    getters:{

    },
    mutations:{login2(state,id){
            state.id = id
            localStorage.setItem('id',id);
        },
        token(state,token){
            state.token = token
            localStorage.setItem('token',token);
        },logout(state){
            state.id ="";
            state.token="";
            localStorage.removeItem('email')
            localStorage.removeItem('token')
            localStorage.removeItem('cart')
            localStorage.removeItem('id')
        },
        initializeStore(state){

            if(localStorage.getItem('id')){
                state.id = localStorage.getItem('id');
            }
            if(localStorage.getItem('token')){
                state.token = localStorage.getItem('token');
            }
        }
    },
    actions:{

    },  plugins: [storagePlugin],
    modules:{

    }
})