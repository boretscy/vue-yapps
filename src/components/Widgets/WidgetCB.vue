<template>
    <transition name="fade">
        <div 
            class="YApps_Widget--Container"
            v-show="Widget.Status"
            >
            <BaseCloseButton 
                @hide="Hide"
                />
            <div class="YApps_Widget--Title">
                {{ Widget.Title}}
                <div
                    v-if="DelayedCall.Status && DelayedCall.Worktime.Status"
                    >
                    {{ DelayedCall.Worktime.TodayText }} в 
                    {{ DelayedCall.Worktime.Times[DelayedCall.Worktime.Selected.HourIndex].Hour }}
                    :
                    {{ DelayedCall.Worktime.Times[DelayedCall.Worktime.Selected.HourIndex].Minutes[DelayedCall.Worktime.Selected.MinutesIndex] }}</div>
                <div
                    v-if="DelayedCall.Status && !DelayedCall.Worktime.Status"
                    >
                    {{ DelayedCall.Worktime.TomorrowText }} в 
                    {{ DelayedCall.Worktime.Times[DelayedCall.Worktime.Selected.HourIndex].Hour }}
                    :
                    {{  }}</div>
                
                <div
                    v-if="!DelayedCall.Status && !Widget.Timer.Status"
                    >за {{ Widget.Time }} секунд</div>
                <div
                    v-if="!DelayedCall.Status && Widget.Timer.Status"
                    >ожидайте звонка</div>
                
            </div>

            <div 
                class="YApps_Widget--Text"
                v-html="Widget.Text"
                ></div>

            <BaseFormPhone 
                @send="Send" 
                ref="BaseFormPhone"
                />

            <div class="YApps_Widget--Timer">
                    <span v-if="Widget.Timer.Status">
                        {{ ('0'+Widget.Timer.Seconds).slice(-2) }}
                    </span>
                    <span v-if="Widget.Timer.Status">.</span> 
                    <span v-if="Widget.Timer.Status">{{ Widget.Timer.DSeconds }}</span>
            </div>

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
    name: 'WidgetCB',
    components: {
        BaseCloseButton,
        BaseFormPhone,
        BaseFormSuccess,
        BaseFormError
    },
    computed: {
        Widget() { return this.$store.state.Widgets.Items.CB },
        DelayedCall() { return this.$store.state.Form.DelayedCall }
    },
    methods: {
        Reset() {

            let Widget = this.$store.state.Widgets.Items.CB;
            Widget.Timer = {
                ID: null,
                Status: false,
                Seconds: null,
                DSeconds: null
            }
            
            this.$refs.BaseFormPhone.Reset();
            this.$refs.BaseFormSuccess.Reset();
            this.$refs.BaseFormError.Reset();
        },
        Init() {

            let Widget = this.$store.state.Widgets.Items.CB;
            Widget.Status = true;
            this.Reset();
        },
        StartTimer() {

            let Widget = this.$store.state.Widgets.Items.CB;
            Widget.Timer.Status = true;
            Widget.Timer.Seconds = Widget.Time; Widget.Timer.Seconds--;
            Widget.Timer.DSeconds = 9;

            Widget.Timer.ID = setInterval(() => {
                
                Widget.Timer.DSeconds--;
                if ( Widget.Timer.DSeconds < 0 ) {
                    
                    Widget.Timer.DSeconds = 9;
                    Widget.Timer.Seconds--;
                }

                if ( Widget.Timer.Seconds == 0 && Widget.Timer.DSeconds == 0 ) {
                    
                    clearInterval( Widget.Timer.ID );
                    setTimeout(() => {
                        this.Reset();
                    }, 10000);
                }

            }, 100);
        },
        Send() {

            let Form = this.$store.state.Form;

            this.$emit('send', 'CB');

            if ( !Form.DelayedCall.Status ) this.StartTimer();
            setTimeout(() => {
                this.Reset();
            }, 10000);
        },
        Hide() { this.$emit('hide-widget', 'CB') }
    }
}
</script>

<style scoped>
.YApps_Widget--Container {
    height: 500px;
    width: 440px;
	text-align: center;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-top: -250px;
    margin-left: -220px;
    background-color: var(--yapps-widget-bg-color);
    z-index: 14000;
    padding: 50px 20px 20px;
	overflow: hidden;
    font-size: 15px;
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
.YApps_Widget--Title {
    color: var(--yapps-widget-fill-color);
    font-size: 26px;
    font-weight: 400;
    margin-bottom: 15px;
    line-height: 1.2em;
}
.YApps_Widget--Title div {
    font-weight: 700;
}
.YApps_Widget--Text {
    color: var(--yapps-widget-text-color);
}

.YApps_Widget--Timer {
	font-weight: 700;
	font-size: 36px;
	color: var(--yapps-widget-fill-color);
	padding: 33px 0;
}
.YApps_Widget--Success {
	font-size: .8em;
	font-weight: 400;
}
</style>