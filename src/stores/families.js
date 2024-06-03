import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import {supabase} from '@/supabase.js';
import {v4 as uuidv4} from 'uuid';

const family = ref(null);
const familyMembers = ref([]);
const errorMessage = ref("");
const loading = ref(false);
const loadingFamily = ref(false);
const familyInfo = ref([]);

export const useFamilyStore = defineStore('families', () => {
    const families = ref([]);

    const getFamily = async (familyId) => {
        try {
            const {data: familyData, error} = await supabase
                .from('families')
                .select('*')
                .eq('id', familyId);

            if (error) throw error;

            family.value = familyData[0];
            if (!familyData.length) {
                console.log('No family found');
            }
        } catch (error) {
            console.error('Error fetching family: ', error);
        }
    }
    const getFamiliesForUser = async (userId) => {
        try {
            const {data: userFamilies, error} = await supabase
                .from('user_has_family')
                .select('*')
                .eq('user_id', userId);

            if (error) throw error;

            families.value = userFamilies;
            if (!userFamilies.length) {
                console.log('No families found for user');
            }
        } catch (error) {
            console.error('Error fetching families: ', error);
        }
    };

    const getFamilyInfo = async (userId) => {
        const {data: userFamilies, error: error1} = await supabase
            .from('user_has_family')
            .select('family_id')
            .eq('user_id', userId);

        if (error1) {
            loadingFamily.value = false;
            loading.value = false;
            return errorMessage.value = error1.message;

        }
        const familyIds = userFamilies.map(family => family.family_id);
        const {data: familyInfoGrab, error: error2} = await supabase
            .from('families')
            .select('*')
            .in('id', familyIds);

        console.log(familyInfo)
        if (error2) {
            loadingFamily.value = false;
            loading.value = false;
            return errorMessage.value = error2.message;

        }
        familyInfo.value = familyInfoGrab;
    }

    const joinFamilyForUser = async (userId, familyCode) => {
        const {data: family, error} = await supabase
            .from('families')
            .select('*')
            .eq('uuid', familyCode.value)


        if (error) {
            loadingFamily.value = false;
            loading.value = false;
            return errorMessage.value = error.message;
        }

        const { data: userIsInFamily, error: error1 } = await supabase
            .from('user_has_family')
            .select('*, families!inner(uuid)')
            .eq('user_id', userId)
            .eq('families.uuid', familyCode.value);

        if (error1) {
            console.error('Error:', error1);
        } else {
            console.log('User is in family:', userIsInFamily);
        }

        console.log('User is in family:', userIsInFamily)

        if (userIsInFamily.length) {
            loadingFamily.value = false;
            loading.value = false;
            return errorMessage.value = "You are already in this family";
        }

        const {data: user_has_family, error: error2} = await supabase
            .from('user_has_family')
            .insert([
                {user_id: userId, family_id: family[0].id}
            ])
    }

    const addFamilyForUser = async (userId, familyData) => {
        const {family_name, role} = familyData;
        if (!family_name) {
            errorMessage.value = "Family name cannot be empty";
            return;
        }
        let familyID = uuidv4();

        const {data: familyIDTaken} = await supabase
            .from('families')
            .select()
            .eq('id', familyID)

        if (familyIDTaken) {
            for (let i = 0; i < 5; i++) {
                if (familyIDTaken) {
                    familyID = uuidv4();
                } else {
                    break;
                }
            }
        }

        const familyInviteUUID = uuidv4();

        let {data: newFamily, error: error1} = await supabase
            .from('families')
            .insert([
                {id:familyID ,family_name: family_name, uuid: familyInviteUUID}
            ])
            .select()

        if (error1) {
            loadingFamily.value = false;
            loading.value = false;
            return errorMessage.value = error1.message;
        }

        let {data: role_id, error: error2} = await supabase
            .from('roles')
            .select('id')
            .eq('role_name', role)
            .single()


        if (error2) {
            loadingFamily.value = false;
            loading.value = false;
            return errorMessage.value = error2.message;
        }


        try {
            const {data: new_user_has_family, error} = await supabase
                .from('user_has_family')
                .insert([
                    {user_id: userId, family_id: newFamily[0].id, user_role_id: role_id.id}
                ])

            if (error) throw error;

            families.value.push(newFamily);
        } catch (error) {
            console.error('Error adding new family: ', error);
        }

    };

    const getFamilyMembers = async (familyId) => {
        const {data: familyMembersGrab, error} = await supabase
            .from('user_has_family')
            .select('user_id')
            .eq('family_id', familyId);

        if (error) {
            loadingFamily.value = false;
            loading.value = false;
            return errorMessage.value = error.message;
        }

        familyMembers.value = familyMembersGrab;

    }
    return {
        families,
        getFamiliesForUser,
        addFamilyForUser,
        errorMessage,
        loading,
        family,
        getFamilyInfo,
        familyInfo,
        joinFamilyForUser,
        getFamilyMembers,
        familyMembers,
        getFamily
    };
});
