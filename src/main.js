import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from './aws-exports'

Amplify.configure(awsconfig);

Vue.use(AmplifyPlugin, AmplifyModules);
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app');
