<template lang="pug">
    section.menu
        .nav
            div( 
                v-for="name in nav" 
                :key="name" 
                tag="div"
                :class="{ inactive: tab !== name }"
                @click="() => tab = name"
            )
                span {{ name }}

        CardMenu.CardMenu(v-show="tab === 'Cards'")
        SpreadsheetMenu.SpreadsheetMenu(v-show="tab === 'Spreadsheet'")
</template>

<style lang="sass">
    section.menu
        min-width: 300px
        width: 20rem
        background-color: var(--foreground)
        position: relative
        z-index: 3
        border-right: 1px solid var(--border)

        .nav
            height: 2rem
            display: flex

            div
                height: 100%
                width: 50%
                display: flex
                align-items: center
                justify-content: center
                pointer-events: none
                user-select: none
                font-size: 0.9rem
                border-bottom: 1px solid transparent
                border-top: 1px solid var(--border)

            div:not(:last-child)
                border-right: 1px solid var(--border)

            .inactive
                border-bottom: 1px solid var(--border)
                border-top: 1px solid transparent
                cursor: pointer
                pointer-events: all
                background-color: rgba(0,0,0,0.2)

                span
                    opacity: 0.5
</style>

<script>
    import CardMenu from '@/components/CardMenu'
    import SpreadsheetMenu from '@/components/SpreadsheetMenu'

    export default {
        components: {
            CardMenu,
            SpreadsheetMenu,
        },

        data () {
            return {
                tab: 'Spreadsheet',
                nav: [
                    'Cards',
                    'Spreadsheet'
                ],
            }
        },
    }
</script>