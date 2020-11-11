import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home";

function createConfig (overrides) {
    const id = 1;
    const mocks = {
      // Vuex
      $store: {
        state: [ { id } ],
        commit: () => {}
      }
    };
    const propsData = { id };
    return Object.assign({ mocks, propsData }, overrides);
  }
  
  describe("Item.vue", () => {
    // Tests go here
  });