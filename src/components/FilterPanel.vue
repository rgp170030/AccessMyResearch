<template>
  <div class="SearchDropDown">
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1 firstFilter" role="tab">
          <b-button
              block
              v-b-toggle.SortByAccordion
              squared variant="#4577B8"
              class="dropdownButton"
          >
            <div>Publications<span><i class="fas fa-list-ul downArrow"></i></span></div>
          </b-button
          >
        </b-card-header>
        <b-collapse
            id="SortByAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
          <b-card-body style="max-width:220px">
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1" style="box-shadow: 0 2px 3px #9b9d9e; max-height:80px;">
          <b-form-group class="histSlider">
            <br/>
            <HistogramSlider
                :min="Math.min.apply(Math, results_data)"
                :max="Math.max.apply(Math, results_data)"
                :key="results_data"
                :data="results_data"
                :barHeight="50"
                :barRadius="2"
                :barWidth="2"
                :barGap="1"
                :gridNum="1"
                :histSliderGap="5"
                :grid="true"
                :handleSize="13"
                :lineHeight="5"
                :width="190"
                :force-edges="false"
                :handleColor="['#f78626']"
                :gridTextColor="['white']"
                :dragInterval="true"
                :prettify="prettify"
                ></HistogramSlider>
          </b-form-group>
      </b-card>

      <b-card no-body class="mb-1" style="box-shadow: 0 2px 3px #9b9d9e;">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.typeAccordion squared variant="outline-primary"
                    class="dropdownButton toggleBg">
            <div>Type<span><i class="fas fa-chevron-down downArrow"></i></span></div>
          </b-button>
        </b-card-header>
        <b-collapse
            id="typeAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
          <b-card-body style="max-width:220px">
            <b-form-group class="small">
              <b-form-checkbox-group
                  class="collapseAccordion"
                  id="typeFilter"
                  v-model="selectedFilters"
                  :options="types"
                  name="type"
                  disabled-field="notEnabled"
                  stacked
              ></b-form-checkbox-group>
            </b-form-group>
          </b-card-body>
        </b-collapse>
      </b-card>


      <b-card no-body class="mb-1" style="box-shadow: 0 2px 3px #9b9d9e;">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
              block
              v-b-toggle.accessibilityAccordion
              squared variant="outline-primary"
              class="dropdownButton toggleBg"
          >
            <div>Accessibility<span><i class="fas fa-chevron-down downArrow"></i></span></div>
          </b-button
          >
        </b-card-header>
        <b-collapse
            id="accessibilityAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
          <b-card-body style="max-width:220px">
            <b-form-group class="small">
              <b-form-group>
                <b-form-checkbox-group
                    class="collapseAccordion"
                    id="accessibilityFilter"
                    v-model="selectedFilters"
                    :options="accessibilityOptions"
                    name="acccessibility"
                    disabled-field="notEnabled"
                    stacked
                ></b-form-checkbox-group>
              </b-form-group>
            </b-form-group>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1" style="box-shadow: 0 2px 3px #9b9d9e;">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
              block
              v-b-toggle.databaseAccordion
              squared variant="outline-primary"
              class="dropdownButton toggleBg"
          >
            <div>Database<span><i class="fas fa-chevron-down downArrow"></i></span></div>
          </b-button
          >
        </b-card-header>
        <b-collapse
            id="databaseAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
          <b-card-body style="max-width:220px">
            <b-form-group class="small">
              <b-form-checkbox-group
                  class="collapseAccordion"
                  id="databaseFilter"
                  v-model="selectedDatabaseFilters"
                  :options="databases"
                  name="database"
                  disabled-field="notEnabled"
                  stacked
              ></b-form-checkbox-group>
            </b-form-group>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1" style="box-shadow: 0 2px 3px #9b9d9e;">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
              block
              v-b-toggle.journalAccordion
              squared variant="outline-primary"
              class="dropdownButton toggleBg"
          >
            <div>Journals<span><i class="fas fa-chevron-down downArrow"></i></span></div>
          </b-button
          >
        </b-card-header>
        <b-collapse
            id="journalAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
          <b-card-body style="max-width:220px">
            <b-form-group class="small">
              <b-form-checkbox-group
                  id="journalFilter"
                  class="collapseAccordion"
                  v-model="selectedFilters"
                  @input="sort"
                  :options="journals"
                  name="journals"
                  disabled-field="notEnabled"
                  stacked
              ></b-form-checkbox-group>
            </b-form-group>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1" style="box-shadow: 0 2px 3px #9b9d9e;">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.areaAccordion squared variant="outline-primary"
                    class="dropdownButton toggleBg">
            <div>Area<span><i class="fas fa-chevron-down downArrow"></i></span></div>
          </b-button>
        </b-card-header>
        <b-collapse
            id="areaAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
          <b-card-body style="max-width:220px">
            <b-form-group class="small" style="max-width: 5rem;">
              <b-form-checkbox-group
                  id="areaFilter"
                  class="collapseAccordion"
                  v-model="selectedFilters"
                  @input="sort"
                  name="area"
                  disabled-field="notEnabled"
                  stacked
              >
                <b-form-checkbox value="orange">Orange
                  <b-button size="sm" pill v-b-popover.hover.right="'Info about fruits!'" variant="primary"><i
                      class="fas fa-info-circle"></i></b-button>
                </b-form-checkbox>
                <b-form-checkbox value="apple">Apple</b-form-checkbox>
                <b-form-checkbox value="pineapple">Pineapple</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </b-card-body>
        </b-collapse>
      </b-card>


      <b-card no-body class="mb-1" style="box-shadow: 0 2px 3px #9b9d9e;">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
              block
              v-b-toggle.expertiseAccordion
              squared variant="outline-primary"
              class="dropdownButton toggleBg"
          >
            <div>Expertise<span><i class="fas fa-chevron-down downArrow"></i></span></div>
          </b-button
          >
        </b-card-header>
        <b-collapse
            id="expertiseAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
          <b-card-body style="max-width:220px">
            <b-form-group class="small">
              <b-form-checkbox-group
                  id="expertiseFilter"
                  class="collapseAccordion"
                  v-model="selectedFilters"
                  :options="expertise"
                  name="expertise"
                  disabled-field="notEnabled"
                  stacked
              ></b-form-checkbox-group>
            </b-form-group>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" style="box-shadow: 0 2px 3px #9b9d9e;">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
              block
              v-b-toggle.collectionAccordion
              squared variant="outline-primary"
              class="dropdownButton"
          >
            <div>Collections<span><i class="fas fa-chevron-down downArrow"></i></span></div>
          </b-button
          >
        </b-card-header>
        <b-collapse
            id="collectionAccordion"
            accordion="my-accordion"
            role="tabpanel"
        >
          <b-card-body style="max-width:220px">
          </b-card-body>
        </b-collapse>
      </b-card>


    </div>
  </div>
</template>
<script>
import 'vue-range-component/dist/vue-range-slider.css'
import HistogramSlider from 'vue-histogram-slider'
import 'vue-histogram-slider/dist/histogram-slider.css'
import VueRangeSlider from 'vue-range-component'
import {VBPopoverPlugin} from 'bootstrap-vue'

export default {
  name: 'filter-panel',
  mounted() {
    if (localStorage.selectedFilters) {
      this.selectedFilters = localStorage.selectedFilters.split(",");
    }

    if (localStorage.yearRange) {
      this.yearRange = localStorage.yearRange.split(",");
    }

    if (localStorage.defaultFilterCheckbox) {
      this.defaultFilterCheckbox = localStorage.defaultFilterCheckbox;
    }
  },
  components: {
    HistogramSlider,
  },
  computed: {
    selectedDatabaseFilters: {
      get: function () {
        return this.$store.state.search.filters.databases;
      },
      set: function (newSelectedDbFilters) {
        this.$store.state.search.filters.databases = newSelectedDbFilters;
      }
    },
    // yearsForArticles: {
    //   get: function() {
    //     return this.$store.state.articles.datePublished;
    //   },
    //   set: function(newData) {
    //     this.$store.state.articles.datePublished = newData;
    //   }
    // },
    results_data: function () {
      return this.$store.state.articles.map((article) => {
        return this.formatYear(article.datePublished)
      }).filter(article => article !== undefined)
    }
  },
  data() {
    return {
      //autocomplete start
      modal: false,
      recentSearches: [],
      filteredRecentSearches: [],
      defaultFilterCheckbox: false,
      prettify: function(num) {
        return `${num}`; 
      },
      // autocomplete end
      yearRange: [1950, 2021],
      selectedFilters: [],
      search: {filter: null, text: ""},
      selectedSortBy: "most-recent",
      areas: [
        {
          text: "Computer Science",
          value: "cs",
        },
        {
          text: "Electrical Engineering",
          value: "ee",
        },
        {
          text: "Neuroscience",
          value: "ns",
        },
      ],
      expertise: [
        {
          text: "Anyone",
          value: "any",
        },
        {
          text: "1-5 Peer Review Publications",
          value: "1-5",
        },
        {
          text: "5-20 Peer Review Publications",
          value: "5-20",
        },
        {
          text: "20-100 Peer Review Publications",
          value: "20-100",
        },
        {
          text: "100+ Peer Review Publications",
          value: "100+",
        },
      ],
      accessibilityOptions: [
        {
          text: "Open",
          value: "open",
        },
        {
          text: "With Permission",
          value: "with-permission",
          notEnabled: true,
        },
        {
          text: "Embargoed",
          value: "embargoed",
          notEnabled: true,
        },
        {
          text: "Restricted",
          value: "restricted",
          notEnabled: true,
        },
      ],
      types: [
        {
          text: "Peer Review",
          value: "peer-review",
        },
        {
          text: "Pre Print",
          value: "pre-print",
        },
        {
          text: "Book Chapter",
          value: "book-chapter",
          notEnabled: true,
        },
        {
          text: "Poster",
          value: "poster",
          notEnabled: true,
        },
        {
          text: "Presentation",
          value: "presentation",
          notEnabled: true,
        },
        {
          text: "Video",
          value: "video",
          notEnabled: true,
        },
        {
          text: "Stream",
          value: "stream",
          notEnabled: true,
        },
        {
          text: "Course",
          value: "course",
          notEnabled: true,
        },
        {
          text: "Blog",
          value: "blog",
          notEnabled: true,
        }
      ],
      databases: [
        {
          text: "AGRIS",
          value: "agris"
        },
        {
          text: "arXiv",
          value: "arxiv",
        },
        {
          text: "BASE",
          value: "base",
        },
        {
          text: "CORE",
          value: "CORE",
        },
        {
          text: "DBLP",
          value: "dblp",
        },
        {
          text: "DOAJ",
          value: "DOAJ",
        },
        {
          text: "IEEE Xplore",
          value: "ieee",
          notEnabled: true,
        },
        {
          text: "JSTOR",
          value: "jstor",
        },
        {
          text: "PubMed",
          value: "pubmed",
        },
        {
          text: "PubPsych",
          value: "pubpsych"
        },
        {
          text: "SSRN",
          value: "ssrn",
        },
        {
          text: "Unpaywall",
          value: "Unpaywall"
        }
      ],
      journals: [
        {
          text: "PLOS ONE",
          value: "plos one"
        },
        {
          text: "Royal Society Open Science",
          value: "royal society open science"
        },
        {
          text: "Nature",
          value: "nature"
        },
        {
          text: "Science",
          value: "science"
        },
      ]
    };
  },
  methods: {
    //default filter start
    defaultFilterCheckboxChecked() {
      localStorage.selectedFilters = this.selectedFilters;
      localStorage.yearRange = this.yearRange;
      localStorage.defaultFilterCheckbox = this.defaultFilterCheckbox;

      if (localStorage.defaultFilterCheckbox == "true") {
        localStorage.clear();
        return;
      }
    },
    formatYear(d) {
      try {
        let date = new Date(d)
        let year = new Intl.DateTimeFormat('en', { year: 'numeric', day: "numeric" }).format(date);
        return parseInt(year);
      }
      catch(err) {
        return undefined;
      }
    },
  }
}
</script>
<style scoped>
.dropdownButton {
  text-align: left;
  border: 0px;
  font-size: 16px;
  width: 220px;


}

.toggleBg.not-collapsed {
  background-color: #4577B8;
  color: white;
}

.downArrow {
  float: right;
  padding-top: 3px;
}

.collapseAccordion {
  column-count: 1;
}

.firstFilter {
  background-color: #F78626;
}

.histSlider{
    left: 18px;
    bottom: 15px;
    position:relative;
    
}
</style>