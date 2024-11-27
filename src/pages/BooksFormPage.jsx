import { useForm } from 'react-hook-form'
import { createBooks } from '../api/books.api'

export function BooksFormPage() {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = handleSubmit(

        async data => {
            const res = await createBooks(data)
            console.log(res)
        }
    )

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="title" {...register("title", { required: true })} />
                {errors.title && <span>This field is required</span>}
                <input type="text" placeholder="author" {...register("author", { required: true })} />
                {errors.author && <span>This field is required</span>}
                <button>Save</button>
            </form>
        </div>
    )
}