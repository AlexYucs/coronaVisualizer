<template>
  <el-container>
    <el-row justify="center">
        <el-select
                label="State"
                v-model="selectedState"
                placeholder="Add a State"
                filterable
                no-match-text="No matching data"
                :filter-method="filterSearch"
                @visible-change	="filterReset"
                @change="addState"
        >
          <el-option
                  v-for="item in stateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>`
        </el-select>
      <br/>
      <br/>
        <div v-if="Object.keys(stateCharts).length<=1" >
            <div v-for="(value, name) in stateCharts" :key="name" class="row">
                <Chart :id="value.stateId" :removeState="removeState" />
            </div>
        </div>
        <div v-else >
            <el-row justify="center" :gutter="20">
                <div v-for="(value, name) in stateCharts" :key="name" class="row">
                    <div class="desktop">
                        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="9" :offset="2" >
                            <Chart class="chart" :id="value.stateId" :removeState="removeState" />
                        </el-col>
                    </div>
                    <div class="mobile">
                        <Chart :id="value.stateId" :removeState="removeState" />
                    </div>
                </div>
            </el-row>
        </div>
    </el-row>
  </el-container>
</template>

<script>
  import Chart from './Chart.vue';
  import Vue from 'vue';

  export default {
    name: 'LandingPage',
    components: {
      Chart
    },
    methods:{
      filterSearch(input){
        const formattedInput = input.toUpperCase();
        this.stateOptions = this.stateList.filter(state => state.label.includes(formattedInput) || state.value === formattedInput);
      },
        filterReset(){
          this.stateOptions = this.stateList;
          },
        addState(){
            this.stateCharts[this.selectedState] = {stateId:this.selectedState};
            this.selectedState="";
        },
        removeState(stateId){
            Vue.delete(this.stateCharts, stateId);
        },
    },
    props: {
    },
    data() {
      return {
          stateCharts:{
            "MA":{stateId:"MA"},
          },
        selectedState: "",
        stateList: [
          { label: 'ALABAMA', value: 'AL'},
          { label: 'ALASKA', value: 'AK'},
          { label: 'ARIZONA', value: 'AZ'},
          { label: 'ARKANSAS', value: 'AR'},
          { label: 'CALIFORNIA', value: 'CA'},
          { label: 'COLORADO', value: 'CO'},
          { label: 'CONNECTICUT', value: 'CT'},
          { label: 'DELAWARE', value: 'DE'},
          { label: 'FLORIDA', value: 'FL'},
          { label: 'GEORGIA', value: 'GA'},
          { label: 'HAWAII', value: 'HI'},
          { label: 'IDAHO', value: 'ID'},
          { label: 'ILLINOIS', value: 'IL'},
          { label: 'INDIANA', value: 'IN'},
          { label: 'IOWA', value: 'IA'},
          { label: 'KANSAS', value: 'KS'},
          { label: 'KENTUCKY', value: 'KY'},
          { label: 'LOUISIANA', value: 'LA'},
          { label: 'MAINE', value: 'ME'},
          { label: 'MARYLAND', value: 'MD'},
          { label: 'MASSACHUSETTS', value: 'MA'},
          { label: 'MICHIGAN', value: 'MI'},
          { label: 'MINNESOTA', value: 'MN'},
          { label: 'MISSISSIPPI', value: 'MS'},
          { label: 'MISSOURI', value: 'MO'},
          { label: 'MONTANA', value: 'MT'},
          { label: 'NEBRASKA', value: 'NE'},
          { label: 'NEVADA', value: 'NV'},
          { label: 'NEW HAMPSHIRE', value: 'NH'},
          { label: 'NEW JERSEY', value: 'NJ'},
          { label: 'NEW MEXICO', value: 'NM'},
          { label: 'NEW YORK', value: 'NY'},
          { label: 'NORTH CAROLINA', value: 'NC'},
          { label: 'NORTH DAKOTA', value: 'ND'},
          { label: 'OHIO', value: 'OH'},
          { label: 'OKLAHOMA', value: 'OK'},
          { label: 'OREGON', value: 'OR'},
          { label: 'PENNSYLVANIA', value: 'PA'},
          { label: 'PUERTO RICO', value: 'PR'},
          { label: 'RHODE ISLAND', value: 'RI'},
          { label: 'SOUTH CAROLINA', value: 'SC'},
          { label: 'SOUTH DAKOTA', value: 'SD'},
          { label: 'TENNESSEE', value: 'TN'},
          { label: 'TEXAS', value: 'TX'},
          { label: 'UTAH', value: 'UT'},
          { label: 'VERMONT', value: 'VT'},
          { label: 'VIRGINIA', value: 'VA'},
          { label: 'WASHINGTON', value: 'WA'},
          { label: 'WEST VIRGINIA', value: 'WV'},
          { label: 'WISCONSIN', value: 'WI'},
          { label: 'WYOMING', value: 'WY' }
        ],
        stateOptions: [
          { label: 'ALABAMA', value: 'AL'},
          { label: 'ALASKA', value: 'AK'},
          { label: 'ARIZONA', value: 'AZ'},
          { label: 'ARKANSAS', value: 'AR'},
          { label: 'CALIFORNIA', value: 'CA'},
          { label: 'COLORADO', value: 'CO'},
          { label: 'CONNECTICUT', value: 'CT'},
          { label: 'DELAWARE', value: 'DE'},
          { label: 'FLORIDA', value: 'FL'},
          { label: 'GEORGIA', value: 'GA'},
          { label: 'HAWAII', value: 'HI'},
          { label: 'IDAHO', value: 'ID'},
          { label: 'ILLINOIS', value: 'IL'},
          { label: 'INDIANA', value: 'IN'},
          { label: 'IOWA', value: 'IA'},
          { label: 'KANSAS', value: 'KS'},
          { label: 'KENTUCKY', value: 'KY'},
          { label: 'LOUISIANA', value: 'LA'},
          { label: 'MAINE', value: 'ME'},
          { label: 'MARYLAND', value: 'MD'},
          { label: 'MASSACHUSETTS', value: 'MA'},
          { label: 'MICHIGAN', value: 'MI'},
          { label: 'MINNESOTA', value: 'MN'},
          { label: 'MISSISSIPPI', value: 'MS'},
          { label: 'MISSOURI', value: 'MO'},
          { label: 'MONTANA', value: 'MT'},
          { label: 'NEBRASKA', value: 'NE'},
          { label: 'NEVADA', value: 'NV'},
          { label: 'NEW HAMPSHIRE', value: 'NH'},
          { label: 'NEW JERSEY', value: 'NJ'},
          { label: 'NEW MEXICO', value: 'NM'},
          { label: 'NEW YORK', value: 'NY'},
          { label: 'NORTH CAROLINA', value: 'NC'},
          { label: 'NORTH DAKOTA', value: 'ND'},
          { label: 'OHIO', value: 'OH'},
          { label: 'OKLAHOMA', value: 'OK'},
          { label: 'OREGON', value: 'OR'},
          { label: 'PENNSYLVANIA', value: 'PA'},
          { label: 'PUERTO RICO', value: 'PR'},
          { label: 'RHODE ISLAND', value: 'RI'},
          { label: 'SOUTH CAROLINA', value: 'SC'},
          { label: 'SOUTH DAKOTA', value: 'SD'},
          { label: 'TENNESSEE', value: 'TN'},
          { label: 'TEXAS', value: 'TX'},
          { label: 'UTAH', value: 'UT'},
          { label: 'VERMONT', value: 'VT'},
          { label: 'VIRGINIA', value: 'VA'},
          { label: 'WASHINGTON', value: 'WA'},
          { label: 'WEST VIRGINIA', value: 'WV'},
          { label: 'WISCONSIN', value: 'WI'},
          { label: 'WYOMING', value: 'WY' }
        ]
      }
    }
}
</script>

<style>
    .mobile{
        display: none;
    }
    @media only screen and (max-width: 1600px){
        .desktop{
            display: none;
        }
        .mobile{
            display: inline-block;
        }
    }
</style>