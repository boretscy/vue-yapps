<template>
    <transition name="fade">
        <div 
            class="YApps_Widget--Container"
            v-if="Widget.Status"
            >
            <BaseBackButton 
                @back="Init"
                v-if="Widget.BackStatus"
                />
            <BaseCloseButton 
                @hide="Hide"
                />
            <!-- <div class="YApps_Widget--Title">{{ Widget.Title}}</div> -->
            <div class="YApps_Widget--Items">
                <div
                    class="YApps_Widget--Item"
                    v-for="(item, indx) in ShowedItems"
                    :key="indx"
                    >
                    <EHButtons
                        v-if="item.Type == 'buttons'"
                        @show-widget="Show"
                        :item="item"
                        />
                    <EHInvolv
                        v-if="item.Type == 'involv'"
                        @show-widget="Show"
                        :item="item"
                        />
                    <EHMessengers
                        v-if="item.Type == 'messengers'"
                        :item="item"
                        />
                    <EHText
                        v-if="item.Type == 'text' && !!item.Text"
                        :item="item"
                        />
                    <EHForm
                        v-if="item.Type == 'form'"
                        @send="Send"
                        ref="EHForm"
                        :item="item"
                        />
                </div>
            </div>
            <EHSocial v-if="!!Widget.Social" />
        </div>
    </transition>
</template>

<script>
import BaseCloseButton from '../Base/BaseCloseButton.vue';
import BaseBackButton from '../Base/BaseBackButton.vue';
import EHButtons from './EH/EHButtons.vue';
import EHInvolv from './EH/EHInvolv.vue';
import EHMessengers from './EH/EHMessengers.vue';
import EHText from './EH/EHText.vue';
import EHForm from './EH/EHForm.vue';
import EHSocial from './EH/EHSocial.vue';

export default {
    name: 'WidgetEH',
    components: {
        BaseCloseButton,
        BaseBackButton,
        EHSocial,
        EHButtons,
        EHInvolv,
        EHMessengers,
        EHText,
        EHForm
    },
    computed: {
        Widget() { return this.$store.state.Widgets.Items.EH },
        ShowedItems() {

            return this.$store.state.Widgets.Items.EH.Items.filter(function (item) {
                return item.Status;
            });
        },
        InitedItems() {

            return this.$store.state.Widgets.Items.EH.Items.filter(function (item) {
                return item.Inited.Status;
            });
        }
    },
    methods: {
        Hide() { this.$emit('hide-widget', 'EH') },
        Show( item ) { this.$emit('show-widget', item) },
        Init() {

            let Widget = this.$store.state.Widgets.Items.EH;
            Widget.Items.forEach(e => { e.Status = false });
            Widget.BackStatus = false;
            Widget.Status = true;

            this.InitedItems.forEach( (item) => {
                
                setTimeout(() => {
                    if ( !item.Cookie.Status ) { item.Status = true; }
                    else {

                        if ( !this.$parent.Cookie_Get(item.Cookie.Name) ) {

                            this.$parent.Cookie_Set(item.Cookie.Name, 1);
                            item.Status = true;

                        } else {

                            if ( Number(item.Cookie.Count) > Number(this.$parent.Cookie_Get(item.Cookie.Name)) ) {
                                
                                this.$parent.Cookie_Set(item.Cookie.Name, Number(this.$parent.Cookie_Get(item.Cookie.Name))+1);
                                item.Status = true;
                            }
                        }
                    }
                    
                }, item.Inited.Delay*1000);
            });
        },
        Send() { this.$emit('send', 'EH') },
    }
}
</script>

<style scoped>
.YApps_Widget--Container {
    height: 620px;
    width: 360px;
	text-align: left;
    position: fixed;
    right: 150px;
    bottom: 50px;
    background-color: var(--yapps-widget-bg-color);
    z-index: 14000;
    padding: 50px 20px 20px;
    font-size: 14px;
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
    bottom: 30px;
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
    margin-bottom: 15px;
}

.YApps_Widget--Items {
    height: calc(100% - 80px);
    overflow-y: scroll;
}
.YApps_Widget--Items::-webkit-scrollbar {
    width: 2px;
    background-color: var(--yapps-widget-bg-color);
}
.YApps_Widget--Items::-webkit-scrollbar-thumb {
    background-color: var(--yapps-widget-button-color);
    border-radius: 1px;
}
.YApps_Widget--Item {
    padding: 10px;
}


</style>