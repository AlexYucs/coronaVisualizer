import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'

const apolloClient = new ApolloClient({
  uri: 'https://YOUR_URL_HERE.appsync-api.us-east-1.amazonaws.com/graphql',
  request: (operation) => {
    operation.setContext({
      headers: {
        'x-api-key': 'APIKEYHERE'
      }
    })
  }
});

Vue.use(VueApollo);
Vue.use(ElementUI);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount('#app');
