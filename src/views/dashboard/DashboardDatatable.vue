<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="usreList"
      item-key="title"
      class="table-rounded"
      hide-default-footer
      disable-sort
    >
      <!-- name -->
      <template #[`item.title`]="{item}">
        <div class="d-flex flex-column">
          <span class="d-block font-weight-semibold text--primary text-truncate">{{ item.title }}</span>
          <!-- <small>{{ item.post }}</small> -->
        </div>
      </template>
      <template #[`item.salary`]="{item}">
        {{ `$${item.salary}` }}
      </template>
      <!-- status -->
      <template #[`item.status`]="{item}">
        <v-chip
          small
          :color="statusColor[status[item.status]]"
          class="font-weight-medium"
        >
          {{ status[item.status] }}
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mdiSquareEditOutline, mdiDotsVertical } from '@mdi/js'
import data from './datatable-data'

export default {
  setup() {
    const statusColor = {
      /* eslint-disable key-spacing */
      Current: 'primary',
      중: 'success',
      상: 'error',
      Resigned: 'warning',
      하: 'info',
      /* eslint-enable key-spacing */
    }

    return {
      headers: [
        { text: '공지내용', value: 'title' },
        { text: '등록자', value: 'insertUser' },
        { text: '등록일', value: 'insertDate' },
        { text: '중요도', value: 'status' },
      ],
      usreList: data,
      status: {
        1: 'Current',
        2: '중',
        3: '상',
        4: 'Resigned',
        5: '하',
      },
      statusColor,

      // icons
      icons: {
        mdiSquareEditOutline,
        mdiDotsVertical,
      },
    }
  },
}
</script>
