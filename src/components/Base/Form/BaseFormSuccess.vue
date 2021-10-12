<template>
    <transition name="fade">
        <div 
            class="YApps_Widget--Form_Result YApps_Widget--Form_success"
            v-if="Return.Status && Return.Success.Status"
            v-html="Return.Success.Text"
            ></div>
    </transition>
</template>

<script>
export default {
    name: 'BaseFormSuccess',
    computed: {
        Return() { return this.$store.state.Form.Return },
    },
    methods: {
        Reset() {

            let Return = this.$store.state.Form.Return;
            Return.Status = false;
            Return.Success.Status = false;
        }
    },
}
</script>

<style scoped>
.YApps_Widget--Form_Result {
    padding: 50px 0;
    font-size: 20px;
}
.YApps_Widget--Form_Result.YApps_Widget--Form_success {
    color: var(--yapps-widget-fill-color);
}
</style>