'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaStar } from 'react-icons/fa'
import api from '@/services/api'


const StarRatingForm = (props) => {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(0);

  const router = useRouter()

  const handleSubmit = async(rate, feedback) => {
    const res = await api.get('aluno/')
    console.log(res.data)
    const aux = await api.post('/avaliacao/', {
      "score": rate,
      "feedback": feedback,
      "students": res.data.aluno.uuid,
      "universityclass": res.data.aula.uuid
    })

    return aux
  }

  useEffect(()=>{handleSubmit()}, [])

  useEffect(() => {
    if (props.data !== null) {
      setText(props.data.feedback)
      setRating(props.data.score)
    } else {
      setText('')
      setRating(0)
    }
  }, [props])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-lg w-96">
        <h2 className="text-2xl mb-4">Avaliação da aula </h2>

        <div className="mb-4">
          <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-600">Feedback</label>
          <input 
            type="text" 
            id="subject" 
            placeholder="Escreva seu feedback" 
            className="p-2 w-full border rounded"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="mb-4">
        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-600">Avaliação</label>
          <div className="flex justify-center">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;

              return (
                <FaStar
                  key={index}
                  size={30}
                  color={starValue <= rating ? 'gold' : 'gray'}
                  className="cursor-pointer"
                  onClick={() => setRating(starValue)}
                />
              );
            })}
          </div>
        </div>

        <div className="flex justify-between mt-10">
          <button 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => props.cancel()}
          >
            Cancelar
          </button>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={()=> handleSubmit(rating, text)}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default StarRatingForm;
