<template>
    <div>
        <div 
            class="YApps_Widget--Item_Text" 
            v-html="item.Text"></div>
    </div>
</template>

<script>
export default {
    name: 'EHText',
    props: ['item']
}
</script>

<style scoped>
.YApps_Widget--Item_Text {
    padding: 10px;
    background-color: var(--yapps-widget-darkbg-color);
    border-radius: 5px;
    margin-bottom: 15px;
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
</style>