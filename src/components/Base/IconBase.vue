<template>
    <svg
        xmlns="http://www.w3.org/2000/svg" 
        :width="width" 
        :height="height" 
        viewBox="0 0 74 74" 
        :aria-labelledby="iconName" 
        role="presentation"
    ><slot />
    </svg>
</template>

<script>
export default {
    props: {
        iconName: {
            type: String,
            default: 'yappswidgetsmainbutton'
        },
        width: {
            type: [Number, String],
            default: 74
        },
        height: {
            type: [Number, String],
            default: 74
        },
        iconColor: {
            type: String,
            default: 'currentColor'
        }
    }
}
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
}
</style>