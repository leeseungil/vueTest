<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :search="search"
    show-select
    sort-by="userId"
    class="elevation-1"
    @click:row="handleClick"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Sample Table</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-text-field
          v-model="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.userId"
                      :disabled="editedIndex > -1"
                      label="아이디"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.userName"
                      :disabled="editedIndex > -1"
                      label="이름"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.userPwd"
                      :disabled="editedIndex > -1"
                      label="패스워드"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.useYn"
                      label="사용유무"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.managerStatus"
                      label="사용권한"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    v-show="false"
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.lastUser"
                      :value="id"
                      label="lastUser"
                    >
                      {{ id }}
                    </v-text-field>
                  </v-col>
                  <v-col
                    v-show="false"
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.insertUser"
                      :value="id"
                      label="insertUser"
                    >
                      {{ id }}
                    </v-text-field>
                  </v-col>
                  <v-col
                    cols="16"
                    sm="8"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.remarks"
                      label="비고"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">
              선택된 행을 삭제 하시겠습니까?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        {{ mdiPencil }}
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        {{ mdiDelete }}
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mdiPencil, mdiDelete, mdiMagnify } from '@mdi/js'
import { onMounted, ref } from '@vue/composition-api'
import http from '@/api/http'

export default {
  setup() {
    const token = localStorage.getItem('X-Auth-Token')
    const header = {
      'X-Auth-Token': token,
      contentType: 'application/json',
    }
    const values = {
      userId: '',
    }

    const id = localStorage.getItem('userId')

    const data = ref([])

    onMounted(() => {
      http
        .post('api/systemAuthUser/SearchSystemAuthUser', values, { headers: header }) // 파라미터 (body)
        .then(response => {
          console.log(response)
          data.value = response.data.resultData
        })
        .catch(error => {
          console.log(error)
        })
    })

    const dialog = false
    const dialogDelete = false
    const headers = [
      {
        text: 'tkey',
        align: ' d-none',
        value: 'tkey',
      },
      {
        text: '이름',
        align: 'start',
        value: 'userName',
      },
      { text: '아이디', value: 'userId' },
      { text: '비번', value: 'userPwd' },
      { text: '사용유무', value: 'useYn' },
      { text: '사용권한', value: 'managerStatus' },
      { text: '수정자', align: ' d-none', value: 'lastUser' },
      { text: '등록자', align: ' d-none', value: 'insertUser' },
      { text: '비고', value: 'remarks' },
      { text: 'Actions', value: 'actions', sortable: false },
    ]

    const search = ref('')
    const editedIndex = -1
    const editedItem = {
      userName: '',
      userId: '',
      userPwd: '',
      useYn: '',
      managerStatus: '',
      lastUser: id,
      insertUser: id,
      remarks: '',
    }
    const defaultItem = {
      userName: '',
      userId: '',
      userPwd: '',
      useYn: '',
      managerStatus: '',
      lastUser: id,
      insertUser: id,
      remarks: '',
    }
    const selectedItem = {
      userName: '',
      userId: '',
      userPwd: '',
      useYn: '',
      managerStatus: '',
      lastUser: id,
      insertUser: id,
      remarks: '',
    }

    return {
      id,
      header,
      data,
      dialog,
      dialogDelete,
      headers,
      editedIndex,
      editedItem,
      defaultItem,
      mdiPencil,
      mdiDelete,
      mdiMagnify,
      search,
      selectedItem,
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },
  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close()
    },
    dialogDelete(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.closeDelete()
    },
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.data = [
      ]
    },
    handleClick(item) {
      console.log(item)

      // this.selectedItem = { ...item }
      // console.log(this.selectedItem)
    },
    editItem(item) {
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = { ...item }
      this.dialog = true
    },
    deleteItem(item) {
      console.log('Delete')
      console.log(JSON.stringify(item))
      console.log(item)

      this.editedIndex = this.data.indexOf(item)
      this.editedItem = { ...item }
      this.dialogDelete = true

      http
        .post('api/systemAuthUser/DeleteSystemAuthUser', this.editedItem, { headers: this.header }) // 파라미터 (body)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteItemConfirm() {
      this.data.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },
    select() {
      http
        .post('api/systemAuthUser/SearchSystemAuthUser', '', { headers: this.header }) // 파라미터 (body)
        .then(response => {
          console.log(response)
          this.data.value = response.data.resultData
        })
        .catch(error => {
          console.log(error)
        })
    },
    save() {
      // Update
      if (this.editedIndex > -1) {
        console.log('▼Update Request시작')
        console.log(this.editedItem)
        console.log(JSON.stringify(this.editedItem))
        Object.assign(this.data[this.editedIndex], this.editedItem)

        http
          .post('api/systemAuthUser/UpdateSystemAuthUser', this.editedItem, { headers: this.header }) // 파라미터 (body)
          .then(response => {
            console.log('▼Update Response시작')
            console.log(response)

            // 등록완료 문구 및 테이블 재조회
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        // Insert
        console.log('▼Insert Request시작')
        console.log(JSON.stringify(this.editedItem))

        http
          .post('api/systemAuthUser/InsertSystemAuthUser', this.editedItem, { headers: this.header }) // 파라미터 (body)
          .then(response => {
            console.log('▼Insert Response시작')
            console.log(response)
            this.data.push(response.data.resultData)

            // 등록완료 문구 및 테이블 재조회
          })
          .catch(error => {
            console.log(error)
          })

        console.log(JSON.stringify(this.data))
      }
      this.close()
    },
  },
}
</script>
