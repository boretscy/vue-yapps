<template>
    <div class="YApps_Widget--Form_Field">
        <a
            href="#"
            class="YApps_Widget--Form_Button"
            @click="Send"
            >{{ Button.Text }}</a>
    </div>
</template>

<script>
export default {
    name: 'BaseFormButton',
    computed: {
        Button() { return this.$store.state.Form.Button }
    },
    methods: {
        Send() {

            let Button = this.$store.state.Form.Button;
            Button.Pressed = true;

            this.$emit('send');
        }
    },
}
</script>

<style scoped>
.YApps_Widget--Form_Field {
    margin-top: 15px;
}
.YApps_Widget--Form_Button, .YApps_Widget--Form_Button:focus, .YApps_Widget--Form_Button:active, .YApps_Widget--Form_Button:visited {
    padding: 5px 10px;
    display: block;
    width: 100%;
    background-color: var(--yapps-widget-button-color);
    border: var(--yapps-widget-button-color) 1px solid;
    color: var(--yapps-widget-button-text-color);
    transition: .2s;
    font-size: 20px;
    text-decoration: none;
    text-align: center;
    height: 40px;
    line-height: normal;
    box-sizing: border-box;
}
.YApps_Widget--Form_Button:hover {
    background-color: var(--yapps-widget-fill-color);
    border: var(--yapps-widget-fill-color) 1px solid;
    color: var(--yapps-widget-bg-color);
    transition: .2s;
    text-decoration: none;
}
</style>