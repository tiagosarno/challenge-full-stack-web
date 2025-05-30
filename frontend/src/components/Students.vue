<script lang="ts" setup>
import StudentDeleteDialog from "./StudentDeleteDialog.vue"
import { defineComponent, ref, onMounted, computed } from "vue"
import api from "@/services/api"

const loaded = ref(false)
const loading = ref(false)
const students = ref([])
const studentsSearchField = ref([])

const handleDeleteStudent = studentId => {
  api.delete(`/students/${studentId}`)
  students.value = students.value.filter(student => student.id !== studentId)
}

onMounted(() => {
  api.get("/students").then(res => {
    students.value = res.data
  })
})

const studentsFiltered = computed(() => {
  if (students.value && studentsSearchField.value.length > 0) {
    return students.value.filter(student => {
      return (
        student.name.toLowerCase().includes(studentsSearchField.value?.toLowerCase()) ||
        student.email.toLowerCase().includes(studentsSearchField.value?.toLowerCase()) ||
        student.ra.toLowerCase().includes(studentsSearchField.value?.toLowerCase()) ||
        student.cpf
          .replace(/\D/g, "")
          .toLowerCase()
          .includes(studentsSearchField.value?.replace(/\D/g, "").toLowerCase())
      )
    })
  }

  return students.value
})
</script>

<template>
  <v-container>
    <h1>Consulta de Alunos</h1>
    <v-row>
      <v-col cols="10">
        <v-card class="mx-auto" color="surface-light">
          <v-card-text>
            <v-text-field
              :loading="loading"
              append-inner-icon="mdi-magnify"
              density="compact"
              label="Digite sua busca"
              variant="solo"
              hide-details
              single-line
              v-model="studentsSearchField"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="justify-center align-center d-flex" cols="2">
        <v-btn to="/student"> Cadastrar Aluno </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">E-mail</th>
              <th class="text-left">RA</th>
              <th class="text-left">CPF</th>
              <th class="text-left">Ações</th>
            </tr>
          </thead>
          <tbody v-if="studentsFiltered.length > 0">
            <tr v-for="(student, index) in studentsFiltered" :key="index">
              <td>{{ student.name }}</td>
              <td>{{ student.email }}</td>
              <td>{{ student.ra }}</td>
              <td>{{ student.cpf }}</td>
              <td>
                <v-btn prepend-icon="mdi-pencil-outline" :to="`/student/${student.id}`" variant="text" color="primary">
                  Editar
                </v-btn>
                <StudentDeleteDialog :student="student" @delete="handleDeleteStudent(student.id)" />
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td class="text-center" colspan="5">Nenhum aluno encontrado no momento</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
