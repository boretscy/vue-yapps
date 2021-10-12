<template>
    <div class="YApps_Widget--Form_Field">
        
        <input 
            id="YApps_Widget--Form--DelayedCall_false" 
            @input="setDelayedCall"
            type="radio" 
            :value="0"
            :checked="!DelayedCall.Status"
            name="YApps_Widget--Form-DelayedCall"
            >
        <label
            class="YApps_Widget--Form_Field--Radio_Label"
            for="YApps_Widget--Form--DelayedCall_false"
            >{{ DelayedCall.NowText }}</label>
        
        <input 
            id="YApps_Widget--Form--DelayedCall_true" 
            @input="setDelayedCall"
            type="radio" 
            :value="1"
            :checked="DelayedCall.Status"
            name="YApps_Widget--Form-DelayedCall"
            >
        <label
            class="YApps_Widget--Form_Field--Radio_Label"
            for="YApps_Widget--Form--DelayedCall_true"
            >{{ DelayedCall.DelayedText }}</label>
        
        <div
            v-if="DelayedCall.Status"
            >
            <span
                class="YApps_Widget--Form_Field--Time_Text"
                v-if="DelayedCall.Worktime.Status"
                >{{ DelayedCall.Worktime.TodayText }} в</span>
            <span
                class="YApps_Widget--Form_Field--Time_Text"
                v-if="!DelayedCall.Worktime.Status"
                >{{ DelayedCall.Worktime.TomorrowText }} в</span>
            <span>
                <select @input="setDelayedCallHour">
                    <option
                        v-for="(item, index) in DelayedCall.Worktime.Times"
                        :key="index"
                        :value="index"
                        :selected="index == DelayedCall.Worktime.Selected.HourIndex"
                        >{{ item.Hour }}</option>
                </select>
            </span>
            :
            <span>
                <select @input="setDelayedCallMinutes">
                    <option
                        v-for="(item, index) in DelayedCall.Worktime.Times[DelayedCall.Worktime.Selected.HourIndex].Minutes"
                        :key="index"
                        :value="index"
                        :selected="index == DelayedCall.Worktime.Selected.MinutesIndex"
                        >{{ item }}</option>
                </select>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BaseFormFieldTime',
    computed: {
        DelayedCall() { return this.$store.state.Form.DelayedCall }
    },
    methods: {
        setDelayedCall(e) { 
            
            this.$store.commit('SetDelayedCall', e.target.value);
            let DelayedCall = this.$store.state.Form.DelayedCall;

            DelayedCall.Worktime.Selected.HourIndex = 0;
            DelayedCall.Worktime.Selected.MinutesIndex = 0;
            DelayedCall.Worktime.Times = [];

            if ( DelayedCall.Status ) {

                let d = new Date();
                let h = d.getHours(), m = d.getMinutes(), curHour = {};
                if ( m >= 45 ) h++;

                if ( h < DelayedCall.Worktime.Start || h >= DelayedCall.Worktime.End ) {
                    
                    DelayedCall.Worktime.Status = false;
                    h = DelayedCall.Worktime.Start; m = 0;
                }

                for ( let hour = h; hour < DelayedCall.Worktime.End; hour++ ) {

                    curHour = {}; curHour.Hour = ((hour<10)?'0'+String(hour):String(hour)); curHour.Minutes = [];
                    let minutes = 0;
                    
                    if ( hour == h ) {

                        minutes = m;
                        if ( m > 0 ) minutes = 15;
                        if ( m > 15 ) minutes = 30;
                        if ( m > 30 ) minutes = 45;
                    }

                    for ( minutes; minutes <= 45; minutes += 15 ) curHour.Minutes.push( ((minutes<10)?'0'+String(minutes):String(minutes)) );
                    DelayedCall.Worktime.Times.push( curHour );
                }
            }
        },

        setDelayedCallHour(e) { 
            
            let DelayedCall = this.$store.state.Form.DelayedCall;
            DelayedCall.Worktime.Selected.HourIndex = e.target.value;
            DelayedCall.Worktime.Selected.MinutesIndex = 0;
            
        },
        setDelayedCallMinutes(e) {

            let DelayedCall = this.$store.state.Form.DelayedCall;
            DelayedCall.Worktime.Selected.MinutesIndex = e.target.value;
        }
    },
        
}
</script>

<style scoped>
.YApps_Widget--Form_Field {
    text-align: left;
    margin-top: 15px;
}
.YApps_Widget--Form_Field--Radio_Label {
    margin-right: 20px;
    margin-left: 10px;
}
.YApps_Widget--Form_Field span {
    margin: 15px 0 0;
    display: inline-block;
}
.YApps_Widget--Form_Field select {
    font-size: 15px;
    padding: 5px 10px;
    border: 1px solid var(--yapps-widget-darkgray-color);
}
.YApps_Widget--Form_Field--Time_Text {
    padding-right: 15px;
}
</style>