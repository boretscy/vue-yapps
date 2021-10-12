<template>
    <transition name="slide">
        <div 
            class="YApps_Widget--Form_Result YApps_Widget--Form_error"
            v-if="Return.Status && Return.Error.Status"
            v-html="Return.Error.Text"
            ></div>
    </transition>
</template>

<script>
export default {
    name: 'BaseFormError',
    computed: {
        Return() { return this.$store.state.Form.Return },
    },
    methods: {
        Reset() {

            let Return = this.$store.state.Form.Return;
            Return.Status = false;
            Return.Error.Status = false;
        }
    },
}
</script>

<style scoped>
.YApps_Widget--Form_Result {
    padding: 50px 0;
    font-size: 20px;
}
.YApps_Widget--Form_Result.YApps_Widget--Form_error {
    color: var(--yapps-widget-error-color);
}
</style>