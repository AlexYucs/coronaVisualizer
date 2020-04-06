<template>
    <el-row justify="center">
        <el-header>
            <el-row justify="center"><h1>{{ state? state : "US" }} Covid-19 Chart</h1></el-row>
        </el-header>
        <p>here</p>
    </el-row>
</template>

<script>
    export default {
        name: 'Chart',
        props: {
            state: String
        }
    }
</script>