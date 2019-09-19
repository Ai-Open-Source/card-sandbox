<template lang="pug">
    section.card.full(
        :class="{ flipped: isFlipped, transitioning }"
        :style="style"
        draggable="true"
    )
        img.card-image(
            :src="source"
            v-show="!isFlipped"
            :ref="`image`"
            @mousedown="down"
            draggable="false"
        )

        .card-background(
            v-show="isFlipped"
            @mousedown="down"
            draggable="false"
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
                isFlipped: this.flipped,
                dragging: false,
                dragStart: {clientX: 0, clientY: 0}
            }
        },

        computed: {
            style () { return {
                transition: `transform ${this.transition}s`
            }},

            zone () {
                return this.$store.state.zone
            }
        },

        methods: {
            async flip ( flipped ) {
                Vue.set(this, 'transitioning', true)
                await alarm(this.transition)
                Vue.set(this, 'isFlipped', flipped)
                Vue.set(this, 'transitioning', false)
            },

            down ({ which, clientX, clientY }) {
                if (which === 1) {
                    Vue.set(this, 'dragging', true)
                    Vue.set(this, 'dragStart', {clientX, clientY})
                    console.log('down')
                }
            }
        },

        mounted () {
            window.addEventListener('mouseup', ({ which, clientX, clientY }) => {
                if (which === 1 && this.dragging) {
                    Vue.set(this, 'dragging', false)
                    console.log('up')

                    const ny = Math.floor((clientY - this.zone.top) / (this.zone.height / this.zone.rows))
                    const nx = Math.floor((clientX - this.zone.left) / (this.zone.width / this.zone.columns))

                    console.log(nx >= 0, ny >= 0, nx <= this.zone.columns, ny <= this.zone.rows)

                    if (nx >= 0 && ny >= 0 && nx <= this.zone.columns && ny <= this.zone.rows) this.$store.commit('moveCard', {
                        from: [this.row, this.column],
                        to: [ny, nx]
                    })
                }
            })
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