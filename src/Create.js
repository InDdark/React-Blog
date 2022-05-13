import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const [auther, setAuther] = useState('mario');
    const [isPending, setIsPending]  = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const blog = {title, body, auther};
        setIsPending(true);
        fetch('http://localhost:8000/blogs', {
            method:'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('blog added')
            setIsPending(false);
            history.push('/')
        })
    }

    return (
        <div className="create">
            <h2>Add a Blog</h2>
            <form onSubmit={handleSubmit}>
               <label>Blog title:</label>
               <input
                 type='text'
                 required
                 value={title}
                 onChange = {(e) => setTitle(e.target.value)}
               />
               <label>Blog body:</label>
               <textarea
                  required
                  value={body}
                  onChange = {(e) => setBody(e.target.value)}
               />
               <label>Blog Auther: </label>
               <select
                value={auther}
                onChange = {(e) => setAuther(e.target.value)}
               >
                   <option value="mario">mario</option>
                   <option value="vivian">vivian</option>
               </select>
               {!isPending && <button>Add Blog</button>}
               {isPending && <button disabled>Adding Blog....</button>}
            </form>
        </div>
    );
}
 
export default Create;