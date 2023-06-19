import { signUp, signIn, supabase } from "../lib/client.js";

// const {data, error} = await signIn({
//     email: "fathnakbar@gmail.com",
//     password: "fathanakbar123",
// })

const {data, error} = await supabase.auth.getSession();


if (data) {
    console.log(data)
} else {
    console.log(error)
}