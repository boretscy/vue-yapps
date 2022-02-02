import YAppVue from 'vue';
import YAppVuex from 'vuex';
import YAppVueMask from 'v-mask';
import YAppAxios from 'axios';

import YAppWidgets from './App.vue';

YAppVue.use(YAppVueMask);
YAppVue.use(YAppVuex);

setTimeout(() => {
    
    YAppAxios("https://apps.yug-avto.ru/API/get/widgets/?"+encodeURI('token='+window.yappstoken+'&r='+location.href))
        .then(response => {
            if ( response.data.Development ) console.log( response.data );
            console.log(response.data.Description);
            const YAppStore = new YAppVuex.Store({
                state: response.data,
                mutations: {
                    SetDelayedCall( state, value) { state.Form.DelayedCall.Status = Boolean( Number(value) ) },
                    setSendPhone( state, value ) { state.Form.SendData.Phone = value.replace(/[^\d;]/g, '') },
                  }
            });
            new YAppVue({
                render: h => h(YAppWidgets),
                store: YAppStore,
            })
            .$mount('#YAppWidgets');
        })

}, 500);