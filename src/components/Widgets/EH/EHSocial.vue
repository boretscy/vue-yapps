<template>
    <div class="YApps_Widget--Social">
        <div class="YApps_Widget--Social_Text">{{ Data.Text }}</div>
        <div class="YApps_Widget--Social_Items">
            <a 
                :href="Data.Items.instagram" 
                v-if="!!Data.Items.instagram" 
                target="_blank"
                ><icon-base icon-name="yappsinstagram"><icon-yappsinstagram /></icon-base>
            </a>
            <a 
                :href="Data.Items.youtube" 
                v-if="!!Data.Items.youtube"
                target="_blank"
                ><icon-base icon-name="yappsyoutube"><icon-yappsyoutube /></icon-base>
            </a>
            <a 
                :href="Data.Items.facebook" 
                v-if="!!Data.Items.facebook"
                target="_blank"><icon-base icon-name="yappsfacebook"><icon-yappsfacebook /></icon-base>
            </a>
            <a 
                :href="Data.Items.vkontakte" 
                v-if="!!Data.Items.vkontakte"
                target="_blank"><icon-base icon-name="yappsvkontakte"><icon-yappsvkontakte /></icon-base>
            </a>
        </div>
    </div>
</template>

<script>
import IconBase from '../../Base/IconBase.vue';
import IconYappsinstagram from '../../Base/icons/IconYappsinstagram.vue';
import IconYappsyoutube from '../../Base/icons/IconYappsyoutube.vue';
import IconYappsfacebook from '../../Base/icons/IconYappsfacebook.vue';
import IconYappsvkontakte from '../../Base/icons/IconYappsvkontakte.vue';

export default {
    name: 'EHSocial',
    components: {
        IconBase,
        IconYappsinstagram,
        IconYappsyoutube,
        IconYappsfacebook,
        IconYappsvkontakte
    },
    computed: {
        Data() { return this.$store.state.Widgets.Items.EH.Social }
    }
}
</script>

<style scoped>
.YApps_Widget--Social {
    text-align: center;
    position: absolute;
    bottom: 20px;
    padding: 10px;
    width: calc(100% - 40px);
    background-color: var(--yapps-widget-darkbg-color);
    border-radius: 5px;
}
.YApps_Widget--Social_Items {
    margin-top: 10px;
}
.YApps_Widget--Social_Items a {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--yapps-widget-fill-color);
    padding: 5px;
    transition: .2s;
    margin-right: 10px;
    display: inline-block;
}
.YApps_Widget--Social_Items a:hover {
    background-color: var(--yapps-widget-button-color);
    transition: .2s;
}
.YApps_Widget--Social_Items a svg {
    width: 20px;
    height: 20px;
    transition: .2s;
    fill: var(--yapps-widget-bg-color);
}
.YApps_Widget--Social_Items a:hover svg {
    transition: .2s;
    fill: var(--yapps-widget-button-text-color);
}
</style>