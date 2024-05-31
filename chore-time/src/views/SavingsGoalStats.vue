<template>
  <v-card class="mx-auto" max-width="500" border flat>
    <v-list-item class="px-6" height="88">
      <template v-slot:prepend>
        <v-avatar color="surface-light" size="32">🎯</v-avatar>
      </template>

      <template v-slot:title> Set a savings goal. </template>

      <template v-slot:append>
        <v-btn
            class="text-none"
            color="primary"
            text="Create goal"
            variant="text"
            slim
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-card-text class="text-medium-emphasis pa-6">
      <div class="text-h6 mb-6">Mothers Day Gifts</div>

      <div class="text-h4 font-weight-black mb-4">20%</div>

      <v-progress-linear
          bg-color="surface-variant"
          class="mb-6"
          color="primary"
          height="10"
          model-value="20"
          rounded="pill"
      ></v-progress-linear>

      <div>$20 of $100 earned — 270 days left</div>

      <v-list-item
          append-icon="mdi-chevron-right"
          lines="two"
          subtitle="View Contributions"
          link
      ></v-list-item>
    </v-card-text>
  </v-card>
</template>