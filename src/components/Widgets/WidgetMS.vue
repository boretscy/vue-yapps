<template>
    <transition name="fade">
        <div 
            class="YApps_Widget--Container"
            v-if="Widget.Status"
            >
            <BaseCloseButton 
                @hide="Hide"
                />
            <div class="YApps_Widget--Title">{{ Widget.Title}}</div>
            <div 
                class="YApps_Widget--Text"
                v-html="Widget.Text"
                ></div>
            <div class="YApps_Widget--Items">

                <div 
                    class="YApps_Widget--Item"
                    v-for="item in Widget.Items"
                    :key="item.Name"
                    >
                    <a
                        :href="item.Url"
                        >
                        <icon-base icon-name="yappswhatsapp" v-if="item.Name == 'WhatsApp'"><icon-yappswhatsapp /></icon-base>
                        <icon-base icon-name="yappsviber" v-if="item.Name == 'Viber'"><icon-yappsviber /></icon-base>
                        <icon-base icon-name="yappsskype" v-if="item.Name == 'Skype'"><icon-yappsskype /></icon-base>
                        <icon-base icon-name="yappstelegram" v-if="item.Name == 'Telegram'"><icon-yappstelegram /></icon-base>
                        
                        <p>{{ item.Name }}</p>
                    </a>
                </div>

            </div>
        </div>
    </transition>
</template>

<script>
import IconBase from '../Base/IconBase.vue';
import IconYappswhatsapp from '../Base/icons/IconYappswhatsapp.vue';
import IconYappsviber from '../Base/icons/IconYappsviber.vue';
import IconYappsskype from '../Base/icons/IconYappsskype.vue';
import IconYappstelegram from '../Base/icons/IconYappstelegram.vue';

import BaseCloseButton from '../Base/BaseCloseButton.vue';

export default {
    name: 'WidgetCB',
    components: {
        BaseCloseButton,
        IconBase,
        IconYappswhatsapp,
        IconYappsviber,
        IconYappsskype,
        IconYappstelegram
    },
    computed: {
        Widget() { return this.$store.state.Widgets.Items.MS },
    },
    methods: {
        Hide() { this.$emit('hide-widget', 'MS') },
        Init() {

            let Widget = this.$store.state.Widgets.Items.MS;
            Widget.Status = true;
        },
    }
}
</script>

<style scoped>
.YApps_Widget--Container {
    height: 320px;
    width: 440px;
	text-align: center;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-top: -160px;
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
.YApps_Widget--Text {
    color: var(--yapps-widget-text-color);
    margin-bottom: 15px;
}

.YApps_Widget--Items {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 15px;
}
.YApps_Widget--Item {
    flex: 0 1 calc(100% / 4 - 15px);
    padding: 10px;
    width: 160px;
    text-align: center;
}
.YApps_Widget--Item svg {
    width: 48px;
    height: 48px;
}
.YApps_Widget--Item p {
    padding: 15px 0 0;
}

</style>