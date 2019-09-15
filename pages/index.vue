<template lang="pug">
    section.play.full
        Menu
        Tabletop
</template>

<script>
    import Menu from '@/components/Menu'
    import Tabletop from '@/components/Tabletop'

    export default {
        components: {
            Menu,
            Tabletop,
        },
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