<template lang="pug">
    section.card.full(
        :class="{ flipped: isFlipped, transitioning }"
        :style="style"
    )
        img.card-image(
            :src="source"
            v-show="!isFlipped"
            :ref="`image`"
            @click="emitClick"
        )

        .card-background(
            v-show="isFlipped"
            @click="emitClick"
        )
</template>

<script>
    import Vue from 'vue'

    const alarm = seconds => new Promise(_ => setTimeout(_, seconds * 1000)) 

    export default {
        props: ["row", "column", "source", "flipped", "transition"],

        data () {
            return {
                transitioning: false,
                isFlipped: this.flipped
            }
        },

        computed: {
            style () { return {
                transition: `transform ${this.transition}s`
            }},
        },

        methods: {
            async flip ( flipped ) {
                Vue.set(this, 'transitioning', true)
                await alarm(this.transition)
                Vue.set(this, 'isFlipped', flipped)
                Vue.set(this, 'transitioning', false)
            },

            emitClick ( event ) {
                this.$emit('click', {
                    row: this.row,
                    column: this.column
                })
            }
        },

        watch: {
            flipped (from, to) {
                return this.flip( !to )
            }
        }
    }
</script>

<style lang="sass">
    section.card
        padding: 8%
        width: 100%
        height: 100%
        display: flex
        align-items: center
        justify-content: center
        transform: scaleX(1)

        &.transitioning
            transform: scaleX(0)

        img
            width: 100%
            height: 100%
            object-fit: contain
            pointer-events: auto

        .card-background
            background-color: var(--foreground)
            height: 100%
            width: 100%
            pointer-events: auto

</style>