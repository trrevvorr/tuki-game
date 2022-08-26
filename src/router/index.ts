import { createRouter, createWebHashHistory } from "vue-router";
import GameView from "../views/GameView.vue";
import ConnectionView from "../views/ConnectionView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "game",
      component: GameView,
    },
    {
      path: "/connect",
      name: "connect",
      component: ConnectionView,
    },
  ],
});

export default router;
