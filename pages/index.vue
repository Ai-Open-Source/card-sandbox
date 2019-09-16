<template lang="pug">
    section.play.full(v-if="logged_in")
        Menu
        Tabletop
</template>

<script>
    import Vue from 'vue'

    import Menu from '@/components/Menu'
    import Tabletop from '@/components/Tabletop'

    export default {
        components: {
            Menu,
            Tabletop,
        },

        data () {
            return {
                logged_in: false
            }
        },

        async mounted () {
            const { success } = await this.api('discord/refresh')

            if ( !success ) this.$router.push('/login')

            Vue.set(this, 'logged_in', success)
        }
    }
</script>

<style lang="sass" scoped>
    section.play
        width: 100%
        display: flex
        flex-direction: row
        align-items: stretch
        justify-content: center
</style>