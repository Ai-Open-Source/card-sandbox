<template lang="pug">
    section.zone(ref="zone" :style="zoneStyle")
        .row(
            v-for="(row, key) in rows" 
            :key="key"
            :style="rowStyle"
        )
            .columnWrapper
                .column(v-for="(column, key) in row")
                    .card(v-if="column.card") {{ column.card.title }}
</template>

<script>
    import Vue from 'vue'

    export default {
        data () {
            return {
                rows: new Array(4).fill(
                    new Array(6).fill({
                        
                    })    
                ),

                zone: {
                    width: 0,
                    left: 0,
                    top: 0,
                    panLocked: true
                },

                settings: {
                    zoomSensitivity: 15
                }
            }
        },

        computed: {
            rowStyle () { return {
                paddingTop: this.zone.width / this.rows.length * 0.85 + 'px',
            }},

            zoneStyle () { return {
                width: this.zone.width + 'px',
                left: this.zone.left + 'px',
                top: this.zone.top + 'px',
            }},
        },

        mounted () {
            let panning = false
            const start = { clientX: 0, clientY: 0 }
            const zoneStart = { top: 0, left: 0 }
            const mouse = { x: 0, y: 0 }
            
            const { parentNode } =  this.$refs.zone

            const initialWidth = (window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight) - 100

            Vue.set(this.zone, 'width', initialWidth)
            Vue.set(this.zone, 'left', (parentNode.clientWidth / 2) - (initialWidth / 2) )

            this.$nextTick(() => {
                Vue.set(this.zone, 'height',  this.$refs.zone.clientHeight)
                Vue.set(this.zone, 'top', (parentNode.clientHeight / 2) - (this.zone.height / 2) )
            })

            window.addEventListener('wheel', ({ target, deltaY }) => {
                if (/\btabletop\b/.test(target.className)) {

                    const normal = 
                        deltaY * // delta of mouse wheel
                        -1 * // uninvert mousewheel
                        (this.settings.zoomSensitivity * (this.zone.width/1000)) // normalize zoom velocity

                    const sum = this.zone.width + normal
                    
                    const dx = this.zone.left - (mouse.x - this.zone.left) * (sum / this.zone.width - 1)
                    const dy = this.zone.top - (mouse.y - this.zone.top) * (sum / this.zone.width - 1)

                    Vue.set(
                        this.zone, 
                        'width', 
                        sum,
                    )

                    Vue.set(this.zone, 'top', dy)
                    Vue.set(this.zone, 'left', dx)
                }
            })

            window.addEventListener('mousedown', ({ which, target, clientX, clientY }) => {
                if (which === 2 && /\btabletop\b/.test(target.className)) {
                    panning = true
                    Object.assign(start, { clientX, clientY })
                    const { top, left } = this.zone
                    Object.assign(zoneStart, { top, left })
                }
            })

            window.addEventListener('mousemove', ({ target, clientX, clientY }) => {
                Object.assign(mouse, { x: clientX - (window.innerWidth - parentNode.clientWidth), y: clientY })

                if (panning) {
                    Vue.set(this.zone, 'left', zoneStart.left + (clientX - start.clientX) )
                    Vue.set(this.zone, 'top', zoneStart.top + (clientY - start.clientY) )
                    Vue.set(this.zone, 'panLocked', false)
                }
            })

            window.addEventListener('mouseup', ({ which, target }) => {
                if (which === 2 && /\btabletop\b/.test(target.className))
                    panning = false
            })
        },
    }
</script>

<style lang="sass">
    section.zone
        position: absolute
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column
        pointer-events: none
        left: auto
        right: auto
        backface-visibility: hidden
        transform: translateZ(0)

        .row
            width: 100%
            border-bottom: 1px solid var(--border)
            overflow: hidden
            position: relative

            &:first-child
                border-top: 1px solid var(--border)

            .columnWrapper
                position: absolute
                height: 100%
                top: 0
                display: flex
                width: 100%

            .column
                border-right: 1px solid var(--border)

                &:first-child
                    border-left: 1px solid var(--border)

</style>