import YAppVue from 'vue';
import YAppVuex from 'vuex';
import YAppVueMask from 'v-mask';
import YAppAxios from 'axios';

import YAppWidgets from './App.vue';

YAppVue.use(YAppVueMask);
YAppVue.use(YAppVuex);

YAppAxios("https://apps.yug-avto.ru/API/get/widgets/?"+encodeURI('token='+window.yappstoken+'&r='+location.href))
    .then(response => {
        const YAppStore = new YAppVuex.Store({
            state: response.data
        });
        new YAppVue({
            render: h => h(YAppWidgets),
            store: YAppStore,
        })
        .$mount('#YAppWidgets');
    })
    .catch(error => { console.log(error) });