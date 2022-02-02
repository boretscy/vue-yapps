<template>
    <transition name="fade">
        <div 
            class="YApps_Widget--Container"
            v-if="Widget.Status"
            >
            <BaseBackButton 
                    @back="Init"
                    v-if="Widget.SecondView.Status"
                    />
            <BaseCloseButton 
                @hide="Hide"
                />
            
            <div class="YApps_Widget--Title">
                <div class="YApps_Widget--Title_Text">{{ Widget.Title }}</div>
                <ul class="YApps_Widget--Items">
                    <li
                        v-for="(item, indx) in Widget.Items"
                        :key="indx"
                        class="YApps_Widget--Item"
                        :class="{'YApps_Widget--Item-Active': item.Routed}"
                        :style="{'width': 520/Widget.Items.length-10*(Widget.Items.length-1)+'px'}"
                        @click="RouteTo(indx); EmitGoal({
                            Category: 'Виджеты',
                            Action: 'Маршрут в ДЦ',
                            Name: 'Проложить маршрут в '+item.Title,
                            IDTone: {Flag: false},
                            Yandex: 'YApps_Goals-Widgets_NV-Route',
                            CallTouch: {Flag: false}
                        })">
                        <div class="YApps_Widget--Item_Title">{{ item.Title }}</div>
                        <div class="YApps_Widget--Item_Text">{{ item.Address }}</div>
                        <div class="YApps_Widget--Item_Icons">
                            <a 
                                class="YApps_Widget--Item_Icons-Icon"
                                :href="'tel:'+item.Phone"
                                @click.prevent="EmitGoal({
                                    Category: 'Виджеты',
                                    Action: 'Звонок в ДЦ',
                                    Name: 'Звонок в '+item.Title,
                                    IDTone: {Flag: false},
                                    Yandex: 'YApps_Goals-Widgets_NV-Call',
                                    CallTouch: {Flag: false}
                                })">
                                <icon-base icon-name="yappscallout"><icon-yappscallout /></icon-base>
                            </a>
                            <span class="YApps_Widget--Item_Icons-Icon" @click.prevent="showSecondView(indx)">
                                <icon-base icon-name="yappsmap"><icon-yappsmap /></icon-base>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <div 
                class="YApps_Widget--Map"
                :style="{'height': ((WindowWidth<=768)?'calc(100% - '+(70+Widget.Items.length*70)+'px)':'calc(100% - 100px)'), 'margin-top': ((WindowWidth<=768)?70+Widget.Items.length*70:100)+'px'}"
                >
                <yandex-mapyapps
                    :settings="Widget.Settings"
                    :coords="Widget.Items[0].Coords"
                    :zoom="10" 
                    >
                    <ymap-markeryapps
                        v-for="(item, indx) in Widget.Items"
                        :key="indx"
                        :coords="item.Coords" 
                        :marker-id="indx" 
                        :hint-content="item.Title" 
                        :balloon="{
                            header: item.Title,
                            body: item.Address+'<br />'+item.Working
                        }"
                        />
                </yandex-mapyapps>
            </div>
            <div 
                class="YApps_Widget--SecondView"
                v-if="Widget.SecondView.Status">
                <div class="YApps_Widget--SecondView_Title">{{ Widget.SecondView.Title}}</div>
                <div 
                    class="YApps_Widget--SecondView_Text"
                    v-html="Widget.SecondView.Text"
                    ></div>
                <div class="YApps_Widget--SecondView_Items">
                    <div 
                        class="YApps_Widget--SecondView_Items-Item"
                        v-for="(item, i) in Widget.SecondView.Items"
                        :key="i"
                        >
                        <a 
                            :href="item.Url"
                            >
                            <img :src="'https://apps.yug-avto.ru/upload/Widgets/Navigators/'+item.Image+'.png'" />
                            <div class="YApps_Widget--SecondView_Items-Item_Title">{{ item.Text }}</div>
                        </a>
                    </div>
                </div>
                
            </div>
        </div>
    </transition>
</template>



<script>
import BaseCloseButton from '../Base/BaseCloseButton.vue';
import BaseBackButton from '../Base/BaseBackButton.vue';
import { yandexMapyapps, ymapMarkeryapps } from 'vue-yandex-maps';
import IconBase from '../Base/IconBase.vue';
import IconYappscallout from '../Base/icons/IconYappscallout.vue';
import IconYappsmap from '../Base/icons/IconYappsmap.vue';

export default {
    name: 'WidgetNV',
    components: {
        BaseCloseButton,
        BaseBackButton,
        yandexMapyapps, ymapMarkeryapps,
        IconBase,
        IconYappscallout,
        IconYappsmap
    },
    computed: {
        Widget() { return this.$store.state.Widgets.Items.NV },
        WindowWidth() { return window.innerWidth }
    },
    methods: {
        Hide() { this.$emit('hide-widget', 'NV') },
        Init() {

            let Widget = this.$store.state.Widgets.Items.NV;
            console.log(Widget);
            Widget.Status = true;
            Widget.SecondView.Status = false;
        },
        showSecondView(indx) {

            let Widget = this.$store.state.Widgets.Items.NV;
            Widget.SecondView.Items = [];
            Widget.SecondView.Used.forEach( function(e) {

                switch (e) {
                    
                    case 'yandex':
                        Widget.SecondView.Items.push({
                            Text: 'Яндекс.Навигатор',
                            Url: 'yandexnavi://build_route_on_map?lat_to='+Widget.Items[indx].Coords[0]+'&lon_to='+Widget.Items[indx].Coords[1],
                            Image: 'Yandex'
                        });
                        break;

                    case 'apple':
                        Widget.SecondView.Items.push({
                            Text: 'Карты iOs',
                            Url: 'http://maps.apple.com/?sll='+Widget.Items[indx].Coords[0]+','+Widget.Items[indx].Coords[1],
                            Image: 'Apple'
                        });
                        break;

                    case 'google':
                        Widget.SecondView.Items.push({
                            Text: 'Google Карты',
                            Url: 'https://maps.google.com/?daddr='+Widget.Items[indx].Coords[0]+','+Widget.Items[indx].Coords[1],
                            Image: 'Google'
                        });
                        break;

                    case 'maps_me':
                        Widget.SecondView.Items.push({
                            Text: 'MAPS.ME',
                            Url: 'mapsme://route?dll='+Widget.Items[indx].Coords[0]+','+Widget.Items[indx].Coords[1]+'&type=vehicle',
                            Image: 'Mapsme'
                        });
                        break;

                    case '2gis':
                        Widget.SecondView.Items.push({
                            Text: '2ГИС',
                            Url: 'dgis://2gis.ru/routeSearch/rsType/car/to/'+Widget.Items[indx].Coords[0]+','+Widget.Items[indx].Coords[1],
                            Image: '2Gis'
                        });
                        break;

                    default: break;
                }
            });
            Widget.SecondView.Title = 'Проложить маршрут в '+Widget.Items[indx].Title

            Widget.SecondView.Status = true;

        },
        RouteTo( indx ) {
            
            let Widget = this.$store.state.Widgets.Items.NV;
            let userPosition;

            // if ( Widget.Route ) window.ymaps.geoObjects.remove( Widget.Route );
            window.ymaps.geolocation.get({provider: 'browser', autoReverseGeocode: true})
                .then(function (result) {
                    userPosition = result.geoObjects.get(0).geometry.getCoordinates();
                    return userPosition;
                })
                .then(function(userPosition) {
                    
                    Widget.Route = new window.ymaps.multiRouter.MultiRoute(
                        {
                            referencePoints: [userPosition, Widget.Items[indx].Coords],
                            params: {results: 2}
                        },
                        {
                            boundsAutoApply: true
                        }
                    );

                    window.ymaps.geoObjects.add( Widget.Route );
                });
        },
        EmitGoal( goal ) {

            let YandexCounter = this.$store.state.Form.SendData.YandexCounter;
            goal.YandexCounter = YandexCounter;
            this.$emit('push-goal', goal);
        }
    }
}
</script>

<style scoped>
.YApps_Widget--Container {
    height: 600px;
    width: 840px;
	text-align: center;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-top: -300px;
    margin-left: -420px;
    background-color: var(--yapps-widget-bg-color);
    z-index: 14000;
    padding: 50px 20px 20px;
	overflow: hidden;
    font-size: 15px;
}
.YApps_Widget--SecondView {
    display: none;
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
    position: relative;
    text-align: left;
}
.YApps_Widget--Title_Text {
    padding: 0;
    margin: 0;
    float: left;
    width: 35%;
    position: absolute;
    top: 0px;
    left: 0px;
}
.YApps_Widget--Items {
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: 14px;
    float: right;
    width: 65%;
    line-height: 1.2em;
    position: absolute;
    top: 0px;
    right: 0px;
}
.YApps_Widget--Item {
    display: inline-block;
    padding: 5px 0 0;
    margin: 0 5px;
    width: 30.9%;
    cursor: pointer;
    border-bottom: 1px dotted var(--yapps-widget-fill-color);
    line-height: 1.4;
}
.YApps_Widget--Item.YApps_Widget--Item-Active {
    border-bottom: 1px solid var(--yapps-widget-button-color);
}
.YApps_Widget--Item_Text {
    font-size: 10px;
    color: var(--yapps-widget-text-color);
    margin-bottom: 5px;
}
.YApps_Widget--Item_Icons {
    display: none;
}
.YApps_Widget--Map {
    height: calc(100% - 100px);
    margin-top: 100px;
}
.ymap-container {
  height: 100%;
}

@media (max-width: 767px) {
    .YApps_Widget--Title_Text {
        position: unset;
        width: 100%;
    }
    .YApps_Widget--Items {
        position: unset;
        width: 100%;
    }
    .YApps_Widget--Item {
        width: 100% !important;
        padding: 15px 0;
        position: relative;
    }
    .YApps_Widget--Item_Icons {
        display: inline-block;
        position: absolute;
        top: 10px;
        right: 0;
    }
    .YApps_Widget--Item_Icons-Icon {
        display: inline-block;
        width: 48px;
        height: 48px;
        border: 1px solid var(--yapps-widget-middlegray-color);
        padding: 6px;
        border-radius: 5px;
        margin-left: 15px;
        cursor: pointer;
    }
    .YApps_Widget--Item_Icons-Icon svg {
        fill: var(--yapps-widget-fill-color);
        width: 36px;
        height: 36px;
    }
    .YApps_Widget--Map {
        height: calc(100% - 410px);
        margin-top: 410px;
    }

    .YApps_Widget--SecondView {
        display: block;
        width: 100%;
        height: calc(100% - 50px);
        position: absolute;
        top: 50px;
        left: 0;
        background-color: var(--yapps-widget-bg-color);
        z-index: 14000;
    }
    .YApps_Widget--SecondView_Title {
        color: var(--yapps-widget-fill-color);
        font-size: 26px;
        font-weight: 400;
        margin-bottom: 15px;
        line-height: 1.2em;
        padding: 0 15px;
    }
    .YApps_Widget--SecondView_Text {
        color: var(--yapps-widget-text-color);
        margin-bottom: 15px;
}
    .YApps_Widget--SecondView_Items {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 30px;
    }
    .YApps_Widget--SecondView_Items-Item {
        flex: 0 1 calc(100% / 3 - 15px);
        padding: 10px;
        width: 160px;
        text-align: center;
        margin-bottom: 30px;
    }
    .YApps_Widget--SecondView_Items-Item img {
        width: 48px;
        height: 48px;
    }
}
</style>