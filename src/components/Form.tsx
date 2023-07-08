import { Sub } from '../types';
import useNewSubForm from "../hooks/useNewSubForm";


interface FromProps {
    onNewSub: (newSub: Sub) => void
}

const Form = ({ onNewSub }: FromProps) => {

    const [inputValues, dispatch] = useNewSubForm();

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        onNewSub(inputValues);
        dispatch({ type: "clear" });
    }

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = evt.target;

        dispatch({
            type: "change_value",
            payload: {
                inputName: name,
                inputValue: value
            }
        })
    }

    const handleClear = () => {
        dispatch({ type: "clear" });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={inputValues.nick} type='text' name='nick' placeholder='nick' />
                <input onChange={handleChange} value={inputValues.subMonthos} type='number' name='subMonths' placeholder='subMonths' />
                <input onChange={handleChange} value={inputValues.avatar} type='text' name='avatar' placeholder='avatar' />
                <textarea onChange={handleChange} value={inputValues.description} name='description' placeholder='description' ></textarea>

                <button onClick={handleClear} type='button' >Clear the form!</button>
                <button type='submit' >Save new sub!</button>
            </form>
        </div>
    );
}

export default Form;