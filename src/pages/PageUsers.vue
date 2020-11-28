<template>
  <q-page class="flex q-pa-md">
    <q-list class="full-width" separator>
      <q-item
        v-for="(usuario, key) in usuarios"
        :key="key"
        :to="'/chat/'+key"
        class="q-my-sm"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ usuario.nombre.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ usuario.nombre }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="usuario.online ? 'light-green-5': 'grey-4' ">
            {{usuario.online ? 'Online' : 'Offline'}}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
 
  computed:{
    ...mapGetters('store',['usuarios'])
  }
};
</script>

<style lang="scss"></style>
