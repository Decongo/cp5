<template>
  <div>
    <h1>My Weeks</h1>
    <div class="button-group">
      <button class="card" type="button" @click="saveWeek()">
        <h2>Save</h2>
      </button>
      <button class="card" type="button" @click="getWeek()">
        <h2>Load</h2>
      </button>
      <button class="card" type="button" @click="deleteWeek()">
        <h2>Delete</h2>
      </button>
    </div>
    <div class="display">
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
      weeks: []
    };
  },
  async created() {
    this.initWeek();
    await this.$store.dispatch("getWeeks");
  },
  methods: {
    initWeek() {
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
      for (i in this.week.days[day].hours) {
        this.week.days[day].hours[i].isSelected = this.week.days[
          day
        ].isSelected;
      }
    }
  }
};
</script>
