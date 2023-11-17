import api from '@/services/api'

// FORMA GENERICA E MAIS BRAÇAL
// export default async function Login({username, password}) {
//     try {
//         const response = await fetch('http://192.168.10.156:8000/token/login/',
//             {method:'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//                 // Define o cabeçalho Content-Type
//             },
//             body: JSON.stringify({username: username, password: password })
//             }
//         )
//         console.log(response)
//         return response.json()
//     } catch (error) {
//         console.log(error)
//     }
// }


// FORMA MAIS OTIMIZADA E MASCARANDO COISAS
export default async function Login ({username, password}){
    try {
        const response = await api.post('/token/login/', {username: username, password: password })
        // const response = await axios.post('http://192.168.10.190:7000/v1/login/', {username: username, password: password })
        // console.log(response.data)
        
        return response.data
    } catch (error) {
        console.log(error)
    }
}