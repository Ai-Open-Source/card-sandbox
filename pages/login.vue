<template lang="pug">
    section.login.full
        h1 Log in with Discord
        button(@click="login()") Log in
</template>

<script>
    export default {
        methods: {
            login () {
                window.location.replace(`/api/discord/login?origin=` + location.origin)
            }
        }
    }
</script>

<style lang="sass">
    section.login
        display: flex
        align-items: center
        justify-content: center
        flex-direction: column

        button
            margin-top: 2rem
            padding: 0.7rem 1rem
            font-size: 1rem
            letter-spacing: 1px
            border: none
            outline: none
            cursor: pointer
            background-color: var(--border)
            color: var(--text)

            &:hover
                background-color: var(--text)
                color: var(--border)
</style>