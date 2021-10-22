<template>
    <div>
        <div 
            class="YApps_Widget--Item_Text" 
            v-html="item.Text"></div>
        <div 
            class="YApps_Widget--Item_Items"
            v-if="!!item.items"
            >
            <a
                class="YApps_Widget--Item_Item"
                v-for="(i, k) in item.items"
                :href="i.value"
                :key="k"
                @click.prevent="toAction(i)"
                >{{ i.text }}</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EHInvolv',
    props: ['item'],
    computed: {},
    methods: {
        
        toAction(i) {

            let Widget = this.$store.state.Widgets.Items.EH;
            switch( i.action ) {

                case 'widget':
                    this.$emit('show-widget', i.value);
                    break;

                case 'link':
                    window.open(i.value);
                    break;

                case 'step':
                    if ( i.blank ) {
                        Widget.Items.forEach(e => { e.Status = false });
                        Widget.BackStatus = true;
                    }
                    Widget.Items.forEach(e => { if ( e.Indx == i.value ) e.Status = true });
                    break;

                default: return false;
            }
            return false;
        },
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
    display: block;
    text-align: right;
    margin-top: 15px;
}
a.YApps_Widget--Item_Item {
    padding: 10px;
    margin: 0 10px 10px 0;
    background-color: var(--yapps-widget-button-color);
    color: var(--yapps-widget-button-text-color);
    border-radius: 5px;
    font-size: 12px;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
}
a.YApps_Widget--Item_Item:hover {
    text-decoration: none;
    background-color: var(--yapps-widget-fill-color);
    color: var(--yapps-widget-bg-color);
}
</style>