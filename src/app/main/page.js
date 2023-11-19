'use client'

import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { FiEdit, FiEdit3, FiTrash } from 'react-icons/fi'
import { FaStar, FaClipboardCheck } from 'react-icons/fa'
import { LuClipboardEdit } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

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
  const [data, setData] = useState({})
  const [classe, setClasse] = useState({})

  const [form, setForm] = useState(false)
  const [type, setType] = useState('new')

  const router = useRouter()
  
  const resp = {"data":
  {
    "aluno": {
      "uuid": "e7e1e202-f17d-4a84-b216-91447cd0bb7a",
      "name": "juca filho",
      "registration_number": "201709",
      "ratings": [
        {
          "uuid": "a46cd3f8-2a4f-433a-8929-363a9f91a569",
          "universityclass": {
            "uuid": "15a21e05-c171-4278-a6dc-ac93496529a4",
            "inicio": "2023-11-17T13:30:51",
            "final": "2023-11-17T13:34:00",
            "classroom_id": {
              "uuid": "4d4e30cf-fe5b-4ca5-95d1-a9704359131c",
              "course": {
                "uuid": "bbcafb88-e834-4fef-a795-088d486cc85e",
                "name": "algoritmos"
              }
            }
          },
          "score": 3,
          "feedback": "professor nao sabe de nada",
          "date_created": "2023-11-17T13:33:52.735736",
          "students": "e7e1e202-f17d-4a84-b216-91447cd0bb7a"
        },
        {
          "uuid": "075a1321-607b-4def-8b54-5cc6eef09d98",
          "universityclass": {
            "uuid": "0abceb84-ac93-4a48-be6a-8cd984fd6999",
            "inicio": "2023-11-17T13:40:54",
            "final": "2023-11-17T13:46:00",
            "classroom_id": {
              "uuid": "4d4e30cf-fe5b-4ca5-95d1-a9704359131c",
              "course": {
                "uuid": "bbcafb88-e834-4fef-a795-088d486cc85e",
                "name": "algoritmos"
              }
            }
          },
          "score": 5,
          "feedback": "professor passou as respostas da proxima prova",
          "date_created": "2023-11-17T13:46:34.475793",
          "students": "e7e1e202-f17d-4a84-b216-91447cd0bb7a"
        },
        {
          "uuid": "0c97f496-a650-4002-b32b-abf1e244a41a",
          "universityclass": {
            "uuid": "6f3e7aa3-f532-45f6-87f3-e09744ae3298",
            "inicio": "2023-11-17T14:00:58",
            "final": "2023-11-17T14:03:05",
            "classroom_id": {
              "uuid": "4d4e30cf-fe5b-4ca5-95d1-a9704359131c",
              "course": {
                "uuid": "bbcafb88-e834-4fef-a795-088d486cc85e",
                "name": "algoritmos"
              }
            }
          },
          "score": 5,
          "feedback": "a só bagunça",
          "date_created": "2023-11-17T14:04:27.185665",
          "students": "e7e1e202-f17d-4a84-b216-91447cd0bb7a"
        },
        {
          "uuid": "a65e34df-cbe4-4dbc-beed-38fa74b97fcd",
          "universityclass": {
            "uuid": "4a53f69d-2e0d-4bba-b171-aa7d78f105a6",
            "inicio": "2023-11-17T17:39:18",
            "final": "2023-11-17T17:40:26",
            "classroom_id": {
              "uuid": "4d4e30cf-fe5b-4ca5-95d1-a9704359131c",
              "course": {
                "uuid": "bbcafb88-e834-4fef-a795-088d486cc85e",
                "name": "algoritmos"
              }
            }
          },
          "score": 4,
          "feedback": "teste",
          "date_created": "2023-11-17T18:36:45.581146",
          "students": "e7e1e202-f17d-4a84-b216-91447cd0bb7a"
        }
      ]
    },
    "aula": {
      "uuid": "bc802903-6f2e-4f12-b3f1-1355cddc5732",
      "inicio": "2023-11-18T11:10:46",
      "final": "2023-11-18T11:17:54",
      "classroom_id": {
        "uuid": "4d4e30cf-fe5b-4ca5-95d1-a9704359131c",
        "course": {
          "uuid": "bbcafb88-e834-4fef-a795-088d486cc85e",
          "name": "Algoritmos"
        }
      }
    }
  }
}
  
  const aluno = async() => {
    try {
      // const response = await api.get('/aluno/')
      const response = resp
      console.log(response)
      // const lesson = await api.get(`/aulas/${response.data[0].ratings[0].universityclass}`)
      // console.log(lesson)
      if (response){
        console.log(localStorage.getItem("token"))
        // console.log(response.data)
        setUser(response.data.aluno)
        setData(response.data.aula)
        setClasse(response.data.aula.classroom_id.course)
        // console.log(response.data.aluno.ratings)
        setItems(response.data.aluno.ratings)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{aluno()}, [])
  

  return (
    <>
    <header className="mt-6 text-center text-3xl font-extrabold text-secondary">{user.name}</header>
    {/* Cria avaliação da aula recem terminada */}
    {/* {form === false ? <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-4">
      <div className="bg-white p-4 rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary">Aula Para Avaliar</h2>
      </div>
      <ul>
        <span>{classe.name} - {data.final}</span>
        <button 
          className="mr-2 text-blue-500"
          onClick={
            () => {
              setData(data)
              setType('edit')
              setForm(true)
            }
          }
        >
          <FiEdit />
        </button>
      </ul>
      </div>
      </div>
    </div> : <Form data={data} cancel={() => setForm(false)} type={type} />} */}



    {/* Avaliações Disponíveis para Atualização */}
    {form === false ? <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-4">
      <div className="bg-white p-4 rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary">Avaliações Disponiveis</h2>
      </div>
      <div className="flex justify-between items-center border-b py-2">
      <span>{classe.name} - {data.final} &nbsp;</span>
      <div className="flex flex-row">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <FaStar
              key={index}
              size={20}
              color={starValue <= 0 ? 'gold' : 'gray'}
            />
          );
        })}
      </div>
        <button 
          className="mr-2 text-blue-500"
          onClick={
            () => {
              setData(data)
              setType('edit')
              setForm(true)
            }
          }
        >
          <FaClipboardCheck color="orange" size={25}/>
        </button>
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
                    color={starValue <= item.score ? 'gold' : 'gray'}
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
                <LuClipboardEdit />
              </button>
              <button className="text-red-500"><MdDelete /></button>
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
