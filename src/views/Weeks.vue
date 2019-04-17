<template>
  <div>
    <div v-if="user">
      <div class="button-group">
        <button class="card" type="button" @click="saveWeek()">
          <h2>Save</h2>
        </button>
        <button class="card" type="button" @click="deleteWeek()">
          <h2>Delete</h2>
        </button>
      </div>
      <div class="display">
        <div class="myEvents">
          <h3>My Events:</h3>
          <div
            v-for="week in weeks"
            v-bind:key="week.title"
            @click="selectWeek(week.title)"
            class="card"
          >{{week.title}}</div>
        </div>
        <form>
          <input v-model="week.title" type="text" placeholder="Give your schedule a name...">
        </form>
        <div class="flex-table">
          <div class="flex-column-day">
            <div class="card" @click="toggleDay(0)">
              <h2>Monday</h2>
            </div>
            <div
              v-for="time in week.days[0].hours"
              class="card"
              @click="toggleSelected(time)"
              v-bind:class="{selected: time.isSelected}"
              v-bind:key="time.hour"
            >
              <p>{{ time.hour }}:00</p>
            </div>
          </div>
          <div class="flex-column-day">
            <div class="card" @click="toggleDay(1)">
              <h2>Tuesday</h2>
            </div>
            <div
              v-for="time in week.days[1].hours"
              class="card"
              @click="toggleSelected(time)"
              v-bind:class="{selected: time.isSelected}"
              v-bind:key="time.hour"
            >
              <p>{{ time.hour }}:00</p>
            </div>
          </div>
          <div class="flex-column-day">
            <div class="card" @click="toggleDay(2)">
              <h2>Wednesday</h2>
            </div>
            <div
              v-for="time in week.days[2].hours"
              class="card"
              @click="toggleSelected(time)"
              v-bind:class="{selected: time.isSelected}"
              v-bind:key="time.hour"
            >
              <p>{{ time.hour }}:00</p>
            </div>
          </div>
          <div class="flex-column-day">
            <div class="card" @click="toggleDay(3)">
              <h2>Thursday</h2>
            </div>
            <div
              v-for="time in week.days[3].hours"
              class="card"
              @click="toggleSelected(time)"
              v-bind:class="{selected: time.isSelected}"
              v-bind:key="time.hour"
            >
              <p>{{ time.hour }}:00</p>
            </div>
          </div>
          <div class="flex-column-day">
            <div class="card" @click="toggleDay(4)">
              <h2>Friday</h2>
            </div>
            <div
              v-for="time in week.days[4].hours"
              class="card"
              @click="toggleSelected(time)"
              v-bind:class="{selected: time.isSelected}"
              v-bind:key="time.hour"
            >
              <p>{{ time.hour }}:00</p>
            </div>
          </div>
          <div class="flex-column-day">
            <div class="card" @click="toggleDay(5)">
              <h2>Saturday</h2>
            </div>
            <div
              v-for="time in week.days[5].hours"
              class="card"
              @click="toggleSelected(time)"
              v-bind:class="{selected: time.isSelected}"
              v-bind:key="time.hour"
            >
              <p>{{ time.hour }}:00</p>
            </div>
          </div>
          <div class="flex-column-day">
            <div class="card" @click="toggleDay(6)">
              <h2>Sunday</h2>
            </div>
            <div
              v-for="time in week.days[6].hours"
              class="card"
              @click="toggleSelected(time)"
              v-bind:class="{selected: time.isSelected}"
              v-bind:key="time.hour"
            >
              <p>{{ time.hour }}:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Please register for an account or login.</p>
      <div class="choice">
        <router-link to="/register" class="button-link">Register</router-link>
        <router-link to="/login" class="button-link">Login</router-link>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "weeks",
  data() {
    return {
      week: {
        title: "",
        days: []
      },
      selectedTitle: ""
    };
  },
  computed: {
    weeks() {
      return this.$store.state.weeks;
    },
    storedWeek() {
      return this.$store.state.week;
    },
    user() {
      return this.$store.state.user;
    }
  },
  async created() {
    this.initWeek();
    await this.$store.dispatch("getWeeks");
  },
  methods: {
    initWeek() {
      if (this.week.days) {
        this.week.days = [];
        this.week.title = "";
      }
      for (let i = 0; i < 7; ++i) {
        let hours = [];
        for (let j = 6; j < 22; j++) {
          hours.push({
            hour: j,
            isSelected: false
          });
        }
        this.week.days.push({
          hours: hours,
          isSelected: false
        });
      }
    },
    toggleSelected(time) {
      time.isSelected = !time.isSelected;
    },
    toggleDay(day) {
      this.week.days[day].isSelected = !this.week.days[day].isSelected;
      for (let i = 0; i < this.week.days[day].hours.length; ++i) {
        this.week.days[day].hours[i].isSelected = this.week.days[
          day
        ].isSelected;
      }
    },
    async selectWeek(title) {
      let id = -1;
      for (let i = 0; i < this.weeks.length; ++i) {
        if (this.weeks[i].title == title) {
          id = this.weeks[i]._id;
        }
      }
      try {
        await this.$store.dispatch("getWeek", id);
        this.week.title = this.storedWeek.title;
        this.week.days = this.storedWeek.days;
        this.week._id = this.storedWeek._id;
      } catch (error) {
        console.log(error);
      }
    },
    async saveWeek() {
      try {
        if (this.storedWeek && this.storedWeek.title == this.week.title) {
          console.log("update");
          await this.$store.dispatch("updateWeek", this.week);
        } else {
          console.log("create");
          await this.$store.dispatch("createWeek", this.week);
        }
        await this.$store.dispatch("getWeeks");
        this.initWeek();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteWeek() {
      try {
        await this.$store.dispatch("deleteWeek", this.storedWeek);
        await this.$store.dispatch("getWeeks");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.button-group {
  text-align: center;
}

.title {
  text-align: center;
  -webkit-user-select: none;
  /* Chrome all / Safari all */
  -moz-user-select: none;
  /* Firefox all */
  -ms-user-select: none;
  /* IE 10+ */
  user-select: none;
  /* Likely future */
}

.display {
  width: 100vw;
}

form {
  text-align: center;
}

input {
  font-size: larger;
}

.flex-table {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 60px 100px;
}

.flex-column-day {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card {
  width: 120px;
  background-color: white;
  align-self: center;
  align-items: center;
  text-align: center;
  margin-bottom: 10px;
  transition: 0.3s;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.choice {
  text-align: center;
  padding: 3%;
}

.button-link {
  color: black;
  text-decoration: none;
  padding: 1%;
  margin: 5%;
  background-color: white;
  transition: 0.3s;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

p {
  text-align: center;
  margin: 5px;
  -webkit-user-select: none;
  /* Chrome all / Safari all */
  -moz-user-select: none;
  /* Firefox all */
  -ms-user-select: none;
  /* IE 10+ */
  user-select: none;
  /* Likely future */
}

h2 {
  font-size: 20px;
  -webkit-user-select: none;
  /* Chrome all / Safari all */
  -moz-user-select: none;
  /* Firefox all */
  -ms-user-select: none;
  /* IE 10+ */
  user-select: none;
  /* Likely future */
}

.selected {
  background-color: #c0c7ff;
}
.myEvents {
  margin-left: 10%;
}
.myEvents .card {
  display: inline-block;
  margin-right: 1%;
}
</style>


