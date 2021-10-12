<template>
    <div class="YApps_Widget--Form_Field">
        <input 
            v-model="Phone" 
            v-mask="'+7 (###) ###-##-##'" 
            type="phone"
            placeholder="+7 (___) ___-__-__"
            :class="{'YApps_Widget--Form_Error': CheckInput && ButtonPressed}"
            @input="setValue"
            >
    </div>
</template>

<script>
export default {
    name: 'BaseFormFieldPhone',
    data: () => {
        return {
            Phone: null
        }
    },
    computed: {
        ButtonPressed() { return this.$store.state.Form.Button.Pressed },
    },
    methods: {
        CheckInput() { return this.Phone.replace(/[^\d;]/g, '').substring(0, 11).length == 11 },
        setValue() {

            if ( this.CheckInput() ) { 

                let SendData = this.$store.state.Form.SendData;
                SendData.Phone = this.Phone.replace(/[^\d;]/g, '').substring(0, 11);
            }
        },
        Clear() { this.Phone = null }
    },
}
</script>

<style scoped>
.YApps_Widget--Form_Field {
    text-align: left;
    margin-top: 15px;
}
.YApps_Widget--Form_Field input {
    font-size: 20px;
    padding: 5px 10px;
    width: 100%;
    border: 1px solid var(--yapps-widget-darkgray-color);
    margin: 0;
    height: 39px;
    box-sizing: border-box;
}
.YApps_Widget--Form_Field input.YApps_Widget--Form_Error {
    border: 1px solid var(--yapps-widget-error-color);
}
</style>