
<template>

     <div>
      <label class="h2">Date</label>
                            <div>
                                <multiselect
                                    class="dateSelect"
                                    v-model="date.selected.day"
                                    :options="date.options.days"
                                    :allowEmpty="false"
                                    :showLabels="false"
                                >
                                </multiselect>

                                <multiselect
                                    class="dateSelect"
                                    v-model="date.selected.month"
                                    :options="date.options.months"
                                    label="name"
                                    track-by="index"
                                    :allowEmpty="false"
                                    :showLabels="false"
                                    @input="updateDayOptions"
                                >
                                </multiselect>

                                <multiselect
                                    class="dateSelect"
                                    v-model="date.selected.year"
                                    :options="date.options.years"
                                    :allowEmpty="false"
                                    :showLabels="false"
                                    @input="updateIsLeapYear"
                                >
                                </multiselect>
                            </div>
      </div>


</template>

<script>
import firebase from "firebase";
import Multiselect from 'vue-multiselect';
export default {
  name: "Showcase",

  data: function() {
    return{


      date: {
                selected: {
                    day: 1,
                    month: {
                        index: 0,
                        name: "January",
                        days: 31
                    },
                    year: 1970,
                },
                options: {
                    days: [],
                    months: [
                        {
                            index: 0,
                            name: "January",
                            days: 31
                        },
                        {
                            index: 1,
                            name: "February",
                            days: 28
                        },
                        {
                            index: 2,
                            name: "March",
                            days: 31
                        },
                        {
                            index: 3,
                            name: "April",
                            days: 30
                        },
                        {
                            index: 4,
                            name: "May",
                            days: 31
                        },
                        {
                            index: 5,
                            name: "June",
                            days: 30
                        },
                        {
                            index: 6,
                            name: "July",
                            days: 31
                        },
                        {
                            index: 7,
                            name: "August",
                            days: 31
                        },
                        {
                            index: 8,
                            name: "September",
                            days: 30
                        },
                        {
                            index: 9,
                            name: "October",
                            days: 31
                        },
                        {
                            index: 10,
                            name: "November",
                            days: 30
                        },
                        {
                            index: 11,
                            name: "December",
                            days: 31
                        }
                    ],
                    years: []
                }
            }
    }

  },
  methods:{
    isLeapYear: function(year){
            if(year % 4 === 0){
                if(year % 100 === 0){
                    return year % 400 === 0;
                }

                return true;
            }

            return false;
        },
        updateDayOptions: function(){
            var month = this.date.selected.month;

            var daysArray = this.date.options.days;
            if(daysArray.length === month.days){
                return;
            }

            daysArray.length = 0;
            for(var i=1; i <= month.days; i++){
                daysArray.push(i);
            }

            if(this.date.selected.day > month.days){
                this.date.selected.day = month.days;
            }
        },
        updateIsLeapYear: function(year){
            var year = this.date.selected.year;

            var february = this.date.options.months[1];
            if(this.isLeapYear(year)){
                february.days = 29;
            }else{
                february.days = 28;
            }

            if(this.date.selected.month.index === february.index){
                this.updateDayOptions();
            }
        }


  },
  mounted:function(){

        var now = new Date();
        for(var i=now.getFullYear() + 2; i > 1940; i--){
            this.date.options.years.push(i);
        }

        var selected = this.date.selected;
        selected.year = now.getFullYear();
        this.updateIsLeapYear();

        selected.month = this.date.options.months[now.getMonth()];

        selected.day = now.getDate();
        this.updateDayOptions();

  },
  components: {
        Multiselect
    }



}

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
#drop-area {
    border: 3px dashed #CCCCCC;
    border-radius: 20px;
    width: 60%;
    margin: auto;
    padding: 20px;
}
#progress-bar {
    width: 100%;
}
#drop-area.highlight {
    border-color: purple;
}
.my-form {
    margin-bottom: 10px;
}
#gallery {
    margin-top: 10px;
}
#gallery img {
    width: 15%;
    margin-bottom: 10px;
    margin-right: 10px;
    vertical-align: middle;
}
#fileElem {
    display: none;
}

.dateSelect {
    display: inline-block;
    width: 25%;
}
</style>
