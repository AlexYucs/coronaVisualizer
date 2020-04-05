#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { CoronaVisualizerStack } = require('../lib/corona_visualizer-stack');

const app = new cdk.App();
new CoronaVisualizerStack(app, 'CoronaVisualizerStack');
