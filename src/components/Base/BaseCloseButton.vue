<template>
    <div 
        class="YApps_Widget--Close"
        v-on:click="Hide"
        >
        {{ CloseButtonText }} 
        <icon-base icon-name="yappsclose">
            <icon-yappsclose />
        </icon-base>
    </div>
</template>

<script>
import IconBase from './IconBase.vue';
import IconYappsclose from './icons/IconYappsclose.vue';

export default {
    name: 'BaseCloseButton',
    components: {
        IconBase,
        IconYappsclose
    },
    computed: {
        CloseButtonText() { return this.$store.state.CloseButtonText },
    },
    methods: {
        CloseWidget: function() { this.$store.commit('ToggleWidgetsCover') },
        Hide() { this.$emit('hide') }
    }
}
</script>

<style scoped>
.YApps_Widget--Close {
	position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
    padding-right: 30px;
    transition: .2s;
	z-index: 1;
	line-height: normal;
    font-size:14px;
    color: var(--yapps-widget-text-color);
}
.YApps_Widget--Close svg {
	width: 20px;
    height: 20px;
    position: absolute;
    right: 0;
    top: 0;
    fill: var(--yapps-widget-text-color);
}
.YApps_Widget--Close:hover {
	transition: .2s;
    color: var(--yapps-widget-fill-color);
}
.YApps_Widget--Close:hover svg {
    transition:  .2s;
    fill: var(--yapps-widget-fill-color);
}
</style>