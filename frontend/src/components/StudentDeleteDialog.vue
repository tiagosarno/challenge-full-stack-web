<script lang="ts" setup>
import { ref } from "vue"

const props = defineProps({
  student: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(["delete"])

const dialog = ref(false)
const studentToDelete = ref<number | string>("")

const openDialog = (student: number) => {
  studentToDelete.value = student
  dialog.value = true
}

const confirmDelete = () => {
  emit("delete", studentToDelete.value)
  dialog.value = false
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        color="error"
        prepend-icon="mdi-trash-can-outline"
        variant="text"
        @click="openDialog(student)"
      >
        Excluir
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5"> Confirmar Exclusão </v-card-title>
      <v-card-text>
        <p>Deseja realmente excluir o(a) aluno(a):</p>
        <p>
          <strong>{{ studentToDelete?.name }}</strong>
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false"> Cancelar </v-btn>
        <v-btn color="error" variant="text" @click="confirmDelete"> Confirmar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
