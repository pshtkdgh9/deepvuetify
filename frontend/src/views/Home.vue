<template>
<div>
  <v-app id="inspire">
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        app
      >
        <v-list dense>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-email</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Contact</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar
        app
        color="indigo"
        dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Application</v-toolbar-title>
      </v-app-bar>

      <v-main>

        <v-container
          class="fill-height"
          fluid
        >
          <v-row
            align="center"
            justify="center"
          >
          <v-col class="text-center">

    <v-row
    align="center"
    justify="center">
      <v-col
      cols = "8">
     <v-card
    class="ma-auto"
    >

  <v-card
    color="blue-grey darken-1"
    dark
    :loading="isUpdating"
    >

    <template v-slot:progress>
      <v-progress-linear
        absolute
        color="green lighten-3"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>
    <!-- <li v-for="apple in apple_pie" class="item" :key="apple.id"> -->
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                v-model="value"
                :items="apples"
                dense
                filled
                label="object"
                item-text="name"
                item-value="name"
                :search-input.sync="sf">
              </v-autocomplete>
            </v-col>

            <v-col cols="12">
              <v-autocomplete
                v-model="value2"
                :items="items2"
                dense
                filled
                chips
                color="blue-grey lighten-2"
                label="member"
                item-text="name"
                item-value="name"
                multiple>


                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(data.item)"
                  >
                    {{ data.item }}
                  </v-chip>
                </template>


                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                    </v-list-item-content>
                  </template>

                </template>
              </v-autocomplete>
            </v-col>

            <v-col cols="12">
              <v-autocomplete
                v-model="value3"
                dense
                filled
                label="relation">
              </v-autocomplete>
            </v-col>


          </v-row>


        </v-container>
      </v-form>

    <v-divider></v-divider>
  </v-card>

  </v-card>
    </v-col>
    </v-row>
          </v-col>
          </v-row>

        </v-container>




 </v-main>

      <v-footer
        color="indigo"
        app
      >

      <!-- <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
       -->

      </v-footer>

    </v-app>
  </v-app>
</div>
</template>

<script>

export default {

  // name: 'App',
  //
  // components: {
  // },
  //
  created() {
    this.$http.get('/api/apple')
      .then((response) => {
        this.apples = response.data
      })
  },
  data () {


      return {
        apples : [],

        drawer: null,

        items: ["407", "408"],
        items2: [],
        items3: [],
        values: {"407" : ['도진', '현병', '영호', '종우', '우제', '크리스토퍼', '도웅', '상혁', '상준', '현중', '홍&김', '소민','보경'],
                 "408" : ['준혁', '남영', '재용', '종훈', '우영', '상호', '윤아', '임박사님']},
        value: null,
        value2: null,
        value3: null,
        sf : null,
        ok : false,

      }
    },

    watch:  {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      },


      sf(a){
        console.log("sf", a)
        // itmes2 = values[a]
        this.items2 = this.apples[2][a]

      }
    },

    methods: {
      remove (item) {
        const index = this.value2.indexOf(item)
        if (index >= 0) this.value2.splice(index, 1)
      },
    },

  }


</script>
