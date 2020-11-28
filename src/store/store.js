import Vue from "vue";
import { firebaseAuth, firebaseDb } from "boot/firebase";

let refMensaje;

const state = {
  detallesUsuario: {},
  usuarios: {},
  mensajes: {}
};
const mutations = {
  setDetallesUsuario(state, usuario) {
    state.detallesUsuario = usuario;
  },

  agregarUsuario(state, usuario) {
    
    Vue.set(state.usuarios, usuario.idUsuario, usuario.detallesUsuario);
  },

  actualizarUsuario(state, usuario) {
    Object.assign(state.usuarios[usuario.idUsuario], usuario.detallesUsuario);
  },

  agregarMensaje(state, mensaje) {
    Vue.set(state.mensajes, mensaje.idMensaje, mensaje.detalleMensaje);
  },

  limpiarMensajes(state) {
    state.mensajes = {};
  }
};
const actions = {
  registrarUsuario({}, usuario) {
    
    firebaseAuth
      .createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then(response => {
        
        let idUsuario = firebaseAuth.currentUser.uid;
        firebaseDb.ref("usuarios/" + idUsuario).set({
          nombre: usuario.nombre,
          email: usuario.email,
          online: true
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  },
  loginUsuario({}, usuario) {
    firebaseAuth
      .signInWithEmailAndPassword(usuario.email, usuario.password)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.message);
      });
  },

  logoutUsuario() {
    firebaseAuth.signOut();
  },

  handleAuthStateChanged({ commit, dispatch, state }) {
    firebaseAuth.onAuthStateChanged(usuario => {
      if (usuario) {        
          
          let idUsuario = firebaseAuth.currentUser.uid;
          firebaseDb.ref("usuarios/" + idUsuario).once("value", snapshot => {
            
            let detallesUsuario = snapshot.val();
            
            commit("setDetallesUsuario", {
              nombre: detallesUsuario.nombre,
              email: detallesUsuario.email,
              idUsuario: idUsuario
            });
          });

          dispatch("firebaseActualizarUsuario", {
            idUsuario: idUsuario,
            updates: {
              online: true
            }
          });
          dispatch("firebaseGetUsuarios");
          this.$router.push("/");
          // User is signed in.
        
      } else {
        
          dispatch("firebaseActualizarUsuario", {
            idUsuario: state.detallesUsuario.idUsuario,
            updates: {
              online: false
            }
          });
          commit("setDetallesUsuario", {});
          this.$router.replace("/auth");
      }
    });
  },

  firebaseActualizarUsuario({}, usuario) {
    if(usuario.idUsuario){
      
      firebaseDb.ref("usuarios/" + usuario.idUsuario).update(usuario.updates);
    }
  },

  firebaseGetUsuarios({ commit }) {
    firebaseDb.ref("usuarios").on("child_added", snapshot => {
      let idUsuario = snapshot.key;
      let detallesUsuario = snapshot.val();
      commit("agregarUsuario", {
        idUsuario,
        detallesUsuario
      });
    });

    firebaseDb.ref("usuarios").on("child_changed", snapshot => {
      let idUsuario = snapshot.key;
      let detallesUsuario = snapshot.val();
      commit("actualizarUsuario", {
        idUsuario,
        detallesUsuario
      });
    });
  },

  firebaseGetMensajes({ commit, state }, idUsuario) {
    let idUsuario1 = state.detallesUsuario.idUsuario;
    refMensaje = firebaseDb.ref("chats/" + idUsuario1 + "/" + idUsuario);
    refMensaje.on("child_added", snapshot => {
      let detalleMensaje = snapshot.val();
      let idMensaje = snapshot.key;
      commit("agregarMensaje", {
        idMensaje,
        detalleMensaje
      });
    });
  },

  firebaseStopGettingMensajes({ commit }) {
    
    if (refMensaje) {
      commit("limpiarMensajes");
    }
    refMensaje.off("child_added");
  },

  firebaseEnviarMensaje({ state }, mensaje) {
    firebaseDb
      .ref(
        "chats/" + state.detallesUsuario.idUsuario + "/" + mensaje.idOtroUsuario
      )
      .push(mensaje.mensaje);
    mensaje.mensaje.de = "ellos";
    firebaseDb
      .ref(
        "chats/" + mensaje.idOtroUsuario + "/" + state.detallesUsuario.idUsuario
      )
      .push(mensaje.mensaje);
  }
};
const getters = {
  usuarios: state => {
    let usuariosFiltrados = {};
    Object.keys(state.usuarios).forEach(key => {
      if (key !== state.detallesUsuario.idUsuario) {
        usuariosFiltrados[key] = state.usuarios[key];
      }
    });
    return usuariosFiltrados;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};