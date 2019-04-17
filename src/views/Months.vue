<template>
  <div>
    <div v-if="user">
      <div class="button-group">
        <button class="card" type="button" @click="saveMonth()">
          <h2>Save</h2>
        </button>
        <button class="card" type="button" @click="deleteMonth()">
          <h2>Delete</h2>
        </button>
      </div>
      <div class="display">
        <div class="myEvents">
          <h3>My Events:</h3>
          <div
            v-for="month in months"
            v-bind:key="month.title"
            @click="selectMonth(month.title)"
            class="card"
          >{{month.title}}</div>
        </div>
        <form>
          <input v-model="month.title" type="text" placeholder="Give your schedule a name...">
        </form>
        <div class="month">
          <div
            v-for="day in month.days"
            v-bind:key="day.date"
            v-bind:class="{selected: day.isSelected}"
            class="day"
            @click="toggleSelected(day)"
          >{{day.date}}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>If you would like to upload photos, please register for an account or login.</p>
      <router-link to="/register" class="pure-button">Register</router-link>or
      <router-link to="/login" class="pure-button">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "months",
  data() {
    return {
      month: {
        title: "",
        days: []
      },
      selectedTitle: ""
    };
  },
  computed: {
    months() {
      return this.$store.state.months;
    },
    storedMonth() {
      return this.$store.state.month;
    },
    user() {
      return this.$store.state.user;
    }
  },
  async created() {
    this.initMonth();
    await this.$store.dispatch("getMonths");
  },
  methods: {
    initMonth() {
      if (this.month.days) {
        this.month.days = [];
        this.month.title = "";
      }
      for (let i = 1; i < 32; ++i) {
        this.month.days.push({
          date: i,
          isSelected: false
        });
      }
    },
    toggleSelected(day) {
      day.isSelected = !day.isSelected;
    },
    async selectMonth(title) {
      let id = -1;
      for (let i = 0; i < this.months.length; ++i) {
        if (this.months[i].title == title) {
          id = this.months[i]._id;
        }
      }
      try {
        await this.$store.dispatch("getMonth", id);
        this.month.title = this.storedMonth.title;
        this.month.days = this.storedMonth.days;
        this.month._id = this.storedMonth._id;
      } catch (error) {
        console.log(error);
      }
    },
    async saveMonth() {
      try {
        if (this.storedMonth && this.storedMonth.title == this.month.title) {
          console.log("update");
          await this.$store.dispatch("updateMonth", this.month);
        } else {
          console.log("create");
          await this.$store.dispatch("createMonth", this.month);
        }
        await this.$store.dispatch("getMonths");
        this.initMonth();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteMonth() {
      try {
        await this.$store.dispatch("deleteMonth", this.storedMonth);
        await this.$store.dispatch("getMonths");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
body {
  align-items: center;
  box-sizing: border-box;
  display: flex;
}
.month {
  margin: auto;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  max-width: 1024px;
  width: 100%;
}
.day {
  display: inline-block;
  background-color: white;
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
  text-align: center;
  margin-bottom: 5px;
  font-size: normal;
  color: #777;
  transition: 0.3s;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.day:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.myEvents {
  margin-left: 10%;
}
.myEvents .card {
  display: inline-block;
  margin-right: 1%;
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
.selected {
  background-color: #c0c7ff;
}
form {
  text-align: center;
}

input {
  font-size: larger;
}

.display {
  width: 100vw;
}
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
</style>

