import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [id, setId] = useState(1)
  const [list, setList] = useState<{ localId: number; localTitle: string; localDescription: string }[]>([])

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const useAutosizeTextArea = (ref: React.RefObject<HTMLTextAreaElement>) => {
    const autoSize = () => {
      if (ref.current) {
        ref.current.style.height = 'auto'
        ref.current.style.height = `${ref.current.scrollHeight}px`
      }
    }

    return autoSize
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(e.target.value)
  }

  useEffect(() => {
    setList(JSON.parse(localStorage.getItem('tareas') || '[]'))
  }, [])

  const save = (): void => {
    setId(id + 1)

    if (!title || !description) {
      alert('Title and description are required')
      return
    }

    const newList = list.concat({ localId: id, localTitle: title, localDescription: description })
    setList(newList)

    localStorage.setItem('tareas', JSON.stringify(newList))

    setTitle('')
    setDescription('')

    console.log(list)
  }

  const Delete = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const id = e.currentTarget.querySelector('h3')?.textContent
      const newList = list.filter((item) => item.localTitle !== id)
      setList(newList)

      localStorage.setItem('tareas', JSON.stringify(newList))
    } else {
      alert('Task not deleted')
      return
    }
  }

  return (
    <>
      <h1>React TS</h1>
      <section className='mainContainer'>
        <form className='form w-responsive glass'>
          <div className='inputContainer'>
            <label htmlFor='title'>Title: </label>
            <input className='input' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
          </div>
          <div className='inputContainer'>
            <label htmlFor='description'>Description: </label>
            <textarea
              className='input'
              value={description}
              onChange={handleChange}
              ref={textAreaRef}
              onInput={useAutosizeTextArea(textAreaRef)}
              placeholder='Write the description...'
            ></textarea>
          </div>
          <button type='button' onClick={save}>Add</button>
        </form>
      </section>

      <section className="list">
        <div className='form glass w-responsive'>
          <h2>To do list</h2>
          <p>Click on the card to delete it</p>
          <div className='listContainer d-grid'>
            {list.map((item, index) => (
              <div key={index} className='card glass' onClick={Delete}>
                <h3>{item.localTitle}</h3>
                <p>{item.localDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default App
