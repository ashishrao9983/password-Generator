import { useCallback, useState ,useEffect ,useRef} from 'react'

// import './App.css'

function App() {
  const [length, setLength] = useState(6)
  const [numberAllowed,setNumberAllowed] =useState(false)
  const [charAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]=useState("")

  // useRef hook
  const passwordRef =useRef()

  const passwordGenerator = useCallback( ()=> {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str +="0123456789"
    if(charAllowed) str +="!@#$%^&*()_+~`"

    for (let i = 1; i <= length; i++) {
     let char = Math.floor(Math.random() * str.length +1)
      
     pass += str.charAt(char)
    }
    
    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(() =>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,50)
    window.navigator.clipboard.writeText(password)},[password])

 useEffect(() => {passwordGenerator()}, [length, numberAllowed,charAllowed,passwordGenerator])

 return (
  <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
    <div className="w-full max-w-md shadow-md rounded-lg px-6 py-6 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center text-2xl font-bold mb-6">
        Password Generator
      </h1>

      <div className="flex shadow rounded-lg overflow-hidden">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-3 text-white bg-gray-700"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard}
        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 transition-all">
          Copy
        </button>
        </div>

        <div className='flex flex-col text-sm gap-y-2 mt-4'>

       
       <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
           min={6}
           max={50}
           value={length}
           className='cursor-pointer'
           onChange={(e)=>{setLength(e.target.value)}}
          />
          <label> Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1 gap-y-1'>
         <input type="checkbox" 
         defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{setNumberAllowed((prev) => !prev)}} />

          <label htmlFor="numberInput">Numbers</label>
        </div>

         <div className='flex items-center gap-x-1'>
         <input type="checkbox" 
         defaultChecked={charAllowed}
          id="characterInput"
          onChange={()=>{setCharAllowed((prev) => !prev)}} />

          <label htmlFor="characterInput">Characters</label>
        </div>
        </div> 
      </div>
    </div>
  </div>
);
}

export default App
