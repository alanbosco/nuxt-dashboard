<template>
  <b-container fluid>
    <b-row class="mt-3">
      <b-col>
        <h4 class="text-uppercase font-weight-bold">Dashboard</h4>
      </b-col>
      <b-col class="text-right d-flex justify-content-end">
        <b-breadcrumb :items="items" class="bg-transparent"></b-breadcrumb>
      </b-col>
    </b-row>

    <!-- dashboard cards -->
    <b-row>
      <b-col
        v-for="(quickView, index) in quickViews"
        :key="`dashboard-card-item-${index}`"
        cols="12"
        md="6"
        xl="3"
        class="mb-3"
      >
        <b-card class="dashboard-card shadow-sm border-0">
          <b-row>
            <b-col cols="4" class="left">
              <client-only>
                <b-skeleton
                  slot="placeholder"
                  type="avatar"
                  height="80px"
                  width="80px"
                ></b-skeleton>

                <progress-circle
                  :completed-steps="quickView.completedSteps"
                  :total-steps="quickView.totalSteps"
                  :circle-color="circleColor"
                  :start-color="startColor"
                  :stop-color="stopColor"
                  diameter="80"
                  inner-display="slot"
                >
                  <span>
                    {{
                      percent(quickView.completedSteps, quickView.totalSteps)
                    }}
                    <span>%</span>
                  </span>
                </progress-circle>
              </client-only>
            </b-col>
            <b-col cols="5" class="right">
              <p class="h6 text-uppercase">{{ quickView.title }}</p>
              <p class="h5 text-uppercase">{{ quickView.data }}</p>
            </b-col>
            <b-col cols="3">
              <component :is="getIconName(quickView.icon)"></component>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- ACQUISITION CHANNELS -->

    <b-row class="mt-3">
      <b-col cols="12" lg="6">
        <b-card>
          <h6 class="text-uppercase">Acquisition Channels</h6>
          <div class="dropdown-divider"></div>
          <b-row>
            <b-col cols="12" md="6" lg="12" xl="6">
              <client-only placeholder="Loading...">
                <div class="position-relative">
                  <DoughnutChart
                    :chart-data="doughChartData"
                    :chart-options="doughChartOptions"
                    :height="430"
                  />
                  <div class="position-absolute center text-center">
                    <p class="mb-0">1,900,128</p>
                    <p class="mb-0">Views Total</p>
                  </div>
                </div>
              </client-only>
            </b-col>
            <b-col cols="12" md="6" lg="12" xl="6">
              <div class="acq-channel-data">
                <div
                  v-for="(item, itemIndex) in doughChartData.labels"
                  :key="`acq-channel-data-item-${itemIndex}`"
                  class="acq-channnel-data-item"
                >
                  <div
                    class="acq-channel-data-item-color"
                    :style="{
                      backgroundColor:
                        doughChartData.datasets[0].backgroundColor[itemIndex],
                    }"
                  ></div>
                  <div class="right">
                    <div class="acq-channel-data-item-text">
                      <p class="mb-0">{{ item }}</p>
                      <p class="mb-0">
                        + {{ doughChartData.datasets[0].data[itemIndex] }} %
                      </p>
                    </div>
                    <b-progress
                      :value="
                        parseInt(doughChartData.datasets[0].data[itemIndex])
                      "
                      :max="max"
                      height="5px"
                    ></b-progress>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card>
        <!-- USERS BY COUNTRY -->
      </b-col>
      <b-col cols="12" lg="6" class="mt-3 mt-lg-0">
        <b-card>
          <h6 class="text-uppercase">Users By Country</h6>
          <div class="dropdown-divider"></div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      items: [
        {
          text: 'Home',
          href: '/',
        },
        {
          text: 'Dashboard',
          href: '/',
        },
      ],
      doughChartData: {
        labels: [
          'Ad Campaigns',
          'Direct Traffic',
          'Referral Traffic',
          'Search engines',
          'Other',
        ],
        datasets: [
          {
            label: 'Visualization',
            data: [17, 38, 70, 22, 87],
            backgroundColor: [
              '#b9f2a1',
              '#6eba8c',
              '#0e8174',
              '#005562',
              '#10c4b5',
            ],
            borderColor: 'rgba(100, 155, 0, 1)',
            borderWidth: 0,
          },
        ],
      },
      doughChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        offset: 0,
        radius: 160,
        spacing: 0,
        hoverOffset: 20,
        hoverBorderWidth: 1,
        weight: 0,
        cutout: 100,
        plugins: {
          legend: {
            display: false,
          },
        },
      },

      startColor: '#e6e6e6',
      stopColor: '#e6e6e6',
      circleColor: 'transparent',

      quickViews: [
        {
          completedSteps: 5,
          totalSteps: 10,
          title: 'New Visits',
          data: '57,820',
          icon: 'account',
        },
        {
          completedSteps: 5,
          totalSteps: 10,
          title: 'Purchases',
          data: '$ 89,745',
          icon: 'CurrencyUsd',
        },
        {
          completedSteps: 10,
          totalSteps: 10,
          title: 'Active Users',
          data: '178,391',
          icon: 'EmoticonOutline',
        },
        {
          completedSteps: 5,
          totalSteps: 10,
          title: 'Returned',
          data: '32,592',
          icon: 'Refresh',
        },
      ],
    }
  },
  computed: {
    max() {
      return 100
    },
  },
  methods: {
    percent(a, b) {
      return Math.round((a / b) * 100)
    },
    getIconName(icon) {
      const iconNameCapitalized = icon.charAt(0).toUpperCase() + icon.slice(1)
      return `MaterialIcon${iconNameCapitalized}`
    },
  },
}
</script>
