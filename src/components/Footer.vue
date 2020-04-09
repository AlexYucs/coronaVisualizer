<template>
    <el-footer>
        <el-row justify="center" >
            <el-col class="links">
                <a class="icon" href="https://github.com/AlexYucs/coronaVisualizer"><i class="fa fa-github fa-fw fa-3x"></i></a>
            </el-col>
        </el-row>
    </el-footer>
</template>

<script>
    export default {
        name: 'Footer',
        props: {
        }
    }
</script>

<style>
    .el-footer, .page-wrap:after{
        height: 50px;
    }
    .el-footer {
        overflow: hidden;
        position: relative;
        bottom:0;
        width: 100%;
        background-color: #191919;
    }

    .icon{
        color: #fff;
    }
</style>