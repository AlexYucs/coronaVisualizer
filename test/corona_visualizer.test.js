const { expect, matchTemplate, MatchStyle } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const CoronaVisualizer = require('../lib/corona_visualizer-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CoronaVisualizer.CoronaVisualizerStack(app, 'MyTestStack');
    // THEN
    expect(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});