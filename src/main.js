import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Importa o CSS do RPGUI e nes.css
// import 'rpgui/dist/rpgui.min.css'
import 'nes.css/css/nes.min.css';
// Importa o JS do RPGUI (necessário para elementos dinâmicos como sliders e progress bars)
// import 'rpgui/dist/rpgui.min.js'
const app = createApp(App)
app.use(router)

app.mount('#app')
