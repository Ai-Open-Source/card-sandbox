<template lang="pug">
    section.zone(ref="zone" :style="zoneStyle")
        .row(
            v-for="(row, rowKey) in rows" 
            :key="rowKey"
            :style="rowStyle"
        )
            .columnWrapper
                .column(
                    v-for="(column, columnKey) in row"
                    :style="{ width: zone.width / row.length + 'px' }"
                    :key="columnKey"
                )
                    Card(
                        v-if="column.card"
                        :source="column.source"
                        :flipped="column.flipped"
                        :row="rowKey"
                        :column="columnKey"
                        :transition="0.2"
                        @click="cardClicked"
                    )
</template>

<script>
    import Vue from 'vue'
    import Card from './Card'

    export default {
        components: {
            Card
        },

        methods: {
            log (string) { console.log(string) },

            cardClicked ({ row, column }) {
                const { flipped } = this.rows[row][column]

                Object.assign(this.rows[row][column], {flipped: !flipped})

                console.log(row, column)
                console.log(...this.rows[0].map(({flipped})=>flipped))
            }
        },

        data () {
            return {
                rows: [0,1,2,3].map( (row) =>
                    [0,1,2,3,4,5].map( (column) => ({
                        card: true,
                        source: "https://c402277.ssl.cf1.rackcdn.com/photos/11552/images/hero_small/rsz_namibia_will_burrard_lucas_wwf_us_1.jpg?1462219623",
                        flipped: false,
                        row,
                        column
                    }))  
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
                if (/\b(tabletop|card)\b/.test(target.className)) {

                    const normal = 
                        (Math.abs(deltaY) >= 80 ? deltaY / 33 : deltaY) * // delta of mouse wheel; account for browser differences in deltaY
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
                if (which === 2 && /\b(tabletop|card)\b/.test(target.className)) {
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
                if (which === 2)
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
                height: 100%
                padding: 0

                &:first-child
                    border-left: 1px solid var(--border)

</style>