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
                const deaths = daysRange.map(day => day.deaths);
                const cases = daysRange.map(day => day.cases);
                return {
                    labels: x_values,
                    datasets: [
                        {
                            label: 'Total Deaths Over time Test Data',
                            backgroundColor: '#0C7BDC', //rgba(12, 123, 220, 1)
                            data: deaths
                        },
                        {
                            label: 'Total Infections Over time',
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