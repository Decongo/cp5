import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    week: null,
    weeks: [],
    month: null,
    months: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setWeek(state, week) {
      state.week = week;
    },
    setWeeks(state, weeks) {
      state.weeks = weeks;
    },
    setMonth(state, month) {
      state.month = month;
    },
    setMonths(state, months) {
      state.months = months;
    }
  },
  actions: {
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
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
        console.log("update");
        console.log(week);
        await axios.put("/api/weeks/" + week._id, {
          days: this.week.days,
        });
        return "";
      } catch (error) {
        return "";
      }
    },
    async updateMonth(context, month) {
      try {
        await axios.put("/api/months/" + month._id, {
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
        context.commit('setWeek', null);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteMonth(context, month) {
      try {
        await axios.delete("/api/months/" + month._id);
        context.commit('setMonth', null);
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
})
