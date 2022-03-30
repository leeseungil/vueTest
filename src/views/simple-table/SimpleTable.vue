<template>
  <v-row>
    <!-- basic -->
    <!-- <v-col cols="12">
      <v-card>
        <v-card-title>Basic</v-card-title>
        <demo-simple-table-basic></demo-simple-table-basic>
      </v-card>
    </v-col> -->

    <!-- dark -->
    <v-col cols="12">
      <v-card>
        <v-card-title></v-card-title>
        <demo-simple-table-dark></demo-simple-table-dark>
      </v-card>
    </v-col>

    <!-- Dense -->
    <!-- <v-col cols="12">
      <v-card>
        <v-card-title>Dense</v-card-title>
        <v-card-text>
          You can show a dense version of the table by using the <code>dense</code> prop.
        </v-card-text>
        <demo-simple-table-dense></demo-simple-table-dense>
      </v-card>
    </v-col> -->

    <!-- height -->
    <!-- <v-col cols="12">
      <v-card>
        <v-card-title>Height</v-card-title>
        <v-card-text>
          Use the <code>height</code> prop to set the height of the table.
        </v-card-text>
        <demo-simple-table-height></demo-simple-table-height>
      </v-card>
    </v-col> -->

    <!-- fixed header -->
    <v-col cols="12">
      <v-card>
        <v-card-title>권한정보 테이블</v-card-title>
        <div class="text-right">
          <v-btn
            class="ma-2"
            :loading="loading"
            :disabled="loading"
            color="secondary"
            @click="loader = 'loading'"
          >
            등록
          </v-btn>

          <v-btn
            class="ma-2"
            :loading="loading2"
            :disabled="loading2"
            color="success"
            @click="loader = 'loading2'"
          >
            수정
            <template v-slot:loader>
              <span>Loading...</span>
            </template>
          </v-btn>

          <v-btn
            class="ma-2"
            :loading="loading4"
            :disabled="loading4"
            color="info"
            @click="loader = 'loading4'"
          >
            삭제
          </v-btn>
        </div>
        <v-card-text>
          <v-spacer></v-spacer>
          <!-- Use the <code>fixed-header</code> prop together with the <code>height</code> prop to fix the header to the top of the table. -->
          <v-btn
            color="accent"
            elevation="2"
            class="ms-3"
          >
            TEST
          </v-btn>
        </v-card-text>

        <demo-simple-table-fixed-header></demo-simple-table-fixed-header>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { ref } from '@vue/composition-api'
import DemoSimpleTableBasic from './demos/DemoSimpleTableBasic.vue'
import DemoSimpleTableDark from './demos/DemoSimpleTableDark.vue'
import DemoSimpleTableDense from './demos/DemoSimpleTableDense.vue'
import DemoSimpleTableHeight from './demos/DemoSimpleTableHeight.vue'
import DemoSimpleTableFixedHeader from './demos/DemoSimpleTableFixedHeader.vue'

export default {
  components: {
    DemoSimpleTableBasic,
    DemoSimpleTableDark,
    DemoSimpleTableDense,
    DemoSimpleTableHeight,
    DemoSimpleTableFixedHeader,
  },
  setup() {
    const loader = ref(null)
    const loading = ref(false)
    const loading2 = ref(false)
    const loading4 = ref(false)

    return {
      loader, loading, loading2, loading4,
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      // eslint-disable-next-line no-return-assign
      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  },
}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
