<template lang="pug">
    section.cardManager
        //- select Sort..
        //-     option Sort by Date
        //-     option Sort by Name
        //-     option Sort Randomly

        .cards(v-show="!card.uuid")
            .card(v-for="card in cards")
                img(:src="`/api/media/${card.uuid}.png`" @click="() => editor( card )")

        .editor(v-if="card.uuid")
            .card
                img(:src="`/api/media/${card.uuid}.png`")

            .input
                p Tags
                input(placeholder="Tags: apple, banana" v-model="card.tags")
                p Title
                input(placeholder="Title" v-model="card.title")
                p Archived
                select(@change="setArchived") Archived..
                    option(value="true") true
                    option(value="false") false
                
                button(@click="submitEdit") Submit
                button(@click="deleteCard") Delete 
</template>

<script>
    import Vue from 'vue'

    export default {
        layout: 'Admin',

        data () {
            return {
                cards: [],
                card: { },
            }
        },

        methods: {
            editor ( card ) {
                Vue.set(this, 'card', card)
                console.log(card)
            },

            async deleteCard ( ) {
                const { success, message } = await this.api('cards/delete', {
                    method: 'post',
                    data: {
                        uuid: this.card.uuid
                    }
                })

                if (success) Vue.set(this, 'card', {})
                else if (message) alert(message)
            },

            async submitEdit ( ) {
                const { uuid, tags, title, archived } = this.card

                const data = { uuid }

                if (title !== undefined) Object.assign(data, { title })
                if (tags !== undefined) Object.assign(data, { tags })
                if (archived !== undefined) Object.assign(data, { archived })

                const { success, message } = await this.api('cards/edit', {
                    method: 'post',
                    data
                })

                if (success) Vue.set(this, 'card', {})
                else if (message) alert(message)
            },

            setArchived ( event ) {
                Vue.set(this.card, 'archived', 
                    event.target.value === "true"
                        ? true
                        : false
                )

                console.log(this.card.archived)
            },
        },

        async mounted () {
            const { success, cards } = await this.api('cards')
            if ( success ) Vue.set(this, 'cards', cards)
        }
    }
</script>

<style lang="sass">
    section.cardManager
        position: relative

        select
            margin-bottom: 2rem
            background: var(--text)
            color: var(--border)
            padding: 0.5rem
            font-size: 1rem
            border: none
            cursor: pointer

        .cards
            display: flex
            justify-content: space-between
            align-items: flex-start
            flex-wrap: wrap
            width: 100%
            height: 100%
            padding: 2rem
            padding-bottom: 0

    .card
        width: calc(23% - 0.5rem)
        padding-top: calc(30% - 1rem)
        height: 0
        position: relative

        img
            position: absolute
            height: 100%
            width: 100%
            object-fit: contain
            top: 0
            left: 0
            background-color: var(--background)
            border: 1px solid var(--border)

    .card 
        cursor: pointer
        img:hover
            filter: brightness(120%)
        
    .editor
        height: 100%
        width: 100%
        display: flex
        justify-content: center
        align-items: center
        flex-wrap: wrap

        .input
            display: flex
            flex-direction: column
            width: 23%
            margin-left: 4rem

            p:not(:first-child)
                margin-top: 1rem

            p
                margin-left: 5px
                margin-bottom: 5px

            select
                width: calc(100% - 0.6rem)
                margin: 0 auto
                margin-bottom: 2rem
</style>