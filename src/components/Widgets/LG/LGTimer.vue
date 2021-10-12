<template>
    <div 
        class="YApps_Widget--LG--Timer"
        v-if="Widget.Timer.Status"
        :style="{
            'width': Widget.Scheme.Image.Width+'px'
        }"
        >
        <div 
            class="YApps_Widget--LG--Timer_Text"
            :style="{
                'width': Widget.Scheme.Image.Width/2+'px'
            }"
            >{{ Widget.Timer.Text }}:</div>
        <div 
            class="YApps_Widget--LG--Timer_Time"
            :style="{
                'width': Widget.Scheme.Image.Width/2+'px'
            }"
            >
            <span>{{ ('0'+Widget.Timer.Time.d).slice(-2) }}</span>
            <span class="YApps_Widget--LG--Timer_Time-Separatoe">{{ Widget.Timer.Separator }}</span>
            <span>{{ ('0'+Widget.Timer.Time.h).slice(-2) }}</span>
            <span class="YApps_Widget--LG--Timer_Time-Separatoe">{{ Widget.Timer.Separator }}</span>
            <span>{{ ('0'+Widget.Timer.Time.m).slice(-2) }}</span>
            <span class="YApps_Widget--LG--Timer_Time-Separatoe">{{ Widget.Timer.Separator }}</span>
            <span>{{ ('0'+Widget.Timer.Time.s).slice(-2) }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LGTimer',
    computed: {
        Widget() { return this.$store.state.Widgets.Items.LG },
    },
    mounted() {

        let Timer = this.$store.state.Widgets.Items.LG.Timer;
        clearInterval( Timer.ID );
        if ( Timer.Status ) {
            Timer.ID = setInterval(() => {
                
                Timer.Time.s--;
                if ( Timer.Time.s < 0 ) {

                    Timer.Time.s = 59;
                    Timer.Time.m--;

                    if ( Timer.Time.m < 0 ) {

                        Timer.Time.m = 59;
                        Timer.Time.h--;

                        if ( Timer.Time.h < 0 ) {

                            Timer.Time.h = 23;
                            Timer.Time.d--;

                            if ( Timer.Time.d < 0 ) {

                                clearInterval( Timer.ID );
                                this.Hide();
                            }
                        }
                    }
                }
            }, 1000);
        }
    }
}
</script>

<style scoped>
.YApps_Widget--LG--Timer {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 15px;
    display: flex;
    justify-content: space-between;
}
.YApps_Widget--LG--Timer_Text {
    text-align: right;
    line-height: 1;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
}
.YApps_Widget--LG--Timer_Time {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    padding-left: 15px;
}
.YApps_Widget--LG--Timer_Time span {
    font-size: 30px;
    line-height: .9;
}
.YApps_Widget--LG--Timer_Time span.YApps_Widget--LG--Timer_Time-Separatoe {
    padding: 0 5px;
}
</style>