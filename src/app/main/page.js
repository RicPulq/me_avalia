'use client'

import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'

import api from '@/services/api'
import Form from '@/components/form'





const Main = () => {
  // const [items, setItems] = React.useState([
  //   {label: 'materia 1', rating: 1},
  //   {label: 'materia 2', rating: 3},
  //   {label: 'materia 3', rating: 5}
  // ])

  const [items, setItems] = React.useState([{}])

  const [user, setUser] = useState({})
  const [data, setData] = useState()

  const [form, setForm] = useState(false)
  const [type, setType] = useState('new')

  const router = useRouter()
  
  
  const aluno = async() => {
    try {
      const response = await api.get('/aluno/')
      if (response){
        console.log(localStorage.getItem("token"))
        console.log(response.data)
        setUser(response.data[0])
        // console.log(user.name) // juca filho
        // setData(response.data[1])
        console.log(data)
        // console.log(response.data[1])
        setItems(response.data[0].ratings)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{aluno()}, [])
  

  return (
    <>
    {/* <header className="mt-6 text-center text-3xl font-extrabold text-secondary">{user.name}</header> */}
    {/* <div>
      <button onClick={()=>aluno()}>TESTE</button>
    </div> */}
    {form === false ? <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-4">
      <div className="bg-white p-4 rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary">{user.name}</h2>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="flex justify-between items-center border-b py-2">
            <span>{item.feedback}</span>
            <div className="flex flex-row">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;

                return (
                  <FaStar
                    key={index}
                    size={20}
                    color={starValue <= item.rating ? 'gold' : 'gray'}
                  />
                );
              })}
            </div>
            <div>
              <button 
                className="mr-2 text-blue-500"
                onClick={
                  () => {
                    setData(item)
                    setType('edit')
                    setForm(true)
                  }
                }
              >
                <FiEdit />
              </button>
              <button className="text-red-500"><FiTrash /></button>
            </div>
          </li>
        ))}
      </ul>
      </div>
      </div>
    </div> : <Form data={data} cancel={() => setForm(false)} type={type} />}
    </>
  )
}

export default Main