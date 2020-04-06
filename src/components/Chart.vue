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
                <div v-else-if="data" class="result apollo">{{ data.getState || "Not Populated Yet" }}</div>

                <!-- No result -->
                <div v-else class="no-result apollo">No result :(</div>
            </template>
        </ApolloQuery>
    </el-row>
</template>

<script>
    export default {
        name: 'Chart',
        props: {
            id: String
        }
    }
</script>