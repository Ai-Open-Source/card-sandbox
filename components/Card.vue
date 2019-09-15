<template lang="pug">
    section.cardWrapper.full(
        :style="{ padding: width / 15 + 'px' }"
    )
        section.card.full(
            :style="{ borderRadius: width / 60 + 'px' }"
        )
            .title(
                :style="{ fontSize: width / 14 + 'px' }"
            ) {{ title }}

            img(
                src="https://c402277.ssl.cf1.rackcdn.com/photos/11552/images/hero_small/rsz_namibia_will_burrard_lucas_wwf_us_1.jpg?1462219623"
            )

            .description(
                :style="{ fontSize: width / 20 + 'px' }"
            ) {{ description }}
</template>

<script>
    export default {
        props: ["title", "description", "img", "width"]
    }
</script>

<style lang="sass">
    section.card
        padding: 0
        width: 100%
        height: 100%
        background-color: var(--foreground)

        .title
            font-weight: 800
            height: 12%
            display: flex
            align-items: center
            justify-content: center

        img
            width: 100%

        .description
            padding: 3%
</style>