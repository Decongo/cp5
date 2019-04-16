import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    week: null,
    weeks: null,
    month: null,
    months: null
  },
  mutations: {
    setWeek(state, week) {
      state.week = week;
    },
    setWeeks(state, weeks) {
      state.weeks = weeks;
    },
    setMonth(state, month) {
      state.month = month;
    },
    setMonths(state, month) {
      state.month = month;
    }
  },
  actions: {
    async getWeek(context, id) {
      try {
        let response = await axios.get("/api/weeks/" + id);
        context.commit('setWeek', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getWeeks(context) {
      try {
        let response = await axios.get("/api/weeks/");
        context.commit('setWeeks', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getMonth(context, id) {
      try {
        let response = await axios.get("/api/months/" + id);
        context.commit('setMonth', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getMonths(context) {
      try {
        let response = await axios.get("/api/months/");
        context.commit('setMonths', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async createWeek(context, week) {
      try {
        await axios.post("/api/weeks", week);
        return "";
      } catch (error) {
        return "";
      }
    },
    async createMonth(context, month) {
      try {
        await axios.post("/api/months", month);
        return "";
      } catch (error) {
        return "";
      }
    },
    async updateWeek(context, week) {
      try {
        await axios.put("/api/weeks" + week._id, {
          title: this.week.title,
          days: this.week.days
        });
        this.getWeeks();
        return "";
      } catch (error) {
        return "";
      }
    },
    async updateMonth(context, month) {
      try {
        await axios.put("/api/months" + month._id, {
          title: this.month.title,
          weeks: this.month.weeks
        });
        this.getMonths();
        return "";
      } catch (error) {
        return "";
      }
    },
    async deleteWeek(context, week) {
      try {
        await axios.delete("/api/weeks/" + week._id);
        this.getWeeks();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteMonth(context, month) {
      try {
        await axios.delete("/api/months/" + month._id);
        this.getMonths();
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
})
