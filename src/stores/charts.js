import {defineStore} from "pinia";
import {supabase} from "@/supabase.js";
import {v4 as uuidv4} from "uuid";
import {ref} from "vue";

const errorMessage = ref("");
const chart = ref(null)
const charts = ref([]);

export const useChartStore = defineStore("charts", () => {
    const createChart = async (chartData) => {
        const {name, description, is_mandatory, family_id} = chartData;
        const {data, error} = await supabase
            .from("charts")
            .insert([
                {
                    id: uuidv4(),
                    name,
                    description,
                    is_mandatory,
                    family_id,
                },
            ]);

        if (error) {
            errorMessage.value = error.message;
            return;
        }
    }
    const fetchCharts = async (family_id) => {
        const {data, error} = await supabase
            .from("charts")
            .select("*")
            .eq("family_id", family_id)
            .order("date_modified", {ascending: false});

        if (error) {
            errorMessage.value = error.message;
            return;
        }

        charts.value = data;
    }
    return {
        charts,
        createChart,
        errorMessage,
        fetchCharts,
    }
})