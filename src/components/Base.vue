<template>
  <div :style="YAppsRootStyles">
    <WidgetsCover 
        @hide-all-widgets="HideAllWidgets"
        ref="WidgetsCover"
        />
    <HelperButtons 
        @do-action="doAction"
        @push-goal="PushGoal"
        />
    <WidgetCB 
        @send="Send" 
        @hide-widget="HideWidget"
        v-if="!!Widgets.CB"
        ref="WidgetCB"
        />
    <WidgetCI 
        @send="Send" 
        @hide-widget="HideWidget"
        v-if="!!Widgets.CI"
        ref="WidgetCI"
        />
    <WidgetLG 
        @send="Send" 
        @hide-widget="HideWidget"
        v-if="!!Widgets.LG"
        ref="WidgetLG"
        />
    <WidgetMS 
        @hide-widget="HideWidget"
        @push-goal="PushGoal"
        v-if="!!Widgets.MS"
        ref="WidgetMS"
        />
    <WidgetNV 
        @hide-widget="HideWidget"
        @push-goal="PushGoal"
        v-if="!!Widgets.NV"
        ref="WidgetNV"
        />
    <WidgetEH 
        @hide-widget="HideWidget"
        @show-widget="ShowWidget"
        @start-timeouts="startTimeouts"
        @stop-timeouts="stopTimeouts"
        @send="Send" 
        v-if="!!Widgets.EH"
        ref="WidgetEH"
        />
  </div>
</template>

<script>
import YAppAxios from 'axios';

import WidgetsCover from './Widgets/WidgetsCover.vue';
import HelperButtons from './Helper/HelperButtons.vue';
import WidgetCB from './Widgets/WidgetCB.vue';
import WidgetCI from './Widgets/WidgetCI.vue';
import WidgetLG from './Widgets/WidgetLG.vue';
import WidgetMS from './Widgets/WidgetMS.vue';
import WidgetNV from './Widgets/WidgetNV.vue';
import WidgetEH from './Widgets/WidgetEH.vue';

export default {
    name: 'Base',
    components: {
        WidgetsCover,
        HelperButtons,
        WidgetCB,
        WidgetCI,
        WidgetLG,
        WidgetMS,
        WidgetNV,
        WidgetEH
    },
    mounted: function() {

        let Form = this.$store.state.Form;
        Form.SendData.Referrer = document.referrer;
        Form.SendData.SourceLink = location.href;
        Form.SendData.Referrer = document.getElementsByTagName("title")[0].innerText;

        Form.SendData.YandexVisitorID = this.Cookie_Get('_ym_uid');
        Form.SendData.GoogleVisitorID = this.Cookie_Get('_ga');
        Form.SendData.MatomoVisitorID = this.Cookie_GetMatomoID();

        let Helper = this.$store.state.Helper;
        if ( window['calltouch_phone_'+Helper.CTSession] ) Helper.Buttons.Items[Helper.Buttons.Items.length-1].Target = 'tel:'+this.FormatPhoneOut(window['calltouch_phone_'+Helper.CTSession]);
        if ( window['calltouch_phone'] ) Helper.Buttons.Items[Helper.Buttons.Items.length-1].Target = 'tel:'+this.FormatPhoneOut(window['calltouch_phone']);

        Helper.Buttons.Interval = ( window.innerWidth <= 768 ) ? 15 : 30;

        Helper.IntervalID = setInterval(() => {
            Helper.Buttons.Items.forEach(function(b, i) {
                setTimeout(() => {
                    b.Active = true;
                }, i*800);
                setTimeout(() => {
                    b.Active = false;
                }, i*800+800);
            });
        }, Helper.ActiveInterval*1000);

        this.startTimeouts();
    },
    computed: {
        YAppsRootStyles: function() {
            return {
                '--yapps-widget-bg-color': this.$store.state.Colors.ColorBg,
                '--yapps-widget-darkbg-color': this.$store.state.Colors.ColorDarkBg,
                '--yapps-widget-fill-color': this.$store.state.Colors.ColorFill,
                '--yapps-widget-text-color': this.$store.state.Colors.ColorText,
                '--yapps-widget-button-color': this.$store.state.Colors.ColorButton,
                '--yapps-widget-button-text-color': this.$store.state.Colors.ColorButtonText,
                '--yapps-widget-error-color': this.$store.state.Colors.ColorError,
                '--yapps-widget-lightgray-color': this.$store.state.Colors.ColorLightgray,
                '--yapps-widget-middlegray-color': this.$store.state.Colors.ColorMiddlegray,
                '--yapps-widget-darkgray-color': this.$store.state.Colors.ColorDarkgray,
                '--yapps-widget-shadow-color': this.$store.state.Colors.ColorShadow,
                'font-family': this.$store.state.Fonts,
                'box-sizing': 'border-box',
                'letter-spacing': 'normal',
                'line-height': 'normal'
            }
        },
        Widgets() { return this.$store.state.Widgets.Items },
        TimeoutedWidgets() {
            
            return this.$store.state.Widgets.Items.filter(function (item) {
                return !!item.Timeouts;
            });
        }
    },
    methods: {
        
        // Cookie
        Cookie_Get(name) {
            
            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return matches ? decodeURIComponent(matches[1]) : false;
        },
        Cookie_GetMatomoID() {

            for (let cookie of document.cookie.split('; ')) {
                
                let [name, value] = cookie.split("=");
                if (~name.indexOf("_pk_id.1.")) return decodeURIComponent(value);
            }

            return false;
        },
        Cookie_Set(name, value, options) {
            
            options = options || {};
            let expires = options.expires;
            if (typeof expires == "number" && expires) {
                let d = new Date();
                d.setTime(d.getTime() + expires * 1000);
                expires = options.expires = d;
            }
            if (expires && expires.toUTCString) options.expires = expires.toUTCString();
            value = encodeURIComponent(value);
            let updatedCookie = name + "=" + value;
            for (let propName in options) {
                updatedCookie += "; " + propName;
                let propValue = options[propName];
                if (propValue !== true) updatedCookie += "=" + propValue;
            }
            document.cookie = updatedCookie;
        },
        Cookie_Del(name) { this.Cookie_Set(name, "", { expires: -1 }) },

        // Email / Phone
        CheckEmail(email) {

            let re = /^(([^<>()[]\\.,;:\s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|("\.+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        FormatPhoneOut(q) {

            q = q.replace(/[^\d;]/g, '');
            return '+' + q[0] + ' (' + q[1] + q[2] + q[3] + ') ' + q[4] + q[5] + q[6] + '-' + q[7] + q[8] + '-' + q[9] + q[10];
        },
        FormatPhoneIn(q) { return String(q).replace(/[^\d;]/g, '') },
        
        
        
        HideAllWidgets() {
            
            let Widgets = this.$store.state.Widgets;
            for (let i in Widgets.Items) {
                if ( typeof Widgets.Items[i].Status != 'undefined' && Widgets.Items[i].Status == true ) Widgets.Items[i].Status = false;
            }

            let Buttons = this.$store.state.Helper.Buttons.Items;
            Buttons.forEach(function(b, i) {
                Buttons[i].Active = false;
            });
            this.startTimeouts();
        },
        HideWidget( item ) {
            
            let Widget = this.$store.state.Widgets.Items[item];
            Widget.Status = false;
            this.$refs.WidgetsCover.Hide();

            let Buttons = this.$store.state.Helper.Buttons.Items;
            Buttons.forEach(function(b, i) {
                Buttons[i].Active = false;
            });
            this.startTimeouts();
        },
        ShowWidget(item) {
            
            this.HideAllWidgets();
            let Widget = this.$store.state.Widgets.Items[item];
            Widget.Status = true;
            this.$refs['Widget'+item].Init();
            this.$refs.WidgetsCover.Show();

            let Buttons = this.$store.state.Helper.Buttons.Items;
            Buttons.forEach(function(b, i) {
                if ( b.Type == 'widget' && b.Target == item ) Buttons[i].Active = true;
            });
            this.stopTimeouts();
        },


        doAction( item ) {

            let Button = this.$store.state.Helper.Buttons.Items[item];
            if ( Button.Type == 'widget' ) this.ShowWidget(Button.Target);
            if ( Button.Type == 'link' ) location.href = Button.Target;
            if ( typeof Button.Content != 'undefined' && Button.Content.HideOnClick ) Button.Content.Status = false;
        },


        // Timeouts
        startTimeouts() {

            let App = this;
            let Widgets = this.$store.state.Widgets.Items;

            for ( let k in Widgets ) {

                if ( Widgets[k].Timeouts ) {

                    if ( !Widgets[k].Cookies.Status ) {
                        
                        if ( !Widgets[k].TimeoutID ) {

                            Widgets[k].TimeoutID = setTimeout(() => {
                                App.ShowWidget(k);
                            }, Widgets[k].Timeouts[0]*1000);
                        }
                    
                    } else {

                        if ( !App.Cookie_Get(Widgets[k].Cookies.Name) ) {

                            if ( !Widgets[k].TimeoutID ) {
                                
                                Widgets[k].TimeoutID = setTimeout(() => {
                                    App.Cookie_Set(Widgets[k].Cookies.Name, 1);
                                    App.ShowWidget(k);
                                }, Widgets[k].Timeouts[0]*1000);
                            }

                        } else {
                            
                            if ( Widgets[k].Timeouts.length > Number(App.Cookie_Get(Widgets[k].Cookies.Name)) ) {
                                
                                let Count = Number(App.Cookie_Get(Widgets[k].Cookies.Name));

                                if ( !Widgets[k].TimeoutID ) {
                                    
                                    Widgets[k].TimeoutID = setTimeout(() => {
                                        App.Cookie_Set(Widgets[k].Cookies.Name, Count+1);
                                        App.ShowWidget(k);
                                    }, Widgets[k].Timeouts[Count]*1000);
                                }
                            }
                        }
                    }

                }
            }
        },
        stopTimeouts() {

            let Widgets = this.$store.state.Widgets.Items;
            for ( let k in Widgets ) if ( Widgets[k].TimeoutID ) { clearTimeout( Widgets[k].TimeoutID ); Widgets[k].TimeoutID = null; }
        },


        // Forms
        Send( widget ) {
            
            let Form = this.$store.state.Form;
            let Widget = this.$store.state.Widgets.Items[widget];
            Form.SendData.EventAction = 'Заказ немедленного звонка';

            if ( Form.DelayedCall.Status ) {

                Form.SendData.DelayedCall = '';
                Form.SendData.DelayedCall += ( Form.DelayedCall.Worktime.Status ) ? Form.DelayedCall.Worktime.TodayText+' в ' : Form.DelayedCall.Worktime.TomorrowText+' в ';
                Form.SendData.DelayedCall += Form.DelayedCall.Worktime.Times[Form.DelayedCall.Worktime.Selected.HourIndex].Hour+':';
                Form.SendData.DelayedCall += Form.DelayedCall.Worktime.Times[Form.DelayedCall.Worktime.Selected.HourIndex].Minutes[Form.DelayedCall.Worktime.Selected.MinutesIndex];
                Form.SendData.EventAction = 'Заказ отложенного звонка';
            }
            
            Form.SendData.AppName = 'Widgets';
            Form.SendData.Id = Widget.Id;
            Form.SendData.EventCategory = null;
            Form.SendData.EventType = Widget.UrlName;
            
            console.log( Form.SendData );

            YAppAxios.post(
                'https://apps.yug-avto.ru/API/stat/?token=34b5ac8b71018c0bc7e5c050ed90b243',
                Form.SendData,
                {headers: Form.Headers}
            )
            .then(function (response) {
                console.log(response);
                console.log(window.dataLayer);

                let GoalData = {

                    Category: 'Виджеты',
					IDTone: {
                        Flag: true,
                        Category: Widget.IDToneCategory
                    },
					Action: Form.SendData.EventAction,
					Name: 'ID: '+Widget.Id+'. '+Widget.Title,
					Yandex: ( Form.DelayedCall.Status ) ? 'YApps_Goals-Widgets_'+Widget.Type.keyword+'-Send_Now' : 'YApps_Goals-Widgets_'+Widget.Type.keyword+'-Send_Later',
                    YandexCounter: Form.SendData.YandexCounter,
					CallTouch: {
						Flag: true,
						Phone: Form.SendData.Phone,
                        Name: Form.SendData.Name || null,

                        CTSiteID: Form.SendData.CTSiteID,
                        CTSession: Form.SendData.CTSession

					}
                };

                // Metrics
                if ( typeof window.dataLayer != 'undefined' && GoalData.IDTone.Flag ) window.dataLayer.push({'event': 'FormSubmission', 'eventCategory': GoalData.IDTone.Category, 'eventAction': 'submit' });
                if ( typeof window.Matomo != 'undefined' ) window._paq.push(["trackEvent", GoalData.Category, GoalData.Action, GoalData.Name]);
                if ( typeof window[GoalData.YandexCounter] != 'undefined' && typeof GoalData.Yandex != 'undefined' ) window[GoalData.YandexCounter].reachGoal(GoalData.Yandex);
                
                // CallTouch
                if ( GoalData.CallTouch.Flag ) { 
                
                    let CallTouchURL = 'https://api.calltouch.ru/calls-service/RestAPI/requests/'+GoalData.CallTouch.CTSiteID+'/register/';
                    CallTouchURL += '?subject='+encodeURIComponent(GoalData.Name)+' '+encodeURIComponent(GoalData.Action);
                    CallTouchURL += '&sessionId='+window['call_value_'+GoalData.CallTouch.CTSession];
                    CallTouchURL += '&phoneNumber='+GoalData.CallTouch.Phone.replace(/[^\d;]/g, '');
                    if ( GoalData.CallTouch.Name ) CallTouchURL += '&fio='+encodeURIComponent(GoalData.CallTouch.Name);
                    CallTouchURL += '&requestUrl='+location.href;
                    
                    let request = new XMLHttpRequest();
                    request.open('GET', CallTouchURL, true);
                    request.send();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        PushGoal( GoalData ) {

            console.log( GoalData );

            // Metrics
            if ( typeof window.dataLayer != 'undefined' && GoalData.IDTone.Flag ) window.dataLayer.push({'event': 'FormSubmission', 'eventCategory': GoalData.IDTone.Category, 'eventAction': 'submit' });
            if ( typeof window.Matomo != 'undefined' ) window._paq.push(["trackEvent", GoalData.Category, GoalData.Action, GoalData.Name]);
            if ( typeof window[GoalData.YandexCounter] != 'undefined' && typeof GoalData.Yandex != 'undefined' ) window[GoalData.YandexCounter].reachGoal(GoalData.Yandex);
            
            // CallTouch
            if ( GoalData.CallTouch.Flag ) { 
            
                let CallTouchURL = 'https://api.calltouch.ru/calls-service/RestAPI/requests/'+GoalData.CallTouch.CTSiteID+'/register/';
                CallTouchURL += '?subject='+encodeURIComponent(GoalData.Name)+' '+encodeURIComponent(GoalData.Action);
                CallTouchURL += '&sessionId='+window['call_value_'+GoalData.CallTouch.CTSession];
                CallTouchURL += '&phoneNumber='+GoalData.CallTouch.Phone.replace(/[^\d;]/g, '');
                if ( GoalData.CallTouch.Name ) CallTouchURL += '&fio='+encodeURIComponent(GoalData.CallTouch.Name);
                CallTouchURL += '&requestUrl='+location.href;
                
                let request = new XMLHttpRequest();
                request.open('GET', CallTouchURL, true);
                request.send();
            }
        }
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700,700i&subset=cyrillic');
.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

@media (max-width: 767px) {
    .YApps_Widget--Container {
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        z-index: 16000;
        margin: 0;
    }
}
</style>