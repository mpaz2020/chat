<template>
  <q-page ref="pageChat" class="page-chat flex column">
    <q-banner
      v-if="!otroDetallesUsuario.online"
      class="text-center bg-grey-4 fixed-top"
    >
      {{ otroDetallesUsuario.nombre }} esta Offline.
    </q-banner>

    <div
      :class="{ invisible: !showMensajes }"
      class="q-pa-md column col justify-end"
    >
      <q-chat-message
        v-for="(mensaje, key) in mensajes"
        :key="key"
        :name="
          mensaje.de == 'yo'
            ? detallesUsuario.nombre
            : otroDetallesUsuario.nombre
        "
        :text="[mensaje.texto]"
        :sent="mensaje.de == 'yo' ? true : false"
        :bg-color="mensaje.de == 'yo' ? 'white' : 'light-green-2'"
      />
    </div>

    <q-footer elevated>
      <q-toolbar>
        <q-form @submit="enviarMensaje" class="full-width">
          <div class="row">
            <div class="col-10">
              <q-input
                v-model="nuevoMensaje"
                ref="nuevoMensaje"
                bg-color="white"
                outlined
                rounded
                label="Mensaje"
                dense
              >
              </q-input>
            </div>
            <div class="col-2">
              <q-btn round dense flat type="submit" color="white" icon="send" />
            </div>
          </div>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import mixinDetallesOtroUsuario from "src/mixins/mixin-detalles-otro-usuario.js";

export default {
  mixins: [mixinDetallesOtroUsuario],

  data() {
    return {
      nuevoMensaje: "",
      showMensajes: false
    };
  },

  computed: {
    ...mapState("store", ["mensajes", "detallesUsuario"])
  },

  methods: {
    ...mapActions("store", [
      "firebaseGetMensajes",
      "firebaseStopGettingMensajes",
      "firebaseEnviarMensaje"
    ]),

    enviarMensaje() {
      this.firebaseEnviarMensaje({
        mensaje: {
          texto: this.nuevoMensaje,
          de: "yo"
        },
        idOtroUsuario: this.$route.params.idUsuario
      });
      this.limpiarMensaje();
    },

    limpiarMensaje() {
      this.nuevoMensaje = "";
      this.$refs.nuevoMensaje.focus();
    },

    scrollToBottom() {
      let pageChat = this.$refs.pageChat.$el;
      setTimeout(() => {
        window.scrollTo(0, pageChat.scrollHeight);
      }, 20);
    }
  },

  watch: {
    mensajes: function(val) {
      if (Object.keys(val).length) {
        this.scrollToBottom();
        setTimeout(() => {
          this.showMensajes = true;
        }, 200);
      }
    }
  },

  mounted() {
    //console.log(this.$route.params.idUsuario)
    this.firebaseGetMensajes(this.$route.params.idUsuario);
  },

  destroyed() {
    this.firebaseStopGettingMensajes();
  }
};
</script>

<style lang="scss">
.page-chat {
  background: #e2dfd5;
  &:after {
    content: "";
    display: block;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    opacity: 0.1;
    background-image: radial-gradient(
        circle at 100% 150%,
        silver 24%,
        white 24%,
        white 28%,
        silver 28%,
        silver 36%,
        white 36%,
        white 40%,
        transparent 40%,
        transparent
      ),
      radial-gradient(
        circle at 0 150%,
        silver 24%,
        white 24%,
        white 28%,
        silver 28%,
        silver 36%,
        white 36%,
        white 40%,
        transparent 40%,
        transparent
      ),
      radial-gradient(
        circle at 50% 100%,
        white 10%,
        silver 10%,
        silver 23%,
        white 23%,
        white 30%,
        silver 30%,
        silver 43%,
        white 43%,
        white 50%,
        silver 50%,
        silver 63%,
        white 63%,
        white 71%,
        transparent 71%,
        transparent
      ),
      radial-gradient(
        circle at 100% 50%,
        white 5%,
        silver 5%,
        silver 15%,
        white 15%,
        white 20%,
        silver 20%,
        silver 29%,
        white 29%,
        white 34%,
        silver 34%,
        silver 44%,
        white 44%,
        white 49%,
        transparent 49%,
        transparent
      ),
      radial-gradient(
        circle at 0 50%,
        white 5%,
        silver 5%,
        silver 15%,
        white 15%,
        white 20%,
        silver 20%,
        silver 29%,
        white 29%,
        white 34%,
        silver 34%,
        silver 44%,
        white 44%,
        white 49%,
        transparent 49%,
        transparent
      );
    background-size: 100px 50px;
  }
}
.q-banner {
  top: 50px;
  z-index: 2;
  opacity: 0.8;
}
.q-mensaje {
  z-index: 1;
}
</style>
