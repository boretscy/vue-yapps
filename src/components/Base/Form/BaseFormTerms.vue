<template>
    <div class="YApps--Form_Personal">
        
        <label 
            class="YApps--Form_Personal-Item"
            :class="{'YApps--Form_Personal-Item_Error': !Terms.Personal.Status && ButtonPressed }"
            @click="ToggleCheck('Personal')"
            >
            <icon-base 
                icon-name="yappscheck"
                v-if="Terms.Personal.Status"
                >
                <icon-yappscheck />
            </icon-base>
            <icon-base 
                icon-name="yappsuncheck"
                v-if="!Terms.Personal.Status"
                >
                <icon-yappsuncheck />
            </icon-base>
            Я соглашаюсь на 
            <a 
                :href="Terms.Personal.Link" 
                target="_blank"
                >обработку персональных данных</a>.
        </label>
        <label 
            class="YApps--Form_Personal-Item"
            :class="{'YApps--Form_Personal-Item_Error': !Terms.Communications.Status && ButtonPressed }"
            @click="ToggleCheck('Communications')"
            >
            <icon-base 
                icon-name="yappscheck"
                v-if="Terms.Communications.Status"
                >
                <icon-yappscheck />
            </icon-base>
            <icon-base 
                icon-name="yappsuncheck"
                v-if="!Terms.Communications.Status"
                >
                <icon-yappsuncheck />
            </icon-base>
            Я соглашаюсь на 
            <a 
                :href="Terms.Communications.Link" 
                target="_blank"
                >рекламную коммуникацию</a>.
        </label>

    </div>
</template>

<script>
import IconBase from '../IconBase.vue';
import IconYappscheck from '../icons/IconYappscheck.vue';
import IconYappsuncheck from '../icons/IconYappsuncheck.vue';

export default {
    name: 'BaseFormTerms',
    computed: {
        Terms() { return this.$store.state.Form.Terms },
        ButtonPressed() { return this.$store.state.Form.Button.Pressed },
    },
    components: {
        IconBase,
        IconYappscheck,
        IconYappsuncheck
    },
    methods: {
        ToggleCheck( item ) { 
            
            let Terms = this.$store.state.Form.Terms;
            Terms[item].Status = !Terms[item].Status;
        }
    },
}
</script>

<style scoped>
.YApps--Form_Personal {
    margin-top: 15px;
    text-align: left;
    font-size: 12px;
}
.YApps--Form_Personal-Item {
    padding: 5px 0 5px 20px;
    position: relative;
    cursor: pointer;
    line-height: normal;
    color: var(--yapps-widget-text-color);
    display: block;
}
.YApps--Form_Personal-Item svg {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 7px;
    left: 0px;
    fill: var(--yapps-widget-fill-color);
}
.YApps--Form_Personal-Item.YApps--Form_Personal-Item_Error {
    color: var(--yapps-widget-error-color);
}
.YApps--Form_Personal-Item.YApps--Form_Personal-Item_Error svg {
    fill: var(--yapps-widget-error-color);
}
</style>