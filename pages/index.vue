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
      >
        <b-card class="shadow-sm border-0">
          <b-row>
            <b-col cols="4" class="left">
              <client-only>
                <b-skeleton
                  slot="placeholder"
                  type="avatar"
                  height="100px"
                  width="100px"
                ></b-skeleton>

                <progress-circle
                  :completed-steps="quickView.completedSteps"
                  :total-steps="quickView.totalSteps"
                  :circle-color="circleColor"
                  :start-color="startColor"
                  :stop-color="stopColor"
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
            <b-col cols="4" class="right">
              <h5 class="text-uppercase">{{ quickView.title }}</h5>
              <h3 class="text-uppercase">{{ quickView.data }}</h3>
            </b-col>
            <b-col cols="4">
              <component :is="getIconName(quickView.icon)"></component>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <client-only placeholder="Loading...">
      <DoughnutChart
        :chart-data="doughChartData"
        :chart-options="doughChartOptions"
        :height="430"
      />
    </client-only>
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
        // labels: ['NuVue', 'VueJit', 'IftShi', 'KoinVi', 'MegsWear', 'Millgh'],
        datasets: [
          {
            label: 'Visualization',
            data: [72, 131, 12, 3, 4, 55],
            backgroundColor: [
              'rgba(20, 255, 0, 0.85)',
              'rgba(200, 5, 0, 0.85)',
              'rgba(10, 220, 0, 0.85)',
              'rgba(2, 100, 0, 0.85)',
              'rgba(20, 55, 0, 0.85)',
              'rgba(120, 155, 0, 0.85)',
            ],
            borderColor: 'rgba(100, 155, 0, 1)',
            borderWidth: 0,
          },
        ],
      },
      doughChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        offset: 8,
        radius: 160,
        spacing: 4,
        hoverOffset: 32,
        hoverBorderWidth: 1,
        weight: 0,
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
