<template lang="pug">
    section

</template>

<script>
    import Vue from 'vue'
    // import Card from './card'

    export default {
        // components: {
        //     Card
        // },

        data () {
            return {
                cards: []
            }
        },
        
        async mounted ( ) {
            const { success, cards, message } = await this.api('cards')
            if (success) Vue.set(this, 'cards', cards)
            else if (message) alert(message)
        }    
    }
</script>