import Vue from 'vue'

Vue.mixin({
    created () {
        this.api = async (url, options) => {
            const { data } = await this.$axios({
                url: `${this.$store.state.host}/api/${url}`,
                ...options
            })

            return data
        }
    }
})