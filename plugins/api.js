import Vue from 'vue'

Vue.mixin({
    mounted () {
        this.api = async (url, options) => {
            const { data } = await this.$axios({
                url: `${window.location.origin}/api/${url}`,
                ...options
            })

            return data
        }
    }
})