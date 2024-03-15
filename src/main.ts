import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css';

import App from './App.vue'
import Game from './components/Game.vue'
import Help from './components/Help.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/Game' },
        { path: '/game', component: Game },
        { path: '/Help', component: Help },
    ]
});

const app = createApp(App)
app.use(router);
app.mount('#app')