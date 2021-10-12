<template>
    <div 
        class="YApps_Widget--Back"
        @click="Back"
        >
        <icon-base icon-name="yappsarrowleft">
            <icon-yappsarrowleft />
        </icon-base>
        {{ BackButtonText }} 
    </div>
</template>

<script>
import IconBase from './IconBase.vue';
import IconYappsarrowleft from './icons/IconYappsarrowleft.vue';

export default {
    name: 'BaseBackButton',
    components: {
        IconBase,
        IconYappsarrowleft
    },
    computed: {
        BackButtonText() { return this.$store.state.BackButtonText },
    },
    methods: {
        Back() { this.$emit('back') }
    }
}
</script>

<style scoped>
.YApps_Widget--Back {
	position: absolute;
    top: 15px;
    left: 15px;
    cursor: pointer;
    padding-left: 30px;
    transition: .2s;
	z-index: 1;
	line-height: normal;
    font-size:14px;
    color: var(--yapps-widget-text-color);
}
.YApps_Widget--Back svg {
	width: 20px;
    height: 20px;
    position: absolute;
    left: 0;
    top: 0;
    fill: var(--yapps-widget-text-color);
}
.YApps_Widget--Back:hover {
	transition: .2s;
    color: var(--yapps-widget-fill-color);
}
.YApps_Widget--Back:hover svg {
    transition:  .2s;
    fill: var(--yapps-widget-fill-color);
}
</style>