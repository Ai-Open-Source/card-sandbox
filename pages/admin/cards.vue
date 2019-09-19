<template lang="pug">
    section.cardManager
        .cards
            .card(v-for="card in cards")
                img(:src="`/api/media/${card.uuid}.png`")
            .card(v-for="card in cards")
                img(:src="`/api/media/${card.uuid}.png`")
            .card(v-for="card in cards")
                img(:src="`/api/media/${card.uuid}.png`")
            .card(v-for="card in cards")
                img(:src="`/api/media/${card.uuid}.png`")
</template>

<script>
    import Vue from 'vue'

    export default {
        layout: 'Admin',

        data () {
            return {
                cards: []
            }
        },

        async mounted () {
            const { success, cards } = await this.api('cards')
            if ( success ) Vue.set(this, 'cards', cards)
        }
    }
</script>

<style lang="sass">
    section.cardManager
        padding: 2rem
        padding-bottom: 0

        .cards
            display: flex
            justify-content: space-between
            align-items: flex-start
            flex-wrap: wrap
            width: 100%
            height: 100%

        .card
            width: calc(23% - 0.5rem)
            padding-top: calc(30% - 1rem)
            height: 0
            position: relative
            cursor: pointer

            img
                position: absolute
                height: 100%
                width: 100%
                object-fit: contain
                top: 0
                left: 0
                border: 1px solid var(--border)
                background-color: var(--background)

                &:hover
                    filter: brightness(120%)
        
</style>