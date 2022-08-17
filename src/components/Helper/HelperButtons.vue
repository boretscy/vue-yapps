<template>
    <div class="YApps_Helper--Container">
        <div 
            class="YApps_Helper--Item_Container"
            :class="{'MobileOnly': Item.MobileOnly}"
            :style="{'bottom': Indx*(60+Buttons.Interval) + 'px'}"
            v-for="(Item, Indx) in Buttons.Items"
            :key="Indx"
            @click="doAction(Indx)"
            >
            <div 
                class="YApps_Helper--Item"
                :class="{'YApps_Helper--Item_Active': Item.Active}"
                >
                <div class="YApps_Helper--Item_Shadow"></div>
                <icon-base icon-name="yappsstartstop" v-if="Item.Name == 'Startstop'"><icon-yappsstartstop /></icon-base>
                <icon-base icon-name="yappsquestion" v-if="Item.Name == 'Question'"><icon-yappsquestion /></icon-base>
                <icon-base icon-name="yappscar" v-if="Item.Name == 'Car'"><icon-yappscar /></icon-base>
                <icon-base 
                    icon-name="yappscallout" 
                    v-if="Item.Name == 'Call'"
                    @click.prevent="EminGoal({
                        Category: 'Помощник',
                        Action: 'Запуск звонилки',
                        Name: 'Запуск звонилки',
                        IDTone: {Flag: false},
                        Yandex: 'YApps_Goals-Helper-Call',
                        CallTouch: {Flag: false}
                    })"
                    ><icon-yappscallout /></icon-base>
                <icon-base icon-name="yappsmap" v-if="Item.Name == 'Map'"><icon-yappsmap /></icon-base>
            </div>
            <div 
                class="YApps_Helper--Item_Label"
                v-if="!!Item.Content && Item.Content.Status"
                >{{ Item.Content.Value }}</div>
            <div class="YApps_Helper--Item_Description">{{ Item.DescriptionText }}</div>
        </div>
    </div>
</template>

<script>
import IconBase from '../Base/IconBase.vue';
import IconYappsstartstop from '../Base/icons/IconYappsstartstop.vue';
import IconYappsquestion from '../Base/icons/IconYappsquestion.vue';
import IconYappscar from '../Base/icons/IconYappscar.vue';
import IconYappscallout from '../Base/icons/IconYappscallout.vue';
import IconYappsmap from '../Base/icons/IconYappsmap.vue';

export default {
    name: 'HelperButtons',
    components: {
        IconBase,
        IconYappsstartstop,
        IconYappsquestion,
        IconYappscar,
        IconYappscallout,
        IconYappsmap
    },
    computed: {
        
        Buttons() { return this.$store.state.Helper.Buttons}
    },
    mounted: function() {

        let Widgets = this.$store.state.Widgets.Items;
        let Helper = this.$store.state.Helper;
        Helper.Buttons.Items.forEach(function(b) {
            if ( b.Content ) {
                setTimeout(() => {
                    if ( b.Type != 'widget' || (b.Type == 'widget' && !Widgets[b.Target].Status) ) b.Content.Status = true;
                }, b.Content.Delay*1000);
            }
        });
    },
    methods: {
        doAction( indx ) { this.$emit('do-action', indx) },
        EmitGoal( goal ) {

            goal.YandexCounter = this.$store.state.Form.SendData.YandexCounter;
            this.$emit('push-goal', goal);
        }
    }
}
</script>

<style scoped>
.YApps_Helper--Container {
    position: fixed;
    right: 60px;
    bottom: 60px;
    width: 60px;
    height: 210px;
    z-index: 15000
}

.YApps_Helper--Item_Container {
	position: absolute;
	cursor: pointer;
	bottom: 0;
	right: 0;
	width: 60px;
	height: 60px;
	z-index: 13100;
	box-sizing: border-box;
}
.YApps_Helper--Item {
	position: absolute;
    overflow: hidden;
	left: 0;
	bottom: 0;
	width: 60px;
	height: 60px;
	border-radius: 5px;
	padding: 0px;
	z-index: 13103;
	transition: .3s;
	box-sizing: border-box;
    background-color: var(--yapps-widget-lightgray-color);
    border: 1px solid var(--yapps-widget-middlegray-color);
}
.YApps_Helper--Item svg {
	width: 50px;
    height: 50px;
    transition: .3s;
    position: absolute;
    top: 5px;
    left: 5px;
    fill: var(--yapps-widget-fill-color);
}
.YApps_Helper--Item_Shadow {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: absolute;
    background-color: var(--yapps-widget-button-color);
    left: -60px;
    bottom: -60px;
    transition: .3s;
}

.YApps_Helper--Item_Container:hover .YApps_Helper--Item svg,
.YApps_Helper--Item.YApps_Helper--Item_Active .YApps_Helper--Item svg {
    width: 52px;
    height: 52px;
    transition: .3s;
    top: 4px;
    left: 4px;
}
.YApps_Helper--Item_Container:hover .YApps_Helper--Item_Shadow,
.YApps_Helper--Item.YApps_Helper--Item_Active .YApps_Helper--Item_Shadow {
    left: -15px;
    bottom: -15px;
    transition: .3s;
}
.YApps_Helper--Item_Container .YApps_Helper--Item_Description {
	position: absolute;
	right: 80px;
	bottom: 10px;
	text-align: right;
	width: auto;
	white-space: nowrap;
	padding: 10px;
	background-color: var(--yapps-widget-bg-color);
	border-radius: 10px;
	z-index: 13118;
	display: none;
	opacity: .8;
}
.YApps_Helper--Item_Container:hover .YApps_Helper--Item_Description {
	display: block;
}

.YApps_Helper--Item_Label {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: var(--yapps-widget-button-color);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    z-index: 13150;
    text-align: center;
    font-size: 12px;
    line-height: 1;
    padding-top: 6px;
}
.YApps_Helper--Item_Container.MobileOnly {
    display: none;
}
@media (max-width: 768px) {
    .YApps_Helper--Item_Container.MobileOnly {
        display: block;
        bottom: 0!important;
        right: 70px;
        width: calc(100vw - 115px);
    }
    .YApps_Helper--Item_Container.MobileOnly .YApps_Helper--Item {
        width: 100%;
    }
    .YApps_Helper--Item_Container.MobileOnly .YApps_Helper--Item_Description {
        position: inherit;
        right: 0;
        display: block;
        width: calc(100% - 30px);
        text-align: center;
        background: unset;
        color: var(--yapps-widget-fill-color);
        font-size: 18px;
        opacity: 1;
    }
    .YApps_Helper--Container {
        position: fixed;
        right: 30px;
        bottom: 30px;
        width: 60px;
        z-index: 15000
    }
}
</style>