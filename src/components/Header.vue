<template>
    <el-container>
        <el-header>
            <el-row justify="center" type="flex">
                <h1 class="long-title">Coronalytics US Covid-19 Data</h1>
                <h1 class="short-title">US Covid-19 Data</h1>
            </el-row>
        </el-header>
    </el-container>
</template>

<script>
    export default {
        name: 'Header',
        props: {
        }
    }
</script>

<style>

    .el-header {
        overflow: hidden;
        position: relative;
        margin-bottom: 25px;
        width: 100%;
        height: 60px;
        color: #fff;
        background-color: #2b2b2b;
    }

    .short-title{
        display: none;
    }

    @media only screen and (max-width: 481px){
        .long-title{
            display: none;
        }
        .short-title{
            display: inline-block;
        }
    }
</style>