import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {supabase} from "@/supabase.js";
import {useFamilyStore} from "@/stores/families.js";
import {v4 as uuidv4} from 'uuid';

import {convertStringToNumberByType} from "jsdom/lib/jsdom/living/helpers/number-and-date-inputs.js";


export const useUserStore = defineStore('users', () => {
    const user = ref(null)
    const errorMessage = ref("")
    const loading = ref(false)
    const loadingUser = ref(false)


    const handleLogin = async (credentials) => {
        const {password} = credentials
        const email = credentials.email.toLowerCase()

        if (!password.length) {
            loading.value = false
            return errorMessage.value = "Password cannot be empty"
        }
        loading.value = true

        const response = await supabase.auth.signInWithPassword({
            email,
            password
        });

        const {error} = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            loading.value = false
            return errorMessage.value = error.message
        }

        const {data: existingUser} = await supabase
            .from("users")
            .select()
            .eq('email', email)
            .single()

        user.value = {
            email: existingUser.email,
            username: existingUser.username,
            id: existingUser.id
        }


        loading.value = false
        errorMessage.value = ""
    }
    const handleSignup = async (credentials) => {
        const {password, first_name, last_name, confirmPassword} = credentials
        let userID = uuidv4()

        const {data: userIDExists} = await supabase
            .from("users")
            .select()
            .eq('id', userID)

        for (let i = 0; i < 5; i++) {
            if (userIDExists) {
                userID = uuidv4()
            } else {
                break
            }
        }

        const email = credentials.email.toLowerCase()
        const username = credentials.username.toLowerCase()

        if (password !== confirmPassword) {
            return errorMessage.value = "Passwords do not match"
        }
        errorMessage.value = ""
        loading.value = true

        // USERNAME VALIDATION
        if (username.length < 4) {
            loading.value = false
            return errorMessage.value = 'Username must be at least 4 characters'
        }
        if (username.length > 18) {
            loading.value = false
            return errorMessage.value = 'Username must be less than 18 characters'
        }
        if (!/^[a-zA-Z0-9_]*$/.test(username)) {
            loading.value = false
            return errorMessage.value = 'Username can only contain letters, numbers, and underscores'
        }
        // PASSWORD VALIDATION
        if (password.length < 6) {
            loading.value = false
            return errorMessage.value = 'Password must be at least 6 characters'
        }
        if (password.length > 24) {
            loading.value = false
            return errorMessage.value = 'Password must be less than 24 characters'
        }
        if (!/[a-z]/.test(password)) {
            loading.value = false
            return errorMessage.value = 'Password must contain at least one lowercase letter'
        }

        //First Name Validation
        if (!first_name.length) {
            loading.value = false
            return errorMessage.value = 'First name cannot be empty'
        }


        const {data: userNameExists} = await supabase
            .from("users")
            .select()
            .eq('username', username)
            .single()

        if (userNameExists) {
            loading.value = false
            return errorMessage.value = 'Username is taken'
        }


        // VALIDATE IF USER EXIST
        const {error} = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {
            loading.value = false
            return errorMessage.value = error.message
        }

        await supabase.from("users").insert({
            id: userID,
            username,
            email,
            first_name,
            last_name,
            balance: 0
        })

        const {data: newUser} = await supabase
            .from("users")
            .select()
            .eq('email', email)
            .single()



        user.value = {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            balance: newUser.balance
        }
        loading.value = false
    }
    const handleLogout = async () => {
        const familyStore = useFamilyStore()

        const {error} = await supabase.auth.signOut();
        if (error) {
            console.error('Error during sign out:', error);
        } else {
            // Clear user data
            user.value = null;
            // Clear family data
            familyStore.family.value = null;
            familyStore.familyInfo.value = [];
        }
    };
    const getUser = async () => {
        loadingUser.value = true
        const response = await supabase.auth.getUser()
        if (!response.data.user) {
            loadingUser.value = false
            return user.value = null
        }
        const {data: userWithEmail} = await supabase
            .from("users")
            .select()
            .eq("email", response.data.user.email)
            .single()

        user.value = {
            username: userWithEmail.username,
            email: userWithEmail.email,
            first_name: userWithEmail.first_name,
            last_name: userWithEmail.last_name,
            id: userWithEmail.id

        }
        loadingUser.value = false

    }

    const clearError = () => {
        errorMessage.value = ''
    }

    const test = () => {
        user.value = {
            name: 'Bryan'
        }
    }

    return {
        errorMessage,
        user,
        handleLogout,
        handleSignup,
        handleLogin,
        getUser,
        clearError,
        loading,
        loadingUser,
        test

    }
})
