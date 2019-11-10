<template>
  <q-page class="flex flex-center">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg"> -->
    <template>
      <div class="q-pa-md" style="max-width: 450px">
        <h2>BMI Calculator</h2>
        <!-- more direct declarative rendering -->
        <!-- {{ songTitle }} by {{ artist }} -->

        <!-- computed object declarative rendering -->
        <!-- {{ showSongAndArtist }} -->
        height = {{height}}
        weight = {{weight}}
        BMI = {{ showCalculatedBMI() }}
        <!-- <q-input outlined v-model="artist" label="Artist" />
        <q-input outlined v-model="songTitle" label="Song Name" />
        {{ showSongAndArtist }} -->

        <!-- <q-input outlined v-model="artist" label="Artist" />
        <q-input outlined v-model="songTitle" label="Song Name" /> -->

        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">Personal Information</div>
            <!-- <div class="text-subtitle2">by John Doe</div> -->
          </q-card-section>
            <q-input outlined v-model="name" label="Full Name" />
            <q-input outlined v-model="height" label="Height (in m)" />
            <q-input outlined v-model="weight" label="Weight (in kg)" />
          <q-separator />

          <q-card-actions vertical>
            <q-btn :color="!edit ? 'primary' : 'secondary'" class="full-width" :label="!edit ? 'Calculate BMI' : 'Edit BMI'" @click="!edit ? addBmi() : showCalculatedBMI()"/>
          </q-card-actions>
        </q-card>

        <!-- first way -->
        <!-- <q-btn v-if="!edit" color="secondary" class="full-width" label="Add Music" @click="addMusic()"/>
        <q-btn v-else color="primary" class="full-width" label="Update Music" @click="updateMusic()"/> -->

        <!-- ternary operator syntax -->
        <!-- condition ? true result : false result -->
        <!-- <q-btn :color="!edit ? 'secondary' : 'primary'" class="full-width" :label="!edit ? 'Add Music' : 'Update Music'" @click="!edit ? addMusic() : updateMusic()"/> -->
      
        
        <!-- <q-btn :color="!edit ? 'secondary' : 'primary'" class="full-width" :label="!edit ? 'Calculate BMI' : 'Edit BMI'" @click="calculateBmi()"/> -->
        
        
        
        <q-list bordered separator style="margin-top: 10px;">

          <q-item class="musicList" clickable v-ripple v-for="(music, index) in musicList" :key="index">
            <q-item-section>
              <q-item-label>{{ index+1 }}: {{ music.songTitle }}</q-item-label>
              <q-item-label caption>{{ music.artist }}</q-item-label>
            </q-item-section>
            <q-item-section right>
              <!-- edit -->
              <q-btn color="primary" icon="edit" @click="editMusic(music, music.id)"/>
              <!-- delete -->
              <q-btn color="red" icon="delete" @click="deleteMusic(music.id)"/>
            </q-item-section>
          </q-item>

          <q-item class="musicList" clickable v-ripple v-for="(bmi, index) in bmiList" :key="index">
            <q-item-section>
              <q-item-label>{{ index+1 }}: {{ bmi.name }} - {{ bmi.result }}</q-item-label>
              <q-item-label caption>Height: {{ bmi.height }}, Weight: {{ bmi.weight }}</q-item-label>
            </q-item-section>
            <q-item-section right>
              <!-- edit -->
              <q-btn color="primary" icon="edit" @click="editMusic(music, music.id)"/>
              <!-- delete -->
              <q-btn color="red" icon="delete" @click="deleteMusic(music.id)"/>
            </q-item-section>
          </q-item>

          <!-- <q-item-section right>
            <q-btn color="primary" label="Add Music" @click="addMusic()"/>
            <q-btn color="secondary" label="Add Music" @click="addMusic()"/>
          </q-item-section> -->

        </q-list>
      </div>
    </template>
  </q-page>
</template>

<style>
  .musicList {
      padding: 8px 0px 8px 16px !important;
  }
</style>

<script>
export default {
  name: 'PageIndex',
  // have a returned value
  // calculateBMI: {
  //   showCalculatedBMI () {
  //     return (this.weight/(this.height*this.height));
  //   }
  // },
  computed: {
    // void
    showSongAndArtist () {
      return (this.songTitle && this.artist ? this.songTitle + " by " + this.artist : '');
    }
  },
  // calculatedBmi: {
  //   showCalculatedBMI () {
  //     return (this.weight/(this.height*this.height));
  //   }
  // },
  created () {
    this.$bind("bmiList", this.$db.collection("bmiList"));
  },
  // for void
  methods: {
    addMusic () {
      // use this kapag nasa loob ng script
      var obj = {
        artist: this.artist,
        songTitle: this.songTitle
      };
      // adding (static)
      // this.musicList.push(obj);
      this.$db.collection("musicList").add(obj);
      this.cancelEdit();
      // this.$router.push('/login');
    },
    addBmi () {
      // use this kapag nasa loob ng script
      var obj = {
        name: this.name,
        height: this.height,
        weight: this.weight,
        result: this.weight/(this.height*this.height)
      };
      this.$db.collection("bmiList").add(obj);
      this.cancelEdit();
    },
    cancelEdit () {
      this.artist = "";
      this.songTitle = "";
      this.edit = false;
      this.index = null;

      this.name = "";
      this.height = "";
      this.weight = "";
    },
    editMusic (d, i) {
      this.artist = d.artist;
      this.songTitle = d.songTitle;
      this.edit = true;
      this.index = i;
    },
    deleteMusic (i) {
      // app4.todos.splice(<starting index>, <number of index deletes>)
      // delete static
      // this.musicList.splice(i, 1);

      // delete (firestore)
      // delete from musicList where id = i (from function parameter)
      this.$db.collection("musicList").doc(i).delete();
    },
    updateMusic () {
      var obj = {
        artist: this.artist,
        songTitle: this.songTitle
      };
      // native assignment
      // this.musicList[this.index] = obj;

      // vue assignment variable (static)
      // vue.set(variable, index number, value)
      // this.$set(this.musicList, this.index, obj);

      this.$db.collection("musicList")
      .doc(this.index)
      .update(obj);
      this.cancelEdit();

      // 
    },
    showCalculatedBMI () {
      console.log("hey!");
      return (this.weight/(this.height*this.height));
    },
    showWeightRange (BMI) {
      // below 18.5 – you're in the underweight range
      // between 18.5 and 24.9 – you're in the healthy weight range
      // between 25 and 29.9 – you're in the overweight range
      // between 30 and 39.9 – you're in the obese range 
      if (BMI < 18.5) {
        return "Underweight"
      } else if (BMI >= 18.5 && BMI < 25 ) {
        return "Normal"
      } else if (BMI >= 25 && BMI < 30) {
        return "Overweight"
      } else if (BMI >= 30 && BMI < 40) {
        return "Obese"
      }
    }
  },
  data () {
    return {
      musicList: [
        // { songTitle: "Basang Basa sa Ulan", artist: "Aegis" },
        // { songTitle: "Reflection", artist: "Leah Salonga" },
        // { songTitle: "Where is the Love?", artist: "Black Eyed Peas" }
      ],
      bmiList: [],
      artist: "",
      songTitle: "",
      name: "",
      height: "",
      weight: "",
      calculatedBmi: "",
      index: null,
      edit: false,
      height: 0,
      weight: 0,
      name: "",
      weightRange: ""
      // calculatedBMI: 0
    }
  }
}
</script>
