
export default{
    
    computed: {
        otroDetallesUsuario(){
            if(this.$store.state.store.usuarios[this.$route.params.idUsuario]){
                return this.$store.state.store.usuarios[this.$route.params.idUsuario]
            }
            return {}
            
          }
    },
}