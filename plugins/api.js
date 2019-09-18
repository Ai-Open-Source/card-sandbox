import Vue from 'vue'

Vue.mixin({
    created () {
        this.api = async (url, options) => {
            const response = await this.$axios({
                url: `${this.$store.state.host}/api/${url}`,
                ...options
            })

            console.log(response)

            return response.data
        }
    }
})