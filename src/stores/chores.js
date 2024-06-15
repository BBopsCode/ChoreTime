import {ref} from "vue";
import {defineStore} from "pinia";
import {supabase} from "@/supabase.js";

const allChores = ref([])
const choresByFamilyMembers = ref([])
const errorMessage = ref('')
export const useChoreStore = defineStore('chores', () => {
    const addNewChore = async (choreDetails) => {
        const {name, occurence, is_complete, value, difficulty_rating, chart_id, category, assignees} = choreDetails

        if (!name) {
            errorMessage.value = 'Chore name cannot be empty'
            return
        }
        const {data: newChoreData, error: error} = await supabase
            .from('chores')
            .insert([
                {
                    name: name,
                    occurence: occurence,
                    is_complete: is_complete,
                    value: value,
                    difficulty_rating: difficulty_rating,
                    chart_id: chart_id,
                    category:category,
                }
            ])
        if (error) {
            errorMessage.value = error.message
            return
        }

    }

    const GetChores = async (chartId) => {
        const {data: chores, error: error} = await supabase
            .from('chores')
            .select('*')
            .eq('chart_id', chartId)

        allChores.value = chores
    }

    return {
        addNewChore,
        GetChores,
        allChores,
        errorMessage,
        choresByFamilyMembers
    }
})