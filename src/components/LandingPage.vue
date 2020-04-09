<template>
  <el-container>
    <el-row justify="center">
      <h1>Coronalytics US Covid-19 Data</h1>
      <hr/>
      <br/>
        <el-select label="State" v-model="selectedState" placeholder="Select">
          <el-option
                  v-for="item in stateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>`
        </el-select>
      <br/>
      <br/>
      <Chart :id=this.selectedState />
    </el-row>
  </el-container>
</template>

<script>
  import Chart from './Chart.vue'

  export default {
    name: 'LandingPage',
    components: {
      Chart
    },
    props: {
    },
    data() {
      return {
        selectedState: "AL",
        stateOptions: [
          { label: 'United States', value: 'US'},
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
