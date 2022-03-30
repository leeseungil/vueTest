<template>
  <v-simple-table
    height="250"
    fixed-header
  >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-uppercase">
            이름
          </th>
          <th class="text-center text-uppercase">
            아이디
          </th>
          <th class="text-center text-uppercase">
            비번
          </th>
          <th class="text-center text-uppercase">
            사용유무
          </th>
          <th class="text-center text-uppercase">
            비고
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in resultDt"
          :key="item.tkey"
        >
          <td class="text-center">
            {{ item.userName }}
          </td>
          <td class="text-center">
            {{ item.userId }}
          </td>
          <td class="text-center">
            {{ item.userPwd }}
          </td>
          <td class="text-center">
            {{ item.useYn === 'Y' ? '사용' : '미사용' }}
          </td>
          <td class="text-center">
            {{ item.remarks }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { onMounted, ref } from '@vue/composition-api'
import http from '@/api/http'

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    plzTest: Object,
  },
  setup() {
    const token = localStorage.getItem('X-Auth-Token')
    const header = {
      'X-Auth-Token': token,
    }
    const values = {
      userId: '', // seungil
    }
    const resultDt = ref([])

    onMounted(() => {
      http
        .post('api/systemAuthUser/SearchSystemAuthUser', values, { headers: header }) // 파라미터 (body)
        .then(response => {
          console.log(response)
          resultDt.value = response.data.resultData
        })
        .catch(error => {
          console.log(error)
        })
    })

    return { resultDt }
  },
}
</script>
