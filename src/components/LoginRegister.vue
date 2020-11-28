<template>
  <q-form
  @submit="submitForm">
    <q-input 
    v-if="tab=='register'"
    v-model="formData.nombre"
    outlined 
    class="q-mb-md"    
    type="text" 
    label="Nombre" />

    <q-input 
    outlined 
    class="q-mb-md"
    v-model="formData.email" 
    type="email"
    label="Email" />

    <q-input 
    outlined 
    class="q-mb-md"
    v-model="formData.password" 
    type="password" 
    label="Password" />

    <div class="row">
        <q-space />
      <q-btn     
      color="primary"
      type="submit"
      :label="tab"  />
    </div>
  </q-form>
</template>

<script>

import {mapActions} from 'vuex';

export default {
    props:['tab'],
    data() {
        return {

            formData:{
                nombre:'',
                email:'',
                password:''
            }
        }
    },
    methods:{
        ...mapActions('store',['registrarUsuario','loginUsuario']),

        submitForm(){
            if (this.tab=='login') {
                this.loginUsuario(this.formData)
            }
            else{
                this.registrarUsuario(this.formData)            
            }
        }
    }

}
</script>

<style></style>
