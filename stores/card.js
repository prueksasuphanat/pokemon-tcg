import axios from "axios";
import { defineStore } from "pinia";

// Create axios instance with proper configuration
const apiClient = axios.create({
  baseURL: 'https://api.pokemontcg.io/v2',
});

export const useCardStore = defineStore("useCardStore", {
  state: () => ({
    cards: [],
    isLoading: false,
    name: "",
    set: "",
    rarity: "",
    type: "",
  }),

  getters: {
    apiKey() {
      const config = useRuntimeConfig();
      return config.public.pokemonTcgApiKey;
    },
  },

  actions: {
    // name, set, rarity, type
    async select(
      page = 0,
      pageSize = 0,
      name = "",
      set = "",
      rarity = "",
      type = ""
    ) {
      this.isLoading = true;

      let path = `/cards?page=${page}&pageSize=${pageSize}&`;

      let pathQuery = [];

      if (name) {
        pathQuery.push(`name:${name.replaceAll(" ", "*")}*`);

        this.name = name;
      }

      if (set) {
        pathQuery.push(`set.name:${set.replaceAll(" ", "*")}*`);

        this.set = set;
      }

      if (rarity) {
        pathQuery.push(`rarity:${rarity.replaceAll(" ", "*")}*`);

        this.rarity = rarity;
      }

      if (type) {
        pathQuery.push(`types:${type.replaceAll(" ", "*")}`);

        this.type = type;
      }

      if (pathQuery.length > 0) {
        path += `q=${pathQuery.join(" AND ")}`;
      }

      try {
        const response = await apiClient.get(path, {
          headers: {
            "X-Api-Key": this.apiKey,
          },
        });

        return response.data;
      } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        return { data: [], totalCount: 0, count: 0 };
      } finally {
        this.isLoading = false;
      }
    },

    async getSet() {
      this.isLoading = true;

      try {
        const response = await apiClient.get("/sets", {
          headers: {
            "X-Api-Key": this.apiKey,
          },
        });

        return response.data;
      } catch (error) {
        console.error('getSet Error:', error.response?.data || error.message);
        return { data: [] };
      } finally {
        this.isLoading = false;
      }
    },

    async getRarity() {
      this.isLoading = true;

      try {
        const response = await apiClient.get("/rarities", {
          headers: {
            "X-Api-Key": this.apiKey,
          },
        });

        return response.data;
      } catch (error) {
        console.error('getRarity Error:', error.response?.data || error.message);
        return { data: [] };
      } finally {
        this.isLoading = false;
      }
    },

    async getType() {
      this.isLoading = true;

      try {
        const response = await apiClient.get("/types", {
          headers: {
            "X-Api-Key": this.apiKey,
          },
        });

        return response.data;
      } catch (error) {
        console.error('getType Error:', error.response?.data || error.message);
        return { data: [] };
      } finally {
        this.isLoading = false;
      }
    },
  },
});
