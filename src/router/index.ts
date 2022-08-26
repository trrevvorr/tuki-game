import { createRouter, createWebHistory } from "vue-router";
import GameView from "../views/GameView.vue";
import ConnectionView from "../views/ConnectionView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
