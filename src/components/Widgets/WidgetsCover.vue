<template>
    <transition name="fade">
        <div 
            class="YApps--Cover" 
            v-if="CoverShow"
            @click="Hide(); HideWidgets()"
        />
    </transition>
</template>

<script>
export default {
    name: 'WidgetsCover',
    computed: {
        CoverShow() { return this.$store.state.Widgets.CoverShow; }
    },
    methods: {
        Show() {

            let Widgets = this.$store.state.Widgets;
            Widgets.CoverShow = true;    
        },
        Hide() {

            let Widgets = this.$store.state.Widgets;
            Widgets.CoverShow = false;
        },
        HideWidgets() { this.$emit('hide-all-widgets') }
    },
}
</script>

<style scoped>
.YApps--Cover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 12000;
    background-color: rgba(0, 0, 0, 0.8);
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>