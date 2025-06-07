import styles from './EditPost.module.css'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../context/authContext'
import {useUpdateDocument} from '../../hooks/useUpdateDocument'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id)

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {

    if (post) {
      setTitle(post.title)
      setBody(post.body)
      setImage(post.image)

      const textTags = post.tagsArray.join(", ")

      setTags(textTags);
    }

  }, [post])

  const { user } = useAuthValue()

  const { updateDocument, response } = useUpdateDocument("posts")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")

    //validate image URL
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL")
    }
    //array tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
    //check valures
    if (!title || !image || !body || !tags) {
      setFormError("Por favor, prencha todos os campos!")

    }

    if (formError) return;

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }
    updateDocument(id,data)

    //redirect to dashboard page
    navigate("/dashboard")

  }

  return (
    <div className={styles.edit_post}>

      {post && (
        <>
          <h2>Editando seu Post: {post.title}</h2>
          <p>Altere os dados do post</p>

          <form onSubmit={handleSubmit}>
            <label>
              <span>Título: </span>
              <input type='text'
                name='title'
                required
                placeholder='descreva o título da postagem '
                onChange={(e) => setTitle(e.target.value)} value={title}></input>
            </label>
            <label>
              <span>URL da imagem </span>
              <input type='text'
                name='image'
                required
                placeholder='Insira uma imagem para seu post'
                onChange={(e) => setImage(e.target.value)} value={image}></input>
            </label>
            <p className={styles.preview_title}>Preview da imagem atual</p>
            <img className={styles.image_preview} src={post.image} alt={post.title} />
            <label>
              <span>Conteúdo: </span>
              <textarea name="body"
                required
                placeholder='insira o conteúdo do post'
                onChange={(e) => setBody(e.target.value)}
                value={body}>

              </textarea>
            </label>
            <label>
              <span>Tags:</span>
              <input type='text'
                name='tags'
                required
                placeholder='insira as tags separadas por vírgula'
                onChange={(e) => setTags(e.target.value)} value={tags}>

              </input>
            </label>


            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && <button className="btn" disabled >Aguarde...</button>}

            {response.error && <p className="error">{response.error}</p>}

            {formError && <p className="error">{formError}</p>}


          </form>
        </>
      )}
    </div>
  )
}

export default EditPost