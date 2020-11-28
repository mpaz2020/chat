<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          class="absolute-left"
          v-go-back.single
          flat
          dense
          icon="arrow_back"
          label="Atras"
        />

        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

        <q-btn
          v-if="!detallesUsuario.idUsuario"
          to="/auth"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
          label="Login"
        />
        <q-btn
          v-else
          @click="logoutUsuario"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
        >
          Logout <br />
          {{ detallesUsuario.nombre }}
        </q-btn>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import mixinDetallesOtroUsuario from "src/mixins/mixin-detalles-otro-usuario.js";

export default {
  mixins: [mixinDetallesOtroUsuario],

  computed: {
    ...mapState("store", ["detallesUsuario"]),

    title() {
      let currenntPath = this.$route.fullPath;
      if (currenntPath === "/") return "SmackChat";
      else if (currenntPath.includes("/chat"))
        return this.otroDetallesUsuario.nombre;
      else if (currenntPath === "/auth") return "Login";

      return "";
    }
  },

  methods: {
    ...mapActions("store", ["logoutUsuario"])
  }
};
</script>

<style lang="scss">
.q-toolbar {
  .q-btn {
    line-height: 1.2;
  }
}
</style>
