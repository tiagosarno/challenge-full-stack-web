<script lang="ts" setup>
import { ref, onMounted, computed } from "vue"
import { useRouter, useRoute } from "vue-router"
import type { AxiosResponse } from "axios"
import api from "@/services/api"

import { mask } from "vue-the-mask"
import { cpf as cpfValidator } from "cpf-cnpj-validator"

const vMask = mask
const router = useRouter()
const route = useRoute()
const loading = ref(false)
const isEditMode = ref(false)
const alunoId = ref(null)

interface FormData {
  name: string
  email: string
  ra: number | string
  cpf: string
}

interface Student {
  id: number
  name: string
  email: string
  ra: number
  cpf: string
}

const form = ref<FormData>({
  name: "",
  email: "",
  ra: "",
  cpf: "",
})

const snackbar = ref(false)
const snackbarText = ref("")
const snackbarColor = ref("blue-lighten-5")

const nameRules = [
  (v: string) => !!v || "Nome é obrigatório",
  (v: string) => (v && v.length >= 3) || "Nome deve ter pelo menos 3 caracteres",
]
const emailRules = [
  (v: string) => !!v || "E-mail é obrigatório",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
]
const raRules = [
  (v: string) => !!v || "RA é obrigatório",
  (v: string) => (v || "").length <= 10 || "RA com no máximo de 10 caracteres",
]
const cpfRules = [
  (v: string) => !!v || "CPF é obrigatório",
  (v: string) => (v && v.length === 14 && cpfValidator.isValid(form.value.cpf.replace(/\D/g, ""))) || "CPF inválido",
]

const formIsValid = computed(() => {
  return (
    form.value.name &&
    form.value.email &&
    form.value.ra &&
    form.value.cpf &&
    nameRules.every(rule => rule(form.value.name) === true) &&
    emailRules.every(rule => rule(form.value.email) === true) &&
    raRules.every(rule => rule(String(form.value.ra)) === true) &&
    cpfRules.every(rule => rule(form.value.cpf) === true)
  )
})

const loadStudentData = async (id: number): Promise<void> => {
  loading.value = true
  try {
    const response: AxiosResponse<Student> = await api.get(`/students/${id}`)
    form.value = response.data
  } catch (error) {
    console.error("Erro ao carregar aluno:", error)
    router.push("/")
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (route.params.id) {
    isEditMode.value = true
    alunoId.value = route.params.id
    loadStudentData(route.params.id)
  }
})

const submitForm = async () => {
  loading.value = true
  try {
    if (isEditMode.value) {
      await api.put(`/students/${alunoId.value}`, form.value)
    } else {
      await api.post("/students", form.value)
    }
    snackbarColor.value = "light-green-darken-3"
    snackbarText.value = isEditMode.value ? "Aluno atualizado com sucesso!" : "Aluno cadastrado com sucesso!"
    snackbar.value = true
    setTimeout(() => {
      router.push("/")
    }, 2000)
  } catch (error) {
    console.log("Erro ao salvar aluno:", error)
    snackbarColor.value = "red-darken-3"
    snackbarText.value = "Registro inválido! Tente novamente."
    snackbar.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>{{ isEditMode ? "Edição" : "Cadastro" }} de Aluno</h1>
        <p>{{ isEditMode ? "Atualize" : "Cadastre" }} as informações do aluno</p>
      </v-col>
    </v-row>
    <v-form @submit.prevent="submitForm">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.name" label="Nome" required :rules="nameRules" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.email" label="E-mail" required :rules="emailRules" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            type="number"
            :counter="10"
            maxlength="10"
            v-model="form.ra"
            label="RA"
            :readonly="isEditMode"
            required
            :rules="raRules"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.cpf"
            label="CPF"
            :readonly="isEditMode"
            required
            :rules="cpfRules"
            v-mask="'###.###.###-##'"
            placeholder="000.000.000-00"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn class="mr-2" color="secondary" to="/">Cancelar</v-btn>
          <v-btn :disabled="!formIsValid" color="primary" :loading="loading" type="submit">
            {{ isEditMode ? "Atualizar" : "Salvar" }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-snackbar v-model="snackbar" :color="snackbarColor">
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>
