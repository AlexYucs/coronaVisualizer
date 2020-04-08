<template>
    <el-row justify="center">
        <el-header>
            <el-row justify="center"><h1>{{ id }} Covid-19 Chart</h1></el-row>
        </el-header>
        <ApolloQuery
                :query="gql => gql`
                    query getStateQuery ($id: String!) {
                      getState (id: $id){
                        name
                        mobility{
                            reportDate
                            residential
                            recreation
                            grocery
                            parks
                            transit
                            work
                        }
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
                <div v-if="loading" class="loading apollo">Loading...</div>

                <!-- Error -->
                <div v-else-if="error" class="error apollo">An error occurred</div>

                <!-- Result -->
                <div v-else-if="data" class="result apollo">
                    <div v-if="data.getState" class="result worked apollo">
                        <el-row justify="center"><TotalInfections class="infectionChart" :chartData=formatData(data.getState) />
                        </el-row>
                    </div>
                    <div v-else class="result empty apollo">"Not Populated Yet"</div>
                 </div>

                <!-- No result -->
                <div v-else class="no-result apollo">No result :(</div>
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
            id: String
        },
        components: {
            TotalInfections
        },
        data () {
            return {
            }
        },
        methods: {
            formatData(stateData){
                const { days } = stateData;
                const x_values = days.map(day => day.date.slice(5, 10));
                const deaths = days.map(day => day.deaths);
                const cases = days.map(day => day.cases);
                return {
                    labels: x_values,
                    datasets: [
                        {
                            label: 'Total Deaths Over time Test Data',
                            backgroundColor: '#0C7BDC',
                            data: deaths
                        },
                        {
                            label: 'Total Infections Over time',
                            backgroundColor: '#FFC20A',
                            data: cases
                        },
                    ]
                };
            }
        }
    }
</script>

<style>
    .infectionChart{
        width: 700px;
        margin: auto;
    }
    @media only screen and (max-width: 481px){
        .infectionChart{
            width: 90%;
            margin: auto;
        }
    }

</style>