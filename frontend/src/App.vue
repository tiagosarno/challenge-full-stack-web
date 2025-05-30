<template>
  <v-app>
    <v-navigation-drawer v-model="isDrawerOpen">
      <template #prepend>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Menu</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list>
        <v-list-item @click="$router.push('/')">
          <v-list-item-title>Alunos</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>
      <v-toolbar-title>Desafio +A Educação</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isDrawerOpen = ref(false)
</script>
