import { createStore } from "vuex";

const storagePlugin = store => {
 
    window.addEventListener('storage', event => {
      if (event.key === 'email') {
        const prevId = store.state.email
        store.commit('login',prevId)
      }
    })
  }
export default  createStore({
    state:{
        id:"",
        email:"",
        prevId: '' ,
        token: "",
    },
    getters:{

    },
    mutations:{
        login(state,email){
            state.email = email;
            localStorage.setItem('email',email);
   
        },login2(state,id){
            state.id = id
            localStorage.setItem('id',id);
        },
        token(state,token){
            state.token = token
            localStorage.setItem('token',token);
        },logout(state){
            state.email="";
            state.id ="";
            localStorage.removeItem('token')
            localStorage.removeItem("email");
            localStorage.removeItem('cart')
            localStorage.removeItem('id')
        },
        initializeStore(state){
            if(localStorage.getItem('email')){
                state.email = localStorage.getItem('email');
            }
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