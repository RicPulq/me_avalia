'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import Login from '@/services/login';


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [isPersist, setIsPersist] = useState(false)
  // const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (username,password) => {
    const data = await Login({username: username, password: password})
    // console.log(data) 
    if (data){
      localStorage.setItem("token", data.access)
      console.log(localStorage.getItem("token"))
      router.push('/main')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-4">
        <div className="flex flex-col">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary">
              Login
            </h2>
          </div>
        </div>

        <div>
          <div>
            <label className="mb-2 block text-sm font-bold text-secondary">
              Usuário:
            </label>
            <input
              type="text"
              className="focus:shadow-outline w-full appearance-none rounded border border-primary px-3 py-2 leading-tight text-primary shadow focus:outline-primary"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="relative mt-2">
            <label className="mb-2 block text-sm font-bold text-secondary">
              Senha:
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="focus:shadow-outline w-full appearance-none rounded border border-primary px-3 py-2 pr-10 leading-tight text-primary shadow focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-4 right-0 flex h-full cursor-pointer items-center pr-3 text-primary"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-primary accent-primary"
              checked={isPersist}
              onChange={() => setIsPersist((prev) => !prev)}
            />

            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm font-medium text-secondary"
            >
              Lembrar-me
            </label>
          </div>
          {/* <div className="text-sm">
            <a className="cursor-pointer font-medium text-primary hover:text-secondary">
              Esqueceu sua senha?
            </a>
          </div> */}
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            onClick={() => handleSubmit(username,password)}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
