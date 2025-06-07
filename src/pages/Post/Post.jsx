import styles from './Post.module.css'
import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument';

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id)

  return (
    <div className={styles.post_container}>
      {loading && (
        <div className={styles.loading}>
          <div className={styles.loading_title}></div>
          <div className={styles.loading_image}></div>
          <div className={styles.loading_text}></div>
          <div className={styles.loading_text} style={{width: "80%"}}></div>
          <div className={styles.loading_text} style={{width: "60%"}}></div>
        </div>
      )}

      {post && (
        <div className={styles.post_detail}>
          <div className={styles.post_header}>
            <h1>{post.title}</h1>
            {post.createdBy && (
              <p className={styles.post_author}>Por: {post.createdBy}</p>
            )}
          </div>
          
          {post.image && (
            <div className={styles.image_wrapper}>
              <img 
                src={post.image} 
                alt={post.title} 
                loading="lazy"
              />
            </div>
          )}
          
          <div className={styles.post_content}>
            <p>{post.body}</p>
          </div>
          
          {post.tagsArray?.length > 0 && (
            <div className={styles.post_tags}>
              <h3>Este post fala sobre:</h3>
              <div className={styles.tags_container}>
                {post.tagsArray.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Post