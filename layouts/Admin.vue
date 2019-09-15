<template lang="pug">
    section.full
        .nav
            nuxt-link( 
                v-for="{ name, route } in nav" 
                :to="`/admin/${route}`"
                :key="name" 
                tag="div"
                :class="{ inactive: !new RegExp(`/admin/${route}`).test(path) }"
            ) 
                span {{ name }}
        nuxt
</template>

<script>
    export default {
        computed: {
            path () { 
                return this.$nuxt.$route.path
            },
        },

        data () {
            return {
                nav: [
                    {
                        name: 'Cards',
                        route: 'cards',
                    },
                    {
                        name: 'Accounts',
                        route: 'accounts',
                    },
                ],
            }
        },
    }
</script>

<style lang="sass" scoped>
    section
        display: flex
        flex-direction: column

        .nav
            height: 3rem
            display: flex

            div
                height: 100%
                width: 50%
                display: flex
                align-items: center
                justify-content: center
                pointer-events: none
                user-select: none

            div:not(:last-child)
                border-right: 1px solid var(--border)

            .inactive
                border-bottom: 1px solid var(--border)
                cursor: pointer
                pointer-events: all
                background-color: rgba(0,0,0,0.2)

                span
                    opacity: 0.5

        & > section
            height: calc(100% - 3rem)
</style>