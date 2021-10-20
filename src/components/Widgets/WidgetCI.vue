<template>
    <transition name="fade">
        <div 
            class="YApps_Widget--Container"
            v-show="Widget.Status"
            >
            <BaseCloseButton 
                @hide="Hide"
                />
            <div class="YApps_Widget--Title">{{ Widget.Content[Widget.PathDetector.content].title }}</div>
            <div 
                class="YApps_Widget--Text"
                v-html="Widget.Content[Widget.PathDetector.content].text"
                ></div>

            <BaseFormPhone 
                @send="Send" 
                ref="BaseFormPhone"
                />

            <BaseFormSuccess ref="BaseFormSuccess" />
            <BaseFormError ref="BaseFormError" />

        </div>
    </transition>
</template>

<script>
import BaseCloseButton from '../Base/BaseCloseButton.vue';
import BaseFormPhone from '../Base/BaseFormPhone.vue';
import BaseFormSuccess from '../Base/Form/BaseFormSuccess.vue';
import BaseFormError from '../Base/Form/BaseFormError.vue';

export default {
    name: 'WidgetCI',
    components: {
        BaseCloseButton,
        BaseFormPhone,
        BaseFormSuccess,
        BaseFormError
    },
    mounted: function() {

        let Widget = this.$store.state.Widgets.Items.CI;
        
        Widget.PathDetector.path = window.location.pathname;
        Widget.PathDetector.level = Widget.PathDetector.path.split('/').length - 1;
        Widget.PathDetector.content = 'List';
        if ( Widget.PathDetector.level > Widget.Content.List.level && Widget.PathDetector.level <= Widget.Content.Model.level ) Widget.PathDetector.content = 'Model';
        if ( Widget.PathDetector.level > Widget.Content.Model.level && Widget.PathDetector.level <= Widget.Content.Item.level ) Widget.PathDetector.content = 'Item'; 
    },
    computed: {
        Widget() { return this.$store.state.Widgets.Items.CI },
        DelayedCall() { return this.$store.state.Form.DelayedCall }
    },
    methods: {
        Reset() {
            
            this.$refs.BaseFormPhone.Reset();
            this.$refs.BaseFormSuccess.Reset();
            this.$refs.BaseFormError.Reset();
        },
        Init() {

            let Widget = this.$store.state.Widgets.Items.CI;
            Widget.Status = true;

            this.Reset();

            Widget.PathDetector.path = window.location.pathname;

            setInterval( function() {
                
                if ( Widget.PathDetector.path != window.location.pathname ) {
                    
                    Widget.PathDetector.path = window.location.pathname;
                    Widget.PathDetector.level = Widget.PathDetector.path.split('/').length - 1;

                    Widget.PathDetector.content = 'List';
                    if ( Widget.PathDetector.level > Widget.Content.List.level && Widget.PathDetector.level <= Widget.Content.Model.level ) Widget.PathDetector.content = 'Model';
                    if ( Widget.PathDetector.level > Widget.Content.Model.level && Widget.PathDetector.level <= Widget.Content.Item.level ) Widget.PathDetector.content = 'Item';
                }
            }, 50);
        },
        Send() {

            this.$emit('send', 'CI');
        },
        Hide() { this.$emit('hide-widget', 'CI') }
    }
}
</script>

<style scoped>
.YApps_Widget--Container {
    height: 500px;
    width: 440px;
	text-align: center;
    position: fixed;
    background-color: var(--yapps-widget-bg-color);
    z-index: 14000;
    padding: 50px 20px 20px;
    font-size: 15px;
    right: 150px;
    bottom: 50px;
}
.YApps_Widget--Container:after {
    content: '';
    width: 0; 
    height: 0;
    border-top: 10px solid transparent;
    border-left: 15px solid var(--yapps-widget-bg-color);
    border-bottom: 10px solid transparent;
    position: absolute;
    right: -15px;
    bottom: 120px;
}
.YApps_Widget--Container a, .YApps_Widget--Container a:focus, .YApps_Widget--Container a:active, .YApps_Widget--Container a:visited {
	color: var(--yapps-widget-text-color);
	text-decoration: underline;
	transition: color .2s;
}
.YApps_Widget--Container a:hover {
	color: var(--yapps-widget-fill-color);
	text-decoration: underline;
	transition: color .2s;
}
.YApps_Widget--Title {
    color: var(--yapps-widget-fill-color);
    font-size: 26px;
    font-weight: 400;
    margin-bottom: 15px;
    line-height: 1.2em;
}
.YApps_Widget--Text {
    color: var(--yapps-widget-text-color);
    margin-bottom: 30px;
}

.YApps_Widget--Success {
	font-size: .8em;
	font-weight: 400;
}
</style>