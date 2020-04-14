<template>
    <el-row justify="center">
        <ApolloQuery
                :query="gql => gql`
                    query getStateQuery ($id: String!) {
                      getState (id: $id){
                        name
                        days{
                          date
                          deaths
                          cases
                        }
                       }
                    }
                  `"
                :variables="{ id }"
        >
            <template v-slot="{ result: { loading, error, data } }">
                <!-- Loading -->
                <div v-if="loading" class="loading apollo">
                    <el-row justify="center">
                        Loading... <i class="el-icon-loading"></i>
                        <TotalInfections class="infectionChart loading" :chartData=emptyData :options={responsive:true} />
                    </el-row>
                </div>

                <!-- Error -->
                <div v-else-if="error" class="error apollo">An error occurred</div>

                <!-- Result -->
                <div v-else-if="checkData(data)" class="result apollo">
                    <el-row justify="center">
                        <div v-if="data.getState.days[value[0]] && data.getState.days[value[1]-1]">
                            <el-row justify="center"><h1>{{ id }} Cases: {{data.getState.days[value[0]].date.slice(5, 10)}} to {{data.getState.days[value[1]-1].date.slice(5, 10)}}   <i class="el-icon-delete" @click="removeStateChart"></i></h1>
                            </el-row>
                        </div>
                        <el-slider
                                id="dateSlider"
                                v-model="value"
                                :change=sliderChanged()
                                range
                                show-stops
                                :marks="marks"
                                :show-tooltip="false"
                                :max="data.getState.days.length">
                        </el-slider>
                        <TotalInfections class="infectionChart"  :chartData=formatData(data.getState) :options=chartOptions />
                        <el-switch
                                class="switch"
                                v-model="totalMode"
                                active-text="Total"
                                inactive-text="New">
                        </el-switch>
                    </el-row>
                 </div>

                <!-- No result -->
                <div v-else class="no-result loading apollo">
                    <el-row justify="center">
                        Loading... <i class="el-icon-loading"></i>
                        <TotalInfections class="infectionChart" :chartData=emptyData :options={responsive:true} />
                    </el-row>
                </div>
            </template>
        </ApolloQuery>
    </el-row>
</template>

<script>
    import TotalInfections from './TotalInfections'

    //TODO Scroll after chart updates
    export default {
        name: 'Chart',
        props: {
            id: String,
            removeState: Function
        },
        components: {
            TotalInfections
        },
        data () {
            return {
                totalMode:true,
                value: 0,
                marks:{},
                emptyData: {
                    labels: [],
                    datasets: []
                },
                chartOptions:{
                    responsive: true,
                    maintainAspectRatio: false,
                    animation:{
                        onComplete: this.autoScroll
                    }
                },
                stateData: {}
            }
        },
        methods: {
            formatData(stateData){
                const { days } = stateData;
                const daysRange = days.slice(this.value[0], this.value[1]);
                const x_values = daysRange.map(day => day.date.slice(5, 10));
                let total_cases = 0;
                let total_deaths = 0;
                const deaths = this.totalMode? daysRange.map(day => day.deaths ) : daysRange.map(day => {
                    const new_deaths = day.deaths - total_deaths;
                    total_deaths = day.deaths;
                    return new_deaths;
                });
                const cases = this.totalMode? daysRange.map(day => day.cases ) : daysRange.map(day => {
                    const new_cases = day.cases - total_cases;
                    total_cases = day.cases;
                    return new_cases;
                });

                const death_label = this.totalMode? 'Total Deaths Over time' : 'Deaths Per a Day';
                const cases_label = this.totalMode? 'Total Infections Over time' : 'Cases Per a Day';
                return {
                    labels: x_values,
                    datasets: [
                        {
                            label: death_label,
                            backgroundColor: '#0C7BDC', //rgba(12, 123, 220, 1)
                            data: deaths
                        },
                        {
                            label: cases_label,
                            backgroundColor: '#FFC20A', //rgba(255, 194, 10, 1)
                            data: cases
                        },
                    ]
                };
            },
            checkData(data){
                if (data && data.getState){
/*                    const container = this.$el.querySelector(".result");
                    container && container.scrollIntoView();*/
/*                    const { days } = data.getState;
                    const daysArrayLength = days.length;
                    const formattedDays = days.map(day => day.date.slice(5, 10));
                    this.marks = formattedDays[0];
                    this.marks[daysArrayLength] = formattedDays[daysArrayLength-1];*/
                    this.stateData = Object.assign({}, this.formatData(data.getState));


                    return true;
                }
                return false;

            },
            sliderChanged(){
                //TODO edit some label text
                //console.log(this.value);
                //this.reset = false;
            },
            removeStateChart(){
                this.removeState(this.id);
            },
            autoScroll(){
                const container = this.$el.querySelector(".result");
                container && container.scrollIntoView();
            }
        }
    }
</script>

<style>
    .switch{
        float:right;
        padding-top: 15px;
        padding-left: 300px;
    }
    .infectionChart{
        width: 700px;
        height: 550px;
        margin: auto;
    }
    .loading{
        background-color: rgba(0, 0, 0, 0.1);
    }
    #dateSlider{
        width: 700px;
        margin: auto;
    }
    @media only screen and (max-width: 481px){
        .infectionChart{
            width: 90%;
            height: 75%;
            margin: auto;
        }
        #dateSlider{
            width: 80%;
            margin: auto;
        }
    }
</style>