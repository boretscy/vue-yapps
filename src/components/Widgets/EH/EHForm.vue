<template>
    <div>
        <div 
            class="YApps_Widget--Item_Text" 
            v-html="item.Text"></div>
        <BaseFormNamePhone 
            @send="Send" 
            ref="BaseFormNamePhone"
            v-if="item.Value == 'BaseFormNamePhone'"
            />
        <BaseFormPhone 
            @send="Send" 
            ref="BaseFormPhone"
            v-if="item.Value == 'BaseFormPhone'"
            />
        <BaseFormSuccess ref="BaseFormSuccess" />
        <BaseFormError ref="BaseFormError" />
        
    </div>
</template>

<script>
import BaseFormPhone from '../../Base/BaseFormPhone.vue';
import BaseFormNamePhone from '../../Base/BaseFormNamePhone.vue';
import BaseFormSuccess from '../../Base/Form/BaseFormSuccess.vue';
import BaseFormError from '../../Base/Form/BaseFormError.vue';

export default {
    name: 'EHForm',
    props: ['item'],
    components: {
        BaseFormPhone,
        BaseFormNamePhone,
        BaseFormSuccess,
        BaseFormError
    },
    methods: {
        Reset() {
            this.$refs[this.item.Value].Reset();
        },
        Send() {

            this.$emit('send', 'CB');
            setTimeout(() => {
                this.Reset();
            }, 10000);
        },
    }
}
</script>

<style scoped>
.YApps_Widget--Item_Text {
    padding: 10px;
    background-color: var(--yapps-widget-darkbg-color);
    border-radius: 5px;
    position: relative;
    margin-bottom: 15px;
}
.YApps_Widget--Item_Text:after {
    content: '';
    position: absolute;
    top: -15px;
    left: 0;
    width: 0;
    height: 0;
    border-bottom: 20px solid var(--yapps-widget-darkbg-color);
    border-right: 20px solid transparent;
}
</style>