<template>
    <transition name="fade">
        <div 
            class="YApps_Widget--Form"
            v-if="!Return.Status"
            >
            <div class="YApps_Widget--Form_Fields">
                <BaseFormFieldName />
                <BaseFormFieldPhone />
                <BaseFormFieldTime />
                <BaseFormButton @send="Send" />
                <BaseFormTerms />
            </div>
        </div>
    </transition>
</template>

<script>
import BaseFormFieldName from './Form/BaseFormFieldName.vue';
import BaseFormFieldPhone from './Form/BaseFormFieldPhone.vue';
import BaseFormFieldTime from './Form/BaseFormFieldTime.vue';
import BaseFormButton from './Form/BaseFormButton.vue';
import BaseFormTerms from './Form/BaseFormTerms.vue';

export default {
    name: 'BaseFormNamePhone',
    components: {
        BaseFormFieldPhone,
        BaseFormFieldName,
        BaseFormFieldTime,
        BaseFormButton,
        BaseFormTerms
    },computed: {
        Return() { return this.$store.state.Form.Return },
    },
    methods: {
        Reset() {

            let Form = this.$store.state.Form;

            Form.Return.Status = false;
            Form.Return.Success.Status = false;
            Form.Return.Error.Status = false;
            Form.Button.Pressed = false;
            Form.DelayedCall.Status = false;
            Form.DelayedCall.Worktime.Times = [];
            Form.DelayedCall.Worktime.Selected = {
                HourIndex: 0,
                MinutesIndex: 0
            };
            Form.SendData.Name = null;
            Form.SendData.Phone = null;
            Form.SendData.DelayedCall = null;
        },
        Send() {

            let Form = this.$store.state.Form;
            
            if ( Form.SendData.Phone && Form.SendData.Name && Form.Terms.Personal.Status && Form.Terms.Communications.Status ) {

                Form.Return.Status = true;
                Form.Return.Success.Status = true;

                this.$emit('send');
            }
        }
    },
}
</script>

<style scoped>
.YApps_Widget--Form {
    width: 100%;
    overflow: hidden;
}
.YApps_Widget--Form_Fields {
    margin: 15px 0;
    width: 100%;
}
</style>