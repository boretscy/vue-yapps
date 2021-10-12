<template>
    <div class="YApps_Widget--Form_Field">
        <input 
            v-model="Name" 
            type="text"
            placeholder="Ваше имя"
            :class="{'YApps_Widget--Form_Error': !Name && ButtonPressed}"
            @input="setValue"
        >
    </div>
</template>

<script>
export default {
    name: 'BaseFormFieldName',
    data: () => {
        return {
            Name: null
        }
    },
    computed: {
        ButtonPressed() { return this.$store.state.Form.Button.Pressed },
    },
    methods: {
        setValue() {

            if ( this.Name.length > 0 ) {
                
                let SendData = this.$store.state.Form.SendData;
                SendData.Name = this.Name;
            }
        }
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