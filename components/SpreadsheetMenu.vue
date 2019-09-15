<template lang="pug">
    section.spreadsheet
        .row(
            v-for="(row, key) in rows" 
            :key="key"
        )
            input.column(
                v-for="(text, key) in row" 
                v-model="row[key]" 
                :key="key"
                @keyup="(event) => change(key, event)"
            )
</template>

<script>
    export default {
        data ( ) {
            return {
                rows: [],
                columns: 3,
            }
        },

        methods: {
            addRow ( ) {
                this.rows.push(
                    new Array(this.columns).fill("")
                )
            },

            removeRow ( index ) {
                this.rows.splice(1, index)
            },

            change ( key, event ) {
                if ( this.rows[this.rows.length - 1].join("") !== "" ) this.addRow()
            },
        },

        mounted ( ) {
            this.addRow()
            this.addRow()
        },
    }
</script>

<style lang="sass">
    section.spreadsheet
        padding: 1rem

    .row
        &:not(:last-child)
            border-bottom: 1px solid var(--border)

    .column
        border: none
        background: transparent
        color: var(--text)
        width: 33%
        text-align: center
        padding: 0.5rem

        &:not(:last-child)
            border-right: 1px solid var(--border)

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button
        -webkit-appearance: none
        margin: 0

    // input[type="number"]
    //     -moz-appearance: textfield
</style>