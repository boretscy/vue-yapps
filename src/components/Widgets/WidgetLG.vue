<template>
    <transition name="fade">
        <div 
            class="YApps_Widget--Container"
            v-show="Widget.Status"
            >
            <BaseCloseButton 
                @hide="Hide"
                />
            <div 
                class="YApps_Widget--Image"
                :style="{
                    'width':Widget.Scheme.Image.Width+'px',
                    'height':Widget.Scheme.Image.Height+'px',
                    'background-image': 'url('+Widget.Image.Url+')',
                    'background-position': Widget.Image.Position
                    }"
                >
                <LGTimer ref="LGTimer" />
            </div>
            <div 
                class="YApps_Widget--Content"
                :style="{
                    'width':Widget.Scheme.Content.Width+'px',
                    'height':Widget.Scheme.Content.Height+'px',
                    }"
                >
                <div class="YApps_Widget--Title">{{ Widget.Title}}</div>
                <div 
                    class="YApps_Widget--Text"
                    v-html="Widget.Text"
                    ></div>
                <BaseFormNamePhone 
                    @send="Send" 
                    ref="BaseFormNamePhone"
                    />
                <BaseFormSuccess ref="BaseFormSuccess" />
                <BaseFormError ref="BaseFormError" />
            </div>
        </div>
    </transition>
</template>

<script>
import BaseCloseButton from '../Base/BaseCloseButton.vue';
import BaseFormNamePhone from '../Base/BaseFormNamePhone.vue';
import BaseFormSuccess from '../Base/Form/BaseFormSuccess.vue';
import BaseFormError from '../Base/Form/BaseFormError.vue';
import LGTimer from './LG/LGTimer.vue';

export default {
    name: 'WidgetLG',
    components: {
        BaseCloseButton,
        BaseFormNamePhone,
        BaseFormSuccess,
        BaseFormError,
        LGTimer
    },
    computed: {
        Widget() { return this.$store.state.Widgets.Items.LG },
        DelayedCall() { return this.$store.state.Form.DelayedCall }
    },
    methods: {
        Reset() {
            this.$refs.BaseFormNamePhone.Reset();
            this.$refs.BaseFormSuccess.Reset();
            this.$refs.BaseFormError.Reset();
        },
        Init() {
            let Widget = this.$store.state.Widgets.Items.LG;
            Widget.Status = true;
        },
        Hide() { this.$emit('hide-widget', 'LG') },
        Send() {

            this.$emit('send', 'LG');
            setTimeout(() => {
                this.Reset();
            }, 10000);
        },

    },
}
</script>

<style scoped>
.YApps_Widget--Container {
    height: 600px;
    width: 1000px;
	text-align: left;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-top: -300px;
    margin-left: -500px;
    z-index: 14000;
    padding: 0;
	overflow: hidden;
    font-size: 15px;
    color: var(--yapps-widget-text-color);
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
.YApps_Widget--Container:after {
    content: '';
}

.YApps_Widget--Image {
    background-repeat: no-repeat;
    background-size: contain;
    display: inline-block;
    position: relative;
}


.YApps_Widget--Content {
    background-color: var(--yapps-widget-bg-color);
    display: inline-block;
    padding: 50px 20px 20px;
    position: absolute;
    top: 0;
    right: 0;
}

.YApps_Widget--Title {
    color: var(--yapps-widget-fill-color);
    font-size: 26px;
    font-weight: 400;
    margin-bottom: 15px;
    line-height: 1.2em;
    padding: 0;
    height: 65px;
    overflow: hidden;
}
.YApps_Widget--Text {
    height: 150px;
    overflow: hidden;
}

@media (max-width: 767px) {
    .YApps_Widget--Image {
        display: none;;
    }
    .YApps_Widget--Content {
        width: 100% !important;
        height: 100% !important;
    }
}
</style>