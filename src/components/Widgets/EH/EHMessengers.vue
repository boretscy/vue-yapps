<template>
    <div>
        <div 
            class="YApps_Widget--Item_Text" 
            v-html="item.Text"></div>
        <div 
            class="YApps_Widget--Item_Items"
            v-if="!!Items"
            >

            <div 
                class="YApps_Widget--Item_Item"
                v-for="i in Items"
                :key="i.Name"
                >
                <a
                    :href="i.Url"
                    >
                    <icon-base icon-name="yappswhatsapp" v-if="i.Name == 'WhatsApp'"><icon-yappswhatsapp /></icon-base>
                    <icon-base icon-name="yappsviber" v-if="i.Name == 'Viber'"><icon-yappsviber /></icon-base>
                    <icon-base icon-name="yappsskype" v-if="i.Name == 'Skype'"><icon-yappsskype /></icon-base>
                    <icon-base icon-name="yappstelegram" v-if="i.Name == 'Telegram'"><icon-yappstelegram /></icon-base>
                    <p>{{ i.Name }}</p>
                </a>
            </div>

        </div>
    </div>
</template>

<script>
import IconBase from '../../Base/IconBase.vue';
import IconYappswhatsapp from '../../Base/icons/IconYappswhatsapp.vue';
import IconYappsviber from '../../Base/icons/IconYappsviber.vue';
import IconYappsskype from '../../Base/icons/IconYappsskype.vue';
import IconYappstelegram from '../../Base/icons/IconYappstelegram.vue';

export default {
    name: 'EHButtons',
    components: {
        IconBase,
        IconYappswhatsapp,
        IconYappsviber,
        IconYappsskype,
        IconYappstelegram
    },
    props:['item'],
    computed: {
        Items() { return this.$store.state.Widgets.Items.MS.Items }
    }
}
</script>

<style scoped>
.YApps_Widget--Item_Text {
    padding: 10px;
    background-color: var(--yapps-widget-darkbg-color);
    border-radius: 5px;
    position: relative;
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
.YApps_Widget--Item_Items {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 15px;
}
.YApps_Widget--Item_Item {
    flex: 0 1 calc(100% / 3 - 15px);
    padding: 10px;
    width: 160px;
    text-align: center;
}
.YApps_Widget--Item_Item svg {
    width: 48px;
    height: 48px;
}
.YApps_Widget--Item_Item p {
    padding: 15px 0 0;
}
</style>