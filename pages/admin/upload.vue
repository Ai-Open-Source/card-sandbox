<template lang="pug">
    section.cardUploader.full
        img(v-if="url" :src="url")

        .formWrapper
            label(for="cardImageInput") Select Image
            input(type="file" @change="fileChange" id="cardImageInput")
            input(placeholder="Tags: apple, banana" v-if="url" v-model="tags")
            input(placeholder="Title" v-if="url" v-model="title")
            button(v-if="url" @click="upload") Upload
</template>

<script>
    import Vue from 'vue'

    export default {
        layout: 'Admin',

        data () {
            return {
                file: null,
                reader: null,
                tags: '', 
                title: '',
            }
        },

        computed: {
            url () {
                return this.file ? URL.createObjectURL(this.file) : null
            },
        },

        methods: {
            async upload ( base64 ) {
                const formData = new FormData()
                formData.append('source', this.file)
                formData.set('title', this.title)  
                formData.set('tags', this.tags)              

                const { success, uuid, message } = await this.api('cards/upload', {
                    method: 'post',
                    data: formData
                })

                console.log(success + 'asdfasdfasdf')

                if (success) this.$router.push('/admin/cards#' + uuid)
                else if (message) alert( message )
            },

            fileChange ({ target }) {
                Vue.set(this, 'file', target.files[0])
                // this.readFile(this.file)
            },

            // readFile ( file ) {
            //     this.reader.readAsDataURL(file)
            // }
        },

        mounted () {
            // Vue.set(this, 'reader', new FileReader())



            // this.reader.onload = ( ) => {
            //     Vue.set(this, 'encoded', this.reader.result.split(',')[1])
            // }
        }
    }
</script>

<style lang="sass">
    section.cardUploader
        display: flex
        justify-content: center
        align-items: center
        width: 100%
        flex-direction: row
        flex-wrap: wrap

        .formWrapper, .tags
            width: 30vmin
            display: flex
            justify-content: center
            align-items: center
            flex-direction: column
            margin: 2rem

        .tags
            flex-direction: row

        img
            width: 60vmin
            height: 60vmin
            object-fit: contain
        
</style>